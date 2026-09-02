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

const PAGE_LINKS = [
  { label: "Blog", to: "/blog" },
  { label: "Agente IA", to: "/agente" },
  { label: "Admin", to: "/admin" },
];

const LEGAL_LINKS = [
  { label: "PL N° 582 – Estadual PE", href: "#" },
  { label: "PL 5.233/2023 – Nacional", href: "#" },
  { label: "PL 110/2024 – Nacional", href: "#" },
];

const SOCIAL = [
  { icon: "bxl-instagram", label: "Instagram" },
  { icon: "bxl-twitter", label: "Twitter / X" },
  { icon: "bxl-whatsapp", label: "WhatsApp" },
  { icon: "bxl-youtube", label: "YouTube" },
];

const RESEARCHERS = [
  { initials: "MF", bg: c.green, name: "PhD Múcio Luiz Banja Fernandez", role: "Orientador · UPE Campus Mata Norte" },
  { initials: "EP", bg: c.yellow, name: "Eliabi Pereira da Silva", role: "Doutorando em Educação · UPE" },
];

const colTitle: React.CSSProperties = {
  margin: 0,
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: c.yellow,
};

const listLink: React.CSSProperties = { fontSize: 14, color: c.inkText, textDecoration: "none" };

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleAnchor = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else navigate("/" + href);
  };

  return (
    <footer style={{ background: c.ink, color: c.inkText }}>
      <div className="p3d-grid-2" style={{ maxWidth: 1180, margin: "0 auto", padding: "62px 24px 44px", display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) repeat(3, minmax(0, 1fr))", gap: 44 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          <button onClick={() => navigate("/")} aria-label="Ir para o início" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 11, background: "none", border: "none", padding: 0, cursor: "pointer" }}>
            <img src={logo} alt="Promoção 3D" style={{ width: 40, height: 40, borderRadius: 11 }} />
            <span style={{ fontFamily: display, fontSize: 20, fontWeight: 700, color: c.paper }}>Promoção 3D</span>
          </button>
          <p style={{ margin: 0, maxWidth: "34ch", fontSize: 14.5, lineHeight: 1.6, color: "#C9C2B4" }}>
            Uma Política Pública em prol das Doações, Transfusão e Transplantes.
          </p>
          <div style={{ display: "flex", gap: 9 }}>
            {SOCIAL.map((s) => (
              <a key={s.label} href="#contato" aria-label={s.label} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 11, background: c.inkSoft, color: c.paper, textDecoration: "none" }}>
                <i className={`bx ${s.icon}`} style={{ fontSize: 20 }} />
              </a>
            ))}
          </div>
          <a href="https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d" target="_blank" rel="noreferrer" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 9, background: c.red, color: "#fff", fontSize: 14.5, fontWeight: 700, padding: "12px 22px", border: `2px solid ${c.paper}`, borderRadius: 999, textDecoration: "none" }}>
            <i className="bx bx-bot" style={{ fontSize: 19 }} />
            Converse com o Agente IA
          </a>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h4 style={colTitle}>Navegação</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: 8, margin: 0, padding: 0, listStyle: "none" }}>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} style={listLink} onClick={(e) => { e.preventDefault(); handleAnchor(l.href); }}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h4 style={colTitle}>Páginas</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: 8, margin: 0, padding: 0, listStyle: "none" }}>
            {PAGE_LINKS.map((l) => (
              <li key={l.to}>
                <a href={l.to} style={listLink} onClick={(e) => { e.preventDefault(); navigate(l.to); }}>{l.label}</a>
              </li>
            ))}
          </ul>
          <h4 style={{ ...colTitle, marginTop: 10 }}>Marcos Legais</h4>
          <ul style={{ display: "flex", flexDirection: "column", gap: 8, margin: 0, padding: 0, listStyle: "none" }}>
            {LEGAL_LINKS.map((l) => (
              <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer" style={listLink}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
          <h4 style={colTitle}>Pesquisadores</h4>
          {RESEARCHERS.map((r) => (
            <div key={r.initials} style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: r.bg, color: c.ink, fontSize: 13, fontWeight: 800, flex: "none" }}>{r.initials}</span>
              <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                <strong style={{ fontSize: 13.5, color: c.paper, lineHeight: 1.3 }}>{r.name}</strong>
                <span style={{ fontSize: 12, color: c.faint, lineHeight: 1.35 }}>{r.role}</span>
              </span>
            </div>
          ))}
          <a href="#contato" onClick={(e) => { e.preventDefault(); handleAnchor("#contato"); }} style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: c.paper, textDecoration: "none", borderBottom: `2px solid ${c.green}`, paddingBottom: 3 }}>
            <i className="bx bx-envelope" style={{ fontSize: 17 }} />
            Envie uma mensagem
          </a>
        </div>
      </div>

      <div style={{ borderTop: `2px solid ${c.inkSoft}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 12.5, color: c.faint }}>© {year} Promoção 3D · Todos os direitos reservados · Universidade de Pernambuco</span>
          <a href="https://jeffersondev.netlify.app/" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12.5, color: c.faint, textDecoration: "none" }}>
            Desenvolvido por
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 700, color: c.inkText }}>
              <i className="bx bx-code-alt" />
              Jefferson Santos
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
