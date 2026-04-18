import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";

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
  { icon: "bx bxl-instagram", href: "#", label: "Instagram" },
  { icon: "bx bxl-twitter", href: "#", label: "Twitter / X" },
  { icon: "bx bxl-whatsapp", href: "#", label: "WhatsApp" },
  { icon: "bx bxl-youtube", href: "#", label: "YouTube" },
];

const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  const handleAnchor = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + href);
    }
  };

  return (
    <footer className="footer-pro">

      {/* ── Corpo principal ── */}
      <div className="footer-pro__body">
        <div className="footer-pro__inner">

          {/* Coluna 1 — Identidade */}
          <div className="footer-pro__col footer-pro__col--brand">
            <button
              className="footer-pro__logo"
              onClick={() => navigate("/")}
              aria-label="Ir para o início"
            >
              <img src={logo} alt="Promoção 3D" />
              <span>Promoção 3D</span>
            </button>

            <p className="footer-pro__tagline">
              Uma Política Pública em prol das Doações,
              Transfusão e Transplantes.
            </p>

            <div className="footer-pro__social">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-pro__social-btn"
                  aria-label={s.label}
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>

            <a
              href="https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d"
              target="_blank"
              rel="noreferrer"
              className="footer-pro__agent-btn"
            >
              <i className="bx bx-bot" />
              Converse com o Agente IA
            </a>
          </div>

          {/* Coluna 2 — Navegação */}
          <div className="footer-pro__col">
            <h4 className="footer-pro__col-title">Navegação</h4>
            <ul className="footer-pro__list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAnchor(link.href);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Páginas */}
          <div className="footer-pro__col">
            <h4 className="footer-pro__col-title">Páginas</h4>
            <ul className="footer-pro__list">
              {PAGE_LINKS.map((link) => (
                <li key={link.to}>
                  <a
                    href={link.to}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.to);
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="footer-pro__col-title footer-pro__col-title--spaced">
              Marcos Legais
            </h4>
            <ul className="footer-pro__list">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 — Sobre */}
          <div className="footer-pro__col">
            <h4 className="footer-pro__col-title">Pesquisadores</h4>
            <div className="footer-pro__researchers">
              <div className="footer-pro__researcher">
                <div className="footer-pro__researcher-avatar">MF</div>
                <div>
                  <strong>PhD Múcio Luiz Banja Fernandez</strong>
                  <span>Orientador · UPE Campus Mata Norte</span>
                </div>
              </div>
              <div className="footer-pro__researcher">
                <div className="footer-pro__researcher-avatar">EP</div>
                <div>
                  <strong>Eliabi Pereira da Silva</strong>
                  <span>Doutorando em Educação · UPE</span>
                </div>
              </div>
            </div>

            <div className="footer-pro__contact">
              <h4 className="footer-pro__col-title footer-pro__col-title--spaced">
                Contato
              </h4>
              <a href="#contato" className="footer-pro__contact-link" onClick={(e) => { e.preventDefault(); handleAnchor("#contato"); }}>
                <i className="bx bx-envelope" />
                Envie uma mensagem
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── Barra inferior ── */}
      <div className="footer-pro__bottom">
        <div className="footer-pro__bottom-inner">

          <div className="footer-pro__bottom-left">
            <span>© {year} Promoção 3D · Todos os direitos reservados</span>
            <span className="footer-pro__bottom-sep">·</span>
            <span>Universidade de Pernambuco</span>
          </div>

          {/* Crédito ao desenvolvedor */}
          <a
            href="https://jeffersondev.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="footer-pro__dev"
            aria-label="Portfólio do desenvolvedor Jefferson Santos"
          >
            <span className="footer-pro__dev-label">Desenvolvido por</span>
            <span className="footer-pro__dev-name">
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