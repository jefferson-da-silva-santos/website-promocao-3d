import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
// box icons css:
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

// Blog
import { BlogProvider } from "./contexts/BlogContext";
import BlogPage from "./pages/Blog";
import BlogPostPage from "./components/BlogPost";
import AdminPage from "./pages/AdminBlog";

// ─── Página principal (home) ──────────────────────────────────

const HomePage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: false,
      offset: 80,
    });
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

// ─── App com rotas ────────────────────────────────────────────

const App: React.FC = () => (
  <BrowserRouter>
    <BlogProvider>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Blog público */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPostPage />} />

        {/* Admin (protegido por senha) */}
        <Route path="/admin" element={<AdminPage />} />

        {/* Fallback */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BlogProvider>
  </BrowserRouter>
);

export default App;
