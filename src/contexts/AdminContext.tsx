// src/contexts/AdminContext.tsx
// ─────────────────────────────────────────────────────────────────────────────
//  Contexto de autenticação do administrador.
//  Fluxo: POST /api/admin/login → token → armazenado em sessionStorage.
//  O token é enviado em x-admin-token em todas as requisições protegidas.
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import type { AxiosInstance } from "axios";

// ─── Config ──────────────────────────────────────────────────────────────────

export const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3333";
const SESSION_KEY = "p3d_admin_session";

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface AdminSession {
  token: string;
  expiresAt: string; // ISO string
}

interface AdminContextValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  /** Instância axios já configurada com o token */
  api: AxiosInstance;
  login: (password: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Erro do último login */
  loginError: string | null;
  clearLoginError: () => void;
}

// ─── Http base ───────────────────────────────────────────────────────────────

const baseHttp = axios.create({ baseURL: API_BASE });

// ─── Helpers ─────────────────────────────────────────────────────────────────

const loadSession = (): AdminSession | null => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session: AdminSession = JSON.parse(raw);
    if (new Date(session.expiresAt) <= new Date()) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
};

const saveSession = (session: AdminSession) =>
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

const clearSession = () => sessionStorage.removeItem(SESSION_KEY);

// ─── Contexto ─────────────────────────────────────────────────────────────────

const AdminContext = createContext<AdminContextValue>({} as AdminContextValue);

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Cria instância axios com token injetado dinamicamente
  const api = axios.create({ baseURL: API_BASE });
  api.interceptors.request.use((config) => {
    const s = loadSession();
    if (s?.token) config.headers['x-admin-token'] = s.token;
    return config;
  });

  // Inicialização — verifica sessão salva
  useEffect(() => {
    const s = loadSession();
    setSession(s);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (password: string) => {
    setLoginError(null);
    try {
      const { data } = await baseHttp.post<{ token: string; expiresAt: string }>('/api/admin/login', { password });
      const newSession: AdminSession = { token: data.token, expiresAt: data.expiresAt };
      saveSession(newSession);
      setSession(newSession);
    } catch (err: any) {
      const msg = err?.response?.data?.error ?? 'Erro ao fazer login.';
      setLoginError(msg);
      throw new Error(msg);
    }
  }, []);

  const logout = useCallback(async () => {
    const s = loadSession();
    if (s?.token) {
      try {
        await baseHttp.post('/api/admin/logout', {}, {
          headers: { 'x-admin-token': s.token },
        });
      } catch { /* ignora erros de rede no logout */ }
    }
    clearSession();
    setSession(null);
  }, []);

  return (
    <AdminContext.Provider value={{
      isAuthenticated: !!session,
      isLoading,
      token: session?.token ?? null,
      api,
      login,
      logout,
      loginError,
      clearLoginError: () => setLoginError(null),
    }}>
      {children}
    </AdminContext.Provider>
  );
};