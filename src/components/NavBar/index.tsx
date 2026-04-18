import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/image/logo.png";

const NAV_LINKS = [
  { label: "Início",      href: "#hero" },
  { label: "Desvendando", href: "#desvendando" },
  { label: "Informações", href: "#sobre" },
  { label: "Material",    href: "#material" },
  { label: "Jogo da Vida",href: "#jogo-da-vida" },
  { label: "Resultados",  href: "#resultados" },
  { label: "Contato",     href: "#contato" },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isBlogPage = location.pathname.startsWith("/blog");

  // Sombra na navbar ao fazer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1000) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Fecha menu ao pressionar Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleAnchorClick = (href: string) => {
    setMenuOpen(false);
    if (!isHomePage) {
      // Se estiver em outra página, volta para a home e ancora
      navigate("/" + href);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBlogClick = () => {
    setMenuOpen(false);
    navigate("/blog");
  };

  return (
    <>
      <div className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
        <nav className="navbar__container">

          {/* Logo */}
          <button
            className="navbar__logo-group"
            onClick={() => navigate("/")}
            aria-label="Ir para o início"
          >
            <img className="navbar__logo-img" src={logo} alt="Promoção 3D" />
            <span className="navbar__logo-text">Promoção 3D</span>
          </button>

          {/* Links — desktop */}
          <ul className={`navbar__list${menuOpen ? " navbar__list--open" : ""}`}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href} className="navbar__list-item">
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleAnchorClick(href);
                  }}
                >
                  <span className="navbar__link-text">{label}</span>
                  <span className="navbar__link-line" aria-hidden="true" />
                </a>
              </li>
            ))}

            {/* Link Blog — destaque visual diferente */}
            <li className="navbar__list-item navbar__list-item--blog">
              <button
                className={`navbar__blog-btn${isBlogPage ? " navbar__blog-btn--active" : ""}`}
                onClick={handleBlogClick}
              >
                <i className="bx bx-edit-alt" />
                Blog
              </button>
            </li>
          </ul>

          {/* Botão hambúrguer */}
          <button
            className={`menu-btn${menuOpen ? " menu-btn--open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <i className={`bx ${menuOpen ? "bx-x" : "bx-menu-alt-right"}`} />
          </button>

        </nav>
      </div>

      {/* Overlay escuro para fechar o menu mobile */}
      {menuOpen && (
        <div
          className="navbar__overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default NavBar;