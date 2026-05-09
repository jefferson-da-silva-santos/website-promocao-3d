// src/pages/DashboardAdmin.tsx
// ─────────────────────────────────────────────────────────────────────────────
//  Dashboard Admin — Promoção 3D
//  Protegido pelo AdminContext. Se não autenticado → redireciona para /admin.
//  Usa api do AdminContext (axios com x-admin-token automático).
// ─────────────────────────────────────────────────────────────────────────────

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";
import {
  AreaChart, Area,
  BarChart, Bar,
  PieChart, Pie, Cell,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";

// ─── Tipos ───────────────────────────────────────────────────────────────────

interface Summary {
  totalUsers: number;
  totalScores: number;
  avgScore: number | null;
  lastWeekNewUsers: number;
  byRole: { teachers: number; students: number; others: number };
}
interface StateRow { state: string; total: number }
interface CityRow { city: string; state: string; total: number }
interface SubjectRow { subject: string; total: number }
interface TimeRow { period: string; total: number }
interface ThemeRow { theme: string; plays: number; avg_score: number; max_score: number; avg_time_s: number }
interface PlayerRow { player_name: string; total_score: number; games_played: number; avg_score: number }
interface HeatRow { hour: number; plays: number }
interface AgeRow { faixa: string; total: number }
interface UserRow { id: string; name: string; role: string; role_detail: string | null; subject: string | null; age: number | null; city: string; state: string; created_at: string }
interface AuditRow { id: number; event: string; entity: string | null; entity_id: string | null; ip: string | null; created_at: string }
interface ScoreRow { id: string; player_name: string; theme: string; score: number; attempts: number; time_seconds: number; played_at: string }

type Tab = "overview" | "users" | "scores" | "audit";
type Interval = "day" | "week" | "month";

// ─── Paleta ──────────────────────────────────────────────────────────────────

const PALETTE = {
  navy: "#004278",
  navyD: "#002a4e",
  sky: "#5ce2e7",
  blood: "#dc2626",
  organs: "#2563eb",
  milk: "#16a34a",
  teacher: "#004278",
  student: "#0ea5e9",
  other: "#9ca3af",
};

const THEME_LABEL: Record<string, string> = { blood: "Sangue", organs: "Órgãos", milk: "Leite" };
const THEME_COLOR: Record<string, string> = { blood: PALETTE.blood, organs: PALETTE.organs, milk: PALETTE.milk };

const AGE_COLORS = ["#93c5fd", "#60a5fa", "#3b82f6", "#2563eb", "#1d4ed8", "#1e40af"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number | null | undefined, dec = 0) =>
  n == null ? "—" : Number(n).toLocaleString("pt-BR", { minimumFractionDigits: dec, maximumFractionDigits: dec });

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

const fmtTime = (s: number) => {
  const m = Math.floor(s / 60), sec = s % 60;
  return `${m}m ${sec}s`;
};

function useAutoRefresh(fn: () => void, ms: number) {
  const ref = useRef(fn);
  useEffect(() => { ref.current = fn; }, [fn]);
  useEffect(() => {
    const id = setInterval(() => ref.current(), ms);
    return () => clearInterval(id);
  }, [ms]);
}

// ─── Sub-componentes ─────────────────────────────────────────────────────────

function AnimNumber({ value, dec = 0 }: { value: number; dec?: number }) {
  const [display, setDisplay] = useState(0);
  const frame = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / 900, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setDisplay(value * ease);
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [value]);
  return <>{fmt(display, dec)}</>;
}

function Spinner({ size = 24 }: { size?: number }) {
  return <span className="adm-spinner" style={{ width: size, height: size }} />;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="adm-tooltip">
      <p className="adm-tooltip__label">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="adm-tooltip__row" style={{ color: p.color }}>
          <span className="adm-tooltip__key">{p.name ?? p.dataKey}</span>
          <span className="adm-tooltip__val">{fmt(p.value)}</span>
        </p>
      ))}
    </div>
  );
};

function ThemePill({ theme }: { theme: string }) {
  return <span className={`adm-pill adm-pill--${theme}`}>{THEME_LABEL[theme] ?? theme}</span>;
}

function RoleBadge({ role }: { role: string }) {
  const map: Record<string, string> = { teacher: "Professor", student: "Aluno", other: "Outro" };
  return <span className={`adm-role adm-role--${role}`}>{map[role] ?? role}</span>;
}

function Pager({ page, total, limit, onChange }: {
  page: number; total: number; limit: number; onChange: (p: number) => void;
}) {
  const pages = Math.ceil(total / limit);
  if (pages <= 1) return null;
  return (
    <div className="adm-pager">
      <button className="adm-pager__btn" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <i className="bx bx-chevron-left" />
      </button>
      <span className="adm-pager__info">{page} / {pages}</span>
      <button className="adm-pager__btn" disabled={page >= pages} onClick={() => onChange(page + 1)}>
        <i className="bx bx-chevron-right" />
      </button>
    </div>
  );
}

// ─── Componente principal ────────────────────────────────────────────────────

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, isLoading: authLoading, api, logout } = useAdmin();
  const navigate = useNavigate();

  // ── Estado geral ─────────────────────────────────────────
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [toast, setToast] = useState<string | null>(null);

  // ── Dados overview ────────────────────────────────────────
  const [summary, setSummary] = useState<Summary | null>(null);
  const [byState, setByState] = useState<StateRow[]>([]);
  const [byCity, setByCity] = useState<CityRow[]>([]);
  const [bySubject, setBySubject] = useState<SubjectRow[]>([]);
  const [regTime, setRegTime] = useState<TimeRow[]>([]);
  const [themeStats, setThemeStats] = useState<ThemeRow[]>([]);
  const [topPlayers, setTopPlayers] = useState<PlayerRow[]>([]);
  const [heatmap, setHeatmap] = useState<HeatRow[]>([]);
  const [byAge, setByAge] = useState<AgeRow[]>([]);
  const [interval_, setInterval_] = useState<Interval>("day");

  // ── Dados users ───────────────────────────────────────────
  const [users, setUsers] = useState<UserRow[]>([]);
  const [userTotal, setUserTotal] = useState(0);
  const [userPage, setUserPage] = useState(1);
  const [userQ, setUserQ] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userState, setUserState] = useState("");

  // ── Dados scores ──────────────────────────────────────────
  const [scores, setScores] = useState<ScoreRow[]>([]);
  const [scoreTotal, setScoreTotal] = useState(0);
  const [scorePage, setScorePage] = useState(1);

  // ── Dados audit ───────────────────────────────────────────
  const [audit, setAudit] = useState<AuditRow[]>([]);
  const [auditTotal, setAuditTotal] = useState(0);
  const [auditPage, setAuditPage] = useState(1);
  const [auditEvent, setAuditEvent] = useState("");
  const [auditEvents, setAuditEvents] = useState<string[]>([]);

  // ── Helpers ───────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ── Guard ─────────────────────────────────────────────────
  useEffect(() => {
    if (!authLoading && !isAuthenticated) navigate("/admin");
  }, [authLoading, isAuthenticated, navigate]);

  // ── Fetches ───────────────────────────────────────────────
  const fetchOverview = useCallback(async () => {
    const [sumR, stateR, cityR, subjectR, timeR, themeR, playerR, heatR, ageR] =
      await Promise.all([
        api.get("/api/dashboard/summary"),
        api.get("/api/dashboard/users-by-state"),
        api.get("/api/dashboard/users-by-city?limit=8"),
        api.get("/api/dashboard/users-by-subject"),
        api.get(`/api/dashboard/registrations-over-time?interval=${interval_}`),
        api.get("/api/dashboard/scores-by-theme"),
        api.get("/api/dashboard/top-players?n=10"),
        api.get("/api/dashboard/activity-heatmap"),
        api.get("/api/dashboard/users-by-age"),
      ]);
    setSummary(sumR.data);
    setByState(stateR.data.data);
    setByCity(cityR.data.data);
    setBySubject(subjectR.data.data);
    setRegTime(timeR.data.data);
    setThemeStats(themeR.data.data);
    setTopPlayers(playerR.data.data);
    setHeatmap(heatR.data.data);
    setByAge(ageR.data.data);
  }, [api, interval_]);

  const fetchUsers = useCallback(async () => {
    const p = new URLSearchParams({ page: String(userPage), limit: "15" });
    if (userQ) p.set("q", userQ);
    if (userRole) p.set("role", userRole);
    if (userState) p.set("state", userState);
    const r = await api.get(`/api/dashboard/search-users?${p}`);
    setUsers(r.data.data);
    setUserTotal(r.data.total);
  }, [api, userPage, userQ, userRole, userState]);

  const fetchScores = useCallback(async () => {
    const r = await api.get(`/api/scores?page=${scorePage}&limit=15`);
    setScores(r.data.data);
    setScoreTotal(r.data.total ?? 0);
  }, [api, scorePage]);

  const fetchAudit = useCallback(async () => {
    const p = new URLSearchParams({ page: String(auditPage), limit: "20" });
    if (auditEvent) p.set("event", auditEvent);
    const [logR, evR] = await Promise.all([
      api.get(`/api/audit?${p}`),
      api.get("/api/audit/events"),
    ]);
    setAudit(logR.data.data);
    setAuditTotal(logR.data.total);
    setAuditEvents(evR.data.data);
  }, [api, auditPage, auditEvent]);

  // Bootstrap
  useEffect(() => {
    if (!isAuthenticated) return;
    (async () => {
      setLoading(true);
      try { await fetchOverview(); } catch { }
      setLoading(false);
    })();
  }, [isAuthenticated]);

  // Re-fetch por aba / filtros
  useEffect(() => {
    if (!isAuthenticated) return;
    if (tab === "overview") fetchOverview().catch(() => { });
    if (tab === "users") fetchUsers().catch(() => { });
    if (tab === "scores") fetchScores().catch(() => { });
    if (tab === "audit") fetchAudit().catch(() => { });
  }, [tab, interval_, userPage, userQ, userRole, userState, scorePage, auditPage, auditEvent, isAuthenticated]);

  // Auto-refresh 60s
  useAutoRefresh(() => {
    if (tab === "overview" && isAuthenticated) fetchOverview().catch(() => { });
    setLastUpdated(new Date());
  }, 60_000);

  // Atualização manual
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      if (tab === "overview") await fetchOverview();
      if (tab === "users") await fetchUsers();
      if (tab === "scores") await fetchScores();
      if (tab === "audit") await fetchAudit();
      setLastUpdated(new Date());
      showToast("Dados atualizados!");
    } catch { showToast("Erro ao atualizar."); }
    setRefreshing(false);
  };

  // Ações de remoção
  const handleDeleteUser = async (id: string, name: string) => {
    if (!confirm(`Remover o usuário "${name}"?`)) return;
    try {
      await api.delete(`/api/users/${id}`);
      showToast(`"${name}" removido.`);
      fetchUsers();
      fetchOverview();
    } catch { showToast("Erro ao remover usuário."); }
  };

  const handleDeleteScore = async (id: string) => {
    if (!confirm("Remover esta pontuação?")) return;
    try {
      await api.delete(`/api/scores/${id}`);
      showToast("Pontuação removida.");
      fetchScores();
      fetchOverview();
    } catch { showToast("Erro ao remover pontuação."); }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  // ── Dados derivados ───────────────────────────────────────
  const rolePieData = [
    { name: "Professores", value: summary?.byRole.teachers ?? 0, color: PALETTE.teacher },
    { name: "Alunos", value: summary?.byRole.students ?? 0, color: PALETTE.student },
    { name: "Outros", value: summary?.byRole.others ?? 0, color: PALETTE.other },
  ];

  const heatFull = Array.from({ length: 24 }, (_, i) => {
    const found = heatmap.find(h => Number(h.hour) === i);
    return { hour: `${String(i).padStart(2, "0")}h`, plays: found ? Number(found.plays) : 0 };
  });
  const heatMax = Math.max(...heatFull.map(h => h.plays), 1);

  const radarData = themeStats.map(t => ({
    tema: THEME_LABEL[t.theme] ?? t.theme,
    Partidas: Number(t.plays),
    "Méd. Pts": Number(t.avg_score),
    "Máx. Pts": Number(t.max_score),
  }));

  // ── Loading inicial ───────────────────────────────────────
  if (authLoading || (loading && !summary)) {
    return (
      <div className="adm-loading">
        <Spinner size={40} />
        <p>Carregando painel…</p>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────
  return (
    <div className="adm">

      {/* Toast */}
      {toast && <div className="adm-toast">{toast}</div>}

      {/* ── Header ── */}
      <header className="adm-header">
        <div className="adm-header__inner">
          <div className="adm-header__brand">
            <div className="adm-header__logo-dot" />
            <div>
              <p className="adm-header__eyebrow">Promoção 3D · Admin</p>
              <h1 className="adm-header__title">Painel de Controle</h1>
            </div>
          </div>
          <div className="adm-header__right">
            <button
              className="adm-tab"
              style={{ border: "1px solid #e5e5e5", borderRadius: 6, padding: ".4rem .85rem" }}
              onClick={() => navigate("/admin")}
            >
              <i className="bx bx-edit" /> Blog
            </button>
            <span className="adm-header__updated">
              <i className="bx bx-time-five" />
              {lastUpdated.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
            </span>
            <button
              className={`adm-header__refresh${refreshing ? " adm-header__refresh--spin" : ""}`}
              onClick={handleRefresh}
              title="Atualizar"
            >
              <i className="bx bx-refresh" />
            </button>
            <button
              className="adm-header__refresh"
              onClick={handleLogout}
              title="Sair"
              style={{ color: "#dc2626" }}
            >
              <i className="bx bx-log-out" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Tabs ── */}
      <nav className="adm-tabs">
        <div className="adm-tabs__inner">
          {([
            { key: "overview", label: "Visão Geral", icon: "bx-grid-alt" },
            { key: "users", label: "Usuários", icon: "bx-group", badge: summary?.totalUsers },
            { key: "scores", label: "Pontuações", icon: "bx-trophy", badge: summary?.totalScores },
            { key: "audit", label: "Auditoria", icon: "bx-shield-alt-2" },
          ] as { key: Tab; label: string; icon: string; badge?: number }[]).map(t => (
            <button
              key={t.key}
              className={`adm-tab${tab === t.key ? " adm-tab--active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              <i className={`bx ${t.icon}`} />
              <span>{t.label}</span>
              {t.badge != null && <em className="adm-tab__badge">{t.badge}</em>}
            </button>
          ))}
        </div>
      </nav>

      <main className="adm-main">

        {/* ══════════════════════════════════════════════════════
            OVERVIEW
        ══════════════════════════════════════════════════════ */}
        {tab === "overview" && (
          <div className="adm-overview">

            {/* KPI Cards */}
            <section className="adm-kpis">
              {[
                {
                  icon: "bx-group", label: "Usuários cadastrados",
                  value: summary?.totalUsers ?? 0, color: "blue",
                  sub: `+${summary?.lastWeekNewUsers ?? 0} esta semana`,
                },
                {
                  icon: "bx-trophy", label: "Partidas jogadas",
                  value: summary?.totalScores ?? 0, color: "red",
                  sub: `Média ${fmt(summary?.avgScore, 0)} pts`,
                },
                {
                  icon: "bx-book-open", label: "Professores",
                  value: summary?.byRole.teachers ?? 0, color: "navy",
                  sub: `de ${summary?.totalUsers ?? 0} usuários`,
                },
                {
                  icon: "bx-graduation", label: "Alunos",
                  value: summary?.byRole.students ?? 0, color: "sky",
                  sub: `de ${summary?.totalUsers ?? 0} usuários`,
                },
              ].map((k, i) => (
                <div key={i} className={`adm-kpi adm-kpi--${k.color}`} style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="adm-kpi__icon-wrap"><i className={`bx ${k.icon}`} /></div>
                  <div className="adm-kpi__body">
                    <span className="adm-kpi__label">{k.label}</span>
                    <strong className="adm-kpi__value"><AnimNumber value={k.value} /></strong>
                    <span className="adm-kpi__sub">{k.sub}</span>
                  </div>
                </div>
              ))}
            </section>

            {/* Cadastros no tempo */}
            <section className="adm-card adm-card--full">
              <div className="adm-card__head">
                <div>
                  <h2 className="adm-card__title">Cadastros ao longo do tempo</h2>
                  <p className="adm-card__sub">Novos usuários por período</p>
                </div>
                <div className="adm-interval-btns">
                  {(["day", "week", "month"] as Interval[]).map(iv => (
                    <button
                      key={iv}
                      className={`adm-interval-btn${interval_ === iv ? " adm-interval-btn--active" : ""}`}
                      onClick={() => setInterval_(iv)}
                    >
                      {{ day: "Dia", week: "Semana", month: "Mês" }[iv]}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={regTime} margin={{ top: 8, right: 16, bottom: 0, left: -8 }}>
                  <defs>
                    <linearGradient id="gradUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={PALETTE.navy} stopOpacity={0.35} />
                      <stop offset="95%" stopColor={PALETTE.navy} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="period" tick={{ fontSize: 11, fontFamily: "Muli", fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 11, fontFamily: "Muli", fill: "#9ca3af" }} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone" dataKey="total" name="Cadastros"
                    stroke={PALETTE.navy} strokeWidth={2.5}
                    fill="url(#gradUsers)" dot={false}
                    activeDot={{ r: 5, fill: PALETTE.navy }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </section>

            {/* Row: temas + perfis */}
            <div className="adm-row">
              <section className="adm-card">
                <div className="adm-card__head">
                  <div>
                    <h2 className="adm-card__title">Partidas por tema</h2>
                    <p className="adm-card__sub">Plays e pontuação média</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={themeStats.map(t => ({ ...t, tema: THEME_LABEL[t.theme] ?? t.theme }))}
                    margin={{ top: 8, right: 8, bottom: 0, left: -8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="tema" tick={{ fontSize: 11, fontFamily: "Muli", fill: "#9ca3af" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11, fontFamily: "Muli", fill: "#9ca3af" }} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Muli" }} />
                    <Bar dataKey="plays" name="Partidas" radius={[4, 4, 0, 0]}>
                      {themeStats.map(t => <Cell key={t.theme} fill={THEME_COLOR[t.theme] ?? PALETTE.navy} />)}
                    </Bar>
                    <Bar dataKey="avg_score" name="Méd. Pts" fill={PALETTE.sky} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </section>

              <section className="adm-card">
                <div className="adm-card__head">
                  <div>
                    <h2 className="adm-card__title">Perfis de usuário</h2>
                    <p className="adm-card__sub">Distribuição por papel</p>
                  </div>
                </div>
                <div className="adm-pie-wrap">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={rolePieData}
                        cx="50%" cy="50%"
                        innerRadius={55} outerRadius={85}
                        paddingAngle={4} dataKey="value"
                      >
                        {rolePieData.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Pie>
                      <Tooltip
                        formatter={(v: any) =>
                          fmt(typeof v === "number" ? v : Number(v))
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="adm-pie-legend">
                    {rolePieData.map(d => (
                      <div key={d.name} className="adm-pie-legend__row">
                        <span className="adm-pie-legend__dot" style={{ background: d.color }} />
                        <span className="adm-pie-legend__label">{d.name}</span>
                        <span className="adm-pie-legend__val">{fmt(d.value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Row: faixa etária + estados */}
            <div className="adm-row">
              <section className="adm-card">
                <div className="adm-card__head">
                  <div>
                    <h2 className="adm-card__title">Faixa etária</h2>
                    <p className="adm-card__sub">Distribuição de usuários por idade</p>
                  </div>
                </div>
                {byAge.length === 0 ? (
                  <div className="adm-empty">
                    <i className="bx bx-user" />
                    <p>Sem dados de idade</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={byAge} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="faixa"
                        tick={{ fontSize: 9, fontFamily: "Muli", fill: "#9ca3af" }}
                        tickLine={false} axisLine={false}
                        interval={0}
                        angle={-15}
                        textAnchor="end"
                        height={42}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fontFamily: "Muli", fill: "#9ca3af" }}
                        tickLine={false} axisLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="total" name="Usuários" radius={[4, 4, 0, 0]}>
                        {byAge.map((_, i) => (
                          <Cell key={i} fill={AGE_COLORS[i % AGE_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </section>

              <section className="adm-card">
                <div className="adm-card__head">
                  <div>
                    <h2 className="adm-card__title">Usuários por estado</h2>
                    <p className="adm-card__sub">Distribuição geográfica</p>
                  </div>
                </div>
                <div className="adm-bar-list">
                  {byState.slice(0, 8).map((s, i) => {
                    const max = byState[0]?.total ?? 1;
                    return (
                      <div key={s.state} className="adm-bar-list__item" style={{ animationDelay: `${i * 60}ms` }}>
                        <span className="adm-bar-list__label">{s.state}</span>
                        <div className="adm-bar-list__track">
                          <div className="adm-bar-list__fill" style={{ width: `${(s.total / max) * 100}%` }} />
                        </div>
                        <span className="adm-bar-list__val">{fmt(s.total)}</span>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Row: matérias + heatmap */}
            <div className="adm-row">
              <section className="adm-card">
                <div className="adm-card__head">
                  <div>
                    <h2 className="adm-card__title">Matérias — Professores</h2>
                    <p className="adm-card__sub">Por disciplina lecionada</p>
                  </div>
                </div>
                {bySubject.length === 0 ? (
                  <div className="adm-empty"><i className="bx bx-data" /><p>Sem dados</p></div>
                ) : (
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                      layout="vertical"
                      data={bySubject.slice(0, 8)}
                      margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                      <XAxis type="number" tick={{ fontSize: 11, fontFamily: "Muli", fill: "#9ca3af" }} tickLine={false} axisLine={false} allowDecimals={false} />
                      <YAxis type="category" dataKey="subject" width={90} tick={{ fontSize: 10, fontFamily: "Muli", fill: "#4b5563" }} tickLine={false} axisLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="total" name="Professores" fill={PALETTE.navy} radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </section>

              <section className="adm-card">
                <div className="adm-card__head">
                  <div>
                    <h2 className="adm-card__title">Atividade por hora</h2>
                    <p className="adm-card__sub">Partidas registradas por hora do dia</p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={heatFull} margin={{ top: 4, right: 8, bottom: 0, left: -24 }} barSize={10}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="hour" tick={{ fontSize: 9, fontFamily: "Muli", fill: "#9ca3af" }} tickLine={false} axisLine={false} interval={2} />
                    <YAxis tick={{ fontSize: 10, fontFamily: "Muli", fill: "#9ca3af" }} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="plays" name="Partidas" radius={[3, 3, 0, 0]}>
                      {heatFull.map((d, i) => (
                        <Cell
                          key={i}
                          fill={
                            d.plays > 0
                              ? `rgba(0,66,120,${(0.2 + (d.plays / heatMax) * 0.8).toFixed(2)})`
                              : "#f0f0f0"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </section>
            </div>

            {/* Radar de temas */}
            <section className="adm-card adm-card--full">
              <div className="adm-card__head">
                <div>
                  <h2 className="adm-card__title">Radar de temas</h2>
                  <p className="adm-card__sub">Comparação multidimensional entre os três temas</p>
                </div>
              </div>
              {radarData.length === 0 ? (
                <div className="adm-empty"><i className="bx bx-data" /><p>Sem dados</p></div>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e5e5e5" />
                    <PolarAngleAxis dataKey="tema" tick={{ fontSize: 12, fontFamily: "Josefin Sans", fill: "#4b5563" }} />
                    <Radar name="Partidas" dataKey="Partidas" stroke={PALETTE.navy} fill={PALETTE.navy} fillOpacity={0.2} />
                    <Radar name="Méd. Pts" dataKey="Méd. Pts" stroke={PALETTE.sky} fill={PALETTE.sky} fillOpacity={0.15} />
                    <Radar name="Máx. Pts" dataKey="Máx. Pts" stroke={PALETTE.blood} fill={PALETTE.blood} fillOpacity={0.1} />
                    <Legend wrapperStyle={{ fontSize: 11, fontFamily: "Muli" }} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </section>

            {/* Top Jogadores */}
            <section className="adm-card adm-card--full">
              <div className="adm-card__head">
                <div>
                  <h2 className="adm-card__title">Top 10 Jogadores</h2>
                  <p className="adm-card__sub">Maiores pontuações acumuladas</p>
                </div>
              </div>
              <div className="adm-rank-table-wrap">
                <table className="adm-rank-table">
                  <thead>
                    <tr><th>#</th><th>Jogador</th><th>Partidas</th><th>Média</th><th>Total</th></tr>
                  </thead>
                  <tbody>
                    {topPlayers.map((p, i) => (
                      <tr key={p.player_name} className={i < 3 ? "adm-rank-table__top" : ""}>
                        <td>
                          <span className={`adm-rank-medal adm-rank-medal--${i + 1}`}>
                            {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}º`}
                          </span>
                        </td>
                        <td className="adm-rank-table__name">{p.player_name}</td>
                        <td>{fmt(p.games_played)}</td>
                        <td>{fmt(p.avg_score, 0)}</td>
                        <td><strong className="adm-rank-table__score">{fmt(p.total_score)}</strong></td>
                      </tr>
                    ))}
                    {topPlayers.length === 0 && (
                      <tr><td colSpan={5} className="adm-rank-table__empty">Nenhuma partida registrada</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Top Cidades */}
            <section className="adm-card adm-card--full">
              <div className="adm-card__head">
                <div>
                  <h2 className="adm-card__title">Top Cidades</h2>
                  <p className="adm-card__sub">Municípios com mais cadastros</p>
                </div>
              </div>
              <div className="adm-city-grid">
                {byCity.map((c, i) => (
                  <div key={`${c.city}-${c.state}`} className="adm-city-card" style={{ animationDelay: `${i * 50}ms` }}>
                    <div className="adm-city-card__rank">{i + 1}</div>
                    <div className="adm-city-card__info">
                      <strong>{c.city}</strong>
                      <span>{c.state}</span>
                    </div>
                    <div className="adm-city-card__total">{fmt(c.total)}</div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            USERS
        ══════════════════════════════════════════════════════ */}
        {tab === "users" && (
          <div className="adm-section">
            <div className="adm-section__head">
              <h2 className="adm-section__title">Usuários <em>{fmt(userTotal)}</em></h2>
            </div>

            <div className="adm-filters">
              <div className="adm-filters__search">
                <i className="bx bx-search" />
                <input
                  type="text"
                  placeholder="Buscar por nome, cidade ou estado…"
                  value={userQ}
                  onChange={e => { setUserQ(e.target.value); setUserPage(1); }}
                  className="adm-filters__input"
                />
                {userQ && (
                  <button className="adm-filters__clear" onClick={() => { setUserQ(""); setUserPage(1); }}>
                    <i className="bx bx-x" />
                  </button>
                )}
              </div>
              <select
                className="adm-filters__select"
                value={userRole}
                onChange={e => { setUserRole(e.target.value); setUserPage(1); }}
              >
                <option value="">Todos os perfis</option>
                <option value="teacher">Professor</option>
                <option value="student">Aluno</option>
                <option value="other">Outro</option>
              </select>
              <input
                type="text"
                placeholder="UF"
                maxLength={2}
                value={userState}
                onChange={e => { setUserState(e.target.value.toUpperCase()); setUserPage(1); }}
                className="adm-filters__input adm-filters__input--sm"
              />
            </div>

            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Perfil</th>
                    <th>Detalhe</th>
                    <th>Matéria</th>
                    <th>Idade</th>
                    <th>Cidade</th>
                    <th>UF</th>
                    <th>Cadastro</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u.id}>
                      <td className="adm-table__name">
                        <div className="adm-table__avatar">{u.name.charAt(0).toUpperCase()}</div>
                        {u.name}
                      </td>
                      <td><RoleBadge role={u.role} /></td>
                      <td className="adm-table__muted">{u.role_detail ?? "—"}</td>
                      <td className="adm-table__muted">{u.subject ?? "—"}</td>
                      <td className="adm-table__muted">{u.age != null ? `${u.age} anos` : "—"}</td>
                      <td>{u.city}</td>
                      <td><span className="adm-uf">{u.state}</span></td>
                      <td className="adm-table__muted">{fmtDate(u.created_at)}</td>
                      <td>
                        <button className="adm-table__del" onClick={() => handleDeleteUser(u.id, u.name)}>
                          <i className="bx bx-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={9} className="adm-table__empty">Nenhum usuário encontrado</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pager page={userPage} total={userTotal} limit={15} onChange={setUserPage} />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            SCORES
        ══════════════════════════════════════════════════════ */}
        {tab === "scores" && (
          <div className="adm-section">
            <div className="adm-section__head">
              <h2 className="adm-section__title">Pontuações <em>{fmt(scoreTotal)}</em></h2>
            </div>
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Jogador</th>
                    <th>Tema</th>
                    <th>Pontos</th>
                    <th>Tentativas</th>
                    <th>Tempo</th>
                    <th>Data</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {scores.map(s => (
                    <tr key={s.id}>
                      <td className="adm-table__name">
                        <div className="adm-table__avatar" style={{ background: THEME_COLOR[s.theme] }}>
                          {s.player_name.charAt(0).toUpperCase()}
                        </div>
                        {s.player_name}
                      </td>
                      <td><ThemePill theme={s.theme} /></td>
                      <td><strong className="adm-score-val">{fmt(s.score)}</strong></td>
                      <td>{s.attempts}</td>
                      <td className="adm-table__muted">{fmtTime(s.time_seconds)}</td>
                      <td className="adm-table__muted">{fmtDate(s.played_at)}</td>
                      <td>
                        <button className="adm-table__del" onClick={() => handleDeleteScore(s.id)}>
                          <i className="bx bx-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {scores.length === 0 && (
                    <tr><td colSpan={7} className="adm-table__empty">Nenhuma pontuação registrada</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pager page={scorePage} total={scoreTotal} limit={15} onChange={setScorePage} />
          </div>
        )}

        {/* ══════════════════════════════════════════════════════
            AUDIT
        ══════════════════════════════════════════════════════ */}
        {tab === "audit" && (
          <div className="adm-section">
            <div className="adm-section__head">
              <h2 className="adm-section__title">Auditoria <em>{fmt(auditTotal)}</em></h2>
            </div>
            <div className="adm-filters">
              <select
                className="adm-filters__select"
                value={auditEvent}
                onChange={e => { setAuditEvent(e.target.value); setAuditPage(1); }}
              >
                <option value="">Todos os eventos</option>
                {auditEvents.map(ev => <option key={ev} value={ev}>{ev}</option>)}
              </select>
            </div>
            <div className="adm-audit-list">
              {audit.map(a => (
                <div key={a.id} className={`adm-audit-row adm-audit-row--${a.event.split(".")[1] ?? "info"}`}>
                  <div className="adm-audit-row__icon-wrap">
                    <i className={`bx ${a.event.includes("created") ? "bx-plus-circle" :
                        a.event.includes("deleted") ? "bx-minus-circle" :
                          a.event.includes("updated") ? "bx-edit" :
                            a.event.includes("login") ? "bx-log-in" : "bx-info-circle"
                      }`} />
                  </div>
                  <div className="adm-audit-row__body">
                    <p className="adm-audit-row__event">{a.event}</p>
                    <p className="adm-audit-row__meta">
                      {a.entity && <><span className="adm-audit-row__entity">{a.entity}</span> · </>}
                      {a.entity_id && <span className="adm-audit-row__id">{a.entity_id.substring(0, 8)}…</span>}
                      {a.ip && <><span className="adm-audit-row__sep">·</span><span className="adm-audit-row__ip">{a.ip}</span></>}
                    </p>
                  </div>
                  <span className="adm-audit-row__date">{fmtDate(a.created_at)}</span>
                </div>
              ))}
              {audit.length === 0 && (
                <div className="adm-empty">
                  <i className="bx bx-shield-alt-2" />
                  <p>Nenhum evento registrado</p>
                </div>
              )}
            </div>
            <Pager page={auditPage} total={auditTotal} limit={20} onChange={setAuditPage} />
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;