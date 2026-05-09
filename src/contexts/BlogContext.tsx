// src/contexts/BlogContext.tsx
// ─────────────────────────────────────────────────────────────────────────────
//  Contexto de blog — consome a API REST.
//  Leitura (GET /api/blog) é pública.
//  Escrita (POST / PUT / DELETE) exige token admin via AdminContext.
// ─────────────────────────────────────────────────────────────────────────────

import React, {
  createContext, useCallback, useContext, useEffect, useState,
} from "react";
import axios from "axios";
import { API_BASE } from "./AdminContext";

// ─── Tipos ───────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  author: string;
  category: string;
  cover_image: string;   // snake_case vindo da API
  coverImage?: string;   // alias para compatibilidade com componentes existentes
  read_time: number;
  readTime?: number;     // alias
  published: boolean;
  created_at: string;
  createdAt?: string;    // alias
}

/** Normaliza o post da API para o formato que os componentes esperam */
const normalize = (p: BlogPost): BlogPost => ({
  ...p,
  coverImage: p.cover_image,
  readTime: p.read_time,
  createdAt: p.created_at,
});

export type CreatePostInput = Omit<BlogPost,
  'id' | 'created_at' | 'read_time' | 'published' |
  'coverImage' | 'readTime' | 'createdAt'
> & { cover_image: string; published?: boolean };

interface BlogContextValue {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  /** Recarrega a lista da API */
  refresh: () => Promise<void>;
  /** Cria post (requer token admin) */
  addPost: (token: string, data: CreatePostInput) => Promise<string>;
  /** Atualiza post (requer token admin) */
  updatePost: (token: string, id: string, data: CreatePostInput) => Promise<void>;
  /** Remove post (requer token admin) */
  deletePost: (token: string, id: string) => Promise<void>;
}

// ─── Contexto ─────────────────────────────────────────────────────────────────

const BlogContext = createContext<BlogContextValue>({} as BlogContextValue);

export const useBlog = () => useContext(BlogContext);

// ─── Provider ─────────────────────────────────────────────────────────────────

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const http = axios.create({ baseURL: API_BASE });

  const authHeaders = (token: string) => ({ 'x-admin-token': token });

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await http.get('/api/blog');
      setPosts((data.data as BlogPost[]).map(normalize));
    } catch {
      setError('Não foi possível carregar os artigos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refresh(); }, []);

  const addPost = async (token: string, input: CreatePostInput): Promise<string> => {
    const { data } = await http.post('/api/blog', input, { headers: authHeaders(token) });
    await refresh();
    return data.id as string;
  };

  const updatePost = async (token: string, id: string, input: CreatePostInput) => {
    await http.put(`/api/blog/${id}`, input, { headers: authHeaders(token) });
    await refresh();
  };

  const deletePost = async (token: string, id: string) => {
    await http.delete(`/api/blog/${id}`, { headers: authHeaders(token) });
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <BlogContext.Provider value={{ posts, isLoading, error, refresh, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
};