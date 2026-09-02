import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";
import { c, display } from "../../theme";

const NAV_LINKS = [
  { label: "Início", href: "#hero" },
  { label: "Desvendando", href: "#desvendando" },
  { label: "Informações", href: "#sobre" },
  { label: "Material", href: "#material" },
  { label: "Jogo da Vida", href: "#jogo-da-vida" },
  { label: "Resultados", href: "#resultados" },
  { label: "Contato", href: "#contato" },
];

const linkStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 2px",
  fontSize: 14.5,
  fontWeight: 700,
  color: c.ink,
  textDecoration: "none",
  borderBottom: "2px solid transparent",
};

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const go = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else navigate("/" + href);
  };

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 90, background: c.paper, borderBottom: `3px solid ${c.ink}` }}>
      <nav style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", gap: 24 }}>
        <button
          onClick={() => navigate("/")}
          aria-label="Ir para o início"
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: c.ink, padding: "6px 15px 6px 7px", borderRadius: 999, border: "none", cursor: "pointer", flex: "none" }}
        >
          <img src={logo} alt="Promoção 3D" style={{ width: 28, height: 28, borderRadius: 8 }} />
          <span style={{ fontFamily: display, fontSize: 16, fontWeight: 700, color: c.paper }}>Promoção 3D</span>
        </button>

        <ul className="p3d-nav-links" style={{ display: "flex", alignItems: "center", gap: 22, margin: "0 0 0 auto", padding: 0, listStyle: "none" }}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} style={linkStyle} onClick={(e) => { e.preventDefault(); go(l.href); }}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => navigate("/blog")}
              style={{ display: "inline-flex", alignItems: "center", gap: 7, background: c.red, color: "#fff", fontSize: 13.5, fontWeight: 700, padding: "9px 17px", border: `2px solid ${c.ink}`, borderRadius: 999, boxShadow: `3px 3px 0 ${c.ink}`, cursor: "pointer" }}
            >
              <i className="bx bx-edit-alt" style={{ fontSize: 16 }} />
              Blog
            </button>
          </li>
        </ul>

        <button
          className="p3d-nav-burger"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          style={{ display: "none", alignItems: "center", justifyContent: "center", marginLeft: "auto", width: 42, height: 42, border: `2px solid ${c.ink}`, borderRadius: 12, background: c.white, color: c.ink, cursor: "pointer", flex: "none" }}
        >
          <i className={`bx ${menuOpen ? "bx-x" : "bx-menu-alt-right"}`} style={{ fontSize: 22 }} />
        </button>
      </nav>

      {menuOpen && (
        <div className="p3d-nav-drawer" style={{ background: c.paper }}>
          <ul style={{ display: "flex", flexDirection: "column", gap: 4, margin: 0, padding: "14px 24px 20px", listStyle: "none", borderTop: `2px dashed ${c.dash}` }}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} style={linkStyle} onClick={(e) => { e.preventDefault(); go(l.href); }}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="/blog" style={linkStyle} onClick={(e) => { e.preventDefault(); setMenuOpen(false); navigate("/blog"); }}>Blog</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
