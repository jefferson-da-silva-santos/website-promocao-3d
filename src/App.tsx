// src/App.tsx
// ─────────────────────────────────────────────────────────────────────────────
//  Promoção 3D — App principal
//  Providers: BlogProvider (blog público + admin CRUD)
//             AdminProvider (autenticação admin via API)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "boxicons/css/boxicons.min.css";

// Páginas existentes
import NavBar from "./components/NavBar";
import Inicio from "./pages/Inicio";
import Sobre from "./pages/Sobre";
import Desvendando from "./pages/Desvendando";
import Informacoes from "./pages/Informacoes";
import Material from "./pages/Material";
import Audiencia from "./pages/Audiencia";
import JogoDaVida from "./pages/JogoDaVida";
import Resultados from "./pages/Resultados";
import Contato from "./pages/Contato";
import Footer from "./components/Footer";
import Option from "./components/Option";
import ModalDesvendandoProvider from "./providers/ModalDesvendandoProvider";

// Blog & Admin
import { AdminProvider } from "./contexts/AdminContext";
import { BlogProvider } from "./contexts/BlogContext";
// import BlogPage from "./pages/Blog";
// import BlogPostPage from "./components/BlogPost";
// import AdminPage from "./pages/AdminBlog";
// import AdminDashboard from "./pages/DashboardAdmin";
// import IA from "./pages/IA";
// import SaibaMais from "./pages/SaibaMais";

// App Memória e Vida — download
// import DownloadAppSection from "./components/DownloadAppSection";

// ─── Home ─────────────────────────────────────────────────────────────────────

const HomePage: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: false, offset: 80 });
  }, []);

  return (
    <ModalDesvendandoProvider>
      <Option />
      <NavBar />
      <Inicio />
      <Sobre />
      <Desvendando />
      <Material />
      <Audiencia />
      <JogoDaVida />
      <Informacoes />
      <Resultados />
      <Contato />
      <Footer />
    </ModalDesvendandoProvider>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────

const App: React.FC = () => (
  <BrowserRouter>
    {/*
      AdminProvider: gerencia token de sessão admin (sessionStorage)
      BlogProvider: carrega posts da API; usa token do AdminProvider para escrita
    */}
    <AdminProvider>
      <BlogProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          {/* Admin do blog — login + editor de posts */}
          {/* <Route path="/admin" element={<AdminPage />} /> */}
          {/* Dashboard analytics — requer login admin */}
          {/* <Route path="/admin-dash" element={<AdminDashboard />} />
          <Route path="/agente" element={<IA />} />
          <Route path="/saiba-mais" element={<SaibaMais />} /> */}
          {/* Página de download do app Memória e Vida */}
          {/* <Route path="/app" element={<DownloadAppSection />} /> */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BlogProvider>
    </AdminProvider>
  </BrowserRouter>
);

export default App;