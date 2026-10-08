/*
 * Promoção 3D: aplicação principal.
 *
 * SEO · palavras-chave
 *  Principal: Promoção 3D, política pública de doação de sangue, órgãos e leite humano em Pernambuco
 *  Secundárias: educação em saúde nas escolas; Lei 18.359/2023; PL 110/2024; mitos sobre doação de sangue;
 *               jogos educativos sobre doação
 *  Cauda longa: "quem pode doar sangue com 16 anos"; "mitos e verdades sobre doação de órgãos";
 *               "como ensinar doação de sangue na escola"; "banco de leite humano quanto precisa doar";
 *               "escolas visitadas pela pesquisa Promoção 3D nas GREs de Pernambuco"
 */

import { Suspense, lazy, useEffect } from "react";
import type { FC } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { IconContext } from "@phosphor-icons/react";

import { AdminProvider } from "./contexts/AdminContext";
import { BlogProvider } from "./contexts/BlogContext";
import PageShell from "./components/layout/PageShell";
import Inicio from "./pages/Inicio";
import Sobre from "./pages/Sobre";
import Informacoes from "./pages/Informacoes";
import Desvendando from "./pages/Desvendando";
import Trilha from "./pages/Trilha";
import JogoDaVida from "./pages/JogoDaVida";
import ExpedicaoTeaser from "./pages/ExpedicaoTeaser";
import Material from "./pages/Material";
import { scrollToSection } from "./utils/scroll";

// Rotas secundárias carregam sob demanda: a home não paga pelo peso delas.
// O formulário de contato traz Formik + Yup: fica fora do pacote inicial.
const Contato = lazy(() => import("./pages/Contato"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogPostPage = lazy(() => import("./components/BlogPost"));
const SaibaMais = lazy(() => import("./pages/SaibaMais"));
const IA = lazy(() => import("./pages/IA"));
const DownloadAppSection = lazy(() => import("./components/DownloadAppSection"));
const Expedicao = lazy(() => import("./pages/Expedicao"));
const AdminPage = lazy(() => import("./pages/AdminBlog"));
const AdminDashboard = lazy(() => import("./pages/DashboardAdmin"));
const NotFound = lazy(() => import("./pages/NotFound"));

// ─── Home ────────────────────────────────────────────────────────────────────

/** Página inicial: narrativa da política, do porquê ao como participar. */
const HomePage: FC = () => (
  <PageShell className="home">
    <Inicio />
    <Sobre />
    <Informacoes />
    <Desvendando />
    <Trilha />
    <JogoDaVida />
    <ExpedicaoTeaser />
    <Material />
    <Suspense fallback={<div className="section-placeholder" aria-hidden="true" />}>
      <Contato />
    </Suspense>
  </PageShell>
);

// ─── Comportamentos globais de navegação ─────────────────────────────────────

/** Ao trocar de rota, volta ao topo ou rola até a âncora indicada no hash. */
const ScrollManager: FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const timer = window.setTimeout(() => scrollToSection(id), 120);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return undefined;
  }, [pathname, hash]);

  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  return null;
};

/** Esqueleto exibido enquanto uma rota sob demanda é baixada. */
const RouteFallback: FC = () => (
  <div className="route-loading" role="status" aria-label="Carregando página">
    <span className="skeleton skeleton--title" />
    <span className="skeleton skeleton--line" />
    <span className="skeleton skeleton--line skeleton--short" />
  </div>
);

// ─── App ─────────────────────────────────────────────────────────────────────

const App: FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 64,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    // Conteúdo carregado sob demanda muda a altura da página: recalcula os gatilhos do AOS.
    let frame = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => AOS.refresh());
    });
    ro.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
    };
  }, []);

  return (
    <IconContext.Provider value={{ weight: "regular", mirrored: false }}>
      <BrowserRouter>
        <ScrollManager />
        {/* AdminProvider: sessão do admin (sessionStorage). BlogProvider: posts da API; usa o token para escrita. */}
        <AdminProvider>
          <BlogProvider>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/saiba-mais" element={<SaibaMais />} />
                <Route path="/agente" element={<IA />} />
                <Route path="/app" element={<DownloadAppSection />} />
                <Route path="/expedicao" element={<Expedicao />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/admin-dash" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BlogProvider>
        </AdminProvider>
      </BrowserRouter>
    </IconContext.Provider>
  );
};

export default App;
