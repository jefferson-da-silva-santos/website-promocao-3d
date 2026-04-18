import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/logo.png";

// ─── Dados estruturados ───────────────────────────────────────────────────────

const DIMENSIONS = [
  {
    color: "dim--sangue",
    icon: "bx bx-water",
    number: "01",
    label: "Doação de Sangue",
    desc: "Conscientização sobre doação e transfusão de sangue, desmistificando medos e tabus para salvar vidas.",
  },
  {
    color: "dim--orgaos",
    icon: "bx bx-heart",
    number: "02",
    label: "Doação de Órgãos",
    desc: "Orientação sobre doação de órgãos e tecidos, transplantes e os critérios éticos e legais do processo.",
  },
  {
    color: "dim--leite",
    icon: "bx bx-droplet",
    number: "03",
    label: "Doação de Leite",
    desc: "Informações sobre bancos de leite humano e a importância da doação para prematuros e bebês em estado crítico.",
  },
];

const CAPABILITIES = [
  {
    icon: "bx bx-book-open",
    title: "Ensino e Orientação",
    items: [
      "Explica o que é a Promoção 3D",
      "Ensina sobre doação de sangue, órgãos e leite",
      "Esclarece dúvidas sobre transplantes e bancos de leite",
      "Orienta sobre fundamentos sociais, éticos e legais",
    ],
  },
  {
    icon: "bx bx-buildings",
    title: "Apoio Institucional",
    items: [
      "Informa sobre marcos legais: PL 582, PL 5.233/23 e PL 110/24",
      "Auxilia escolas, universidades e municípios",
      "Orienta gestores sobre aplicação da política pública",
      "Apoia profissionais da saúde com conteúdos técnicos",
    ],
  },
  {
    icon: "bx bx-edit",
    title: "Criação de Conteúdo",
    items: [
      "Textos educativos e cartilhas",
      "Planos de aula e projetos pedagógicos",
      "Campanhas e materiais para redes sociais",
      "Conteúdos institucionais e palestras",
    ],
  },
  {
    icon: "bx bx-shield-check",
    title: "Combate a Mitos",
    items: [
      "Desmistifica medos sobre doação de sangue",
      "Esclarece tabus sobre doação de órgãos",
      "Corrige desinformação sobre leite materno",
      "Promove cidadania e solidariedade",
    ],
  },
];

const PUBLICS = [
  { icon: "bx bx-user", label: "Estudantes" },
  { icon: "bx bx-chalkboard", label: "Professores" },
  { icon: "bx bx-plus-medical", label: "Profissionais da Saúde" },
  { icon: "bx bx-briefcase", label: "Gestores" },
  { icon: "bx bx-building", label: "Escolas" },
  { icon: "bx bx-map-pin", label: "Municípios" },
  { icon: "bx bx-globe", label: "Sociedade" },
];

// ─── Componente ───────────────────────────────────────────────────────────────

const IA = () => {
  const navigate = useNavigate();

  return (
    <div className="agente-page">

      {/* ── Navbar ── */}
      <nav className="agente-nav">
        <div className="agente-nav__inner">
          <button className="agente-nav__logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Promoção 3D" />
            <span>Promoção 3D</span>
          </button>
          <div className="agente-nav__links">
            <button onClick={() => navigate("/")}>Início</button>
            <button onClick={() => navigate("/blog")}>Blog</button>
            <button className="active">Agente IA</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="agente-hero">
        <div className="agente-hero__bg-grid" aria-hidden="true" />
        <div className="agente-hero__inner">
          <div className="agente-hero__badge">
            <span className="agente-hero__badge-dot" />
            Assistente Online
          </div>

          <h1 className="agente-hero__title">
            Assistente Oficial da<br />
            <em>Promoção 3D</em>
          </h1>

          <p className="agente-hero__desc">
            Sou o assistente oficial da Promoção 3D. Minha função é orientar,
            ensinar e esclarecer, de forma didática e acessível, tudo o que
            envolve essa importante política de conscientização e incentivo à
            doação de sangue, órgãos e leite humano.
          </p>

          <div className="agente-hero__actions">
            <a
              href="https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d"
              target="_blank"
              rel="noreferrer"
              className="agente-btn agente-btn--primary"
            >
              <i className="bx bx-bot" />
              Conversar com o Agente
            </a>
            <a href="#dimensoes" className="agente-btn agente-btn--ghost">
              Saiba mais
              <i className="bx bx-chevron-down" />
            </a>
          </div>

          {/* Robot SVG */}
          <div className="agente-hero__robot" aria-hidden="true">
            <svg viewBox="0 0 220 260" xmlns="http://www.w3.org/2000/svg">
              {/* Antena */}
              <rect x="107" y="10" width="6" height="34" rx="3" fill="#5ce2e7" />
              <circle cx="110" cy="8" r="10" fill="#004278" />
              <circle cx="110" cy="8" r="6" fill="#5ce2e7" />
              <circle cx="110" cy="8" r="16" fill="none" stroke="#5ce2e7" strokeWidth="1.5" opacity="0.35" />
              {/* Cabeça */}
              <rect x="50" y="42" width="120" height="88" rx="24" fill="#1a1a2e" />
              {/* Visor */}
              <rect x="64" y="56" width="92" height="56" rx="14" fill="#0d0d1a" />
              {/* Olho esquerdo */}
              <rect x="72" y="64" width="34" height="34" rx="9" fill="#004278" />
              <rect x="76" y="68" width="26" height="26" rx="7" fill="#0a2540" />
              <circle cx="89" cy="81" r="8" fill="#5ce2e7" opacity="0.9" />
              <circle cx="89" cy="81" r="4" fill="#fff" />
              <circle cx="91" cy="79" r="1.5" fill="#0a2540" />
              {/* Olho direito */}
              <rect x="114" y="64" width="34" height="34" rx="9" fill="#004278" />
              <rect x="118" y="68" width="26" height="26" rx="7" fill="#0a2540" />
              <circle cx="131" cy="81" r="8" fill="#5ce2e7" opacity="0.9" />
              <circle cx="131" cy="81" r="4" fill="#fff" />
              <circle cx="133" cy="79" r="1.5" fill="#0a2540" />
              {/* Boca */}
              <rect x="84" y="104" width="52" height="5" rx="2.5" fill="#004278" opacity="0.4" />
              <rect x="90" y="104" width="12" height="5" rx="2.5" fill="#5ce2e7" />
              <rect x="106" y="104" width="20" height="5" rx="2.5" fill="#5ce2e7" />
              <rect x="130" y="104" width="6" height="5" rx="2.5" fill="#5ce2e7" />
              {/* Orelhas */}
              <rect x="36" y="66" width="16" height="26" rx="8" fill="#2a2a4e" />
              <rect x="39" y="71" width="10" height="16" rx="5" fill="#004278" opacity="0.5" />
              <rect x="168" y="66" width="16" height="26" rx="8" fill="#2a2a4e" />
              <rect x="171" y="71" width="10" height="16" rx="5" fill="#004278" opacity="0.5" />
              {/* Pescoço */}
              <rect x="96" y="128" width="28" height="18" rx="7" fill="#1a1a2e" />
              {/* Corpo */}
              <rect x="46" y="144" width="128" height="90" rx="20" fill="#1a1a2e" />
              {/* Crachá */}
              <rect x="60" y="156" width="100" height="62" rx="10" fill="#ffffff" />
              <rect x="60" y="156" width="100" height="14" rx="6" fill="#004278" />
              <rect x="60" y="164" width="100" height="6" fill="#004278" />
              <text x="110" y="168" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fontWeight="700" fill="#ffffff" letterSpacing="0.5">PROMOÇÃO 3D</text>
              {/* Ícones no crachá */}
              <path d="M78 196 Q72 187 72 182 Q72 175 78 175 Q84 175 84 182 Q84 187 78 196Z" fill="#c0392b" />
              <path d="M95 185 Q95 179 100 179 Q105 179 105 185 Q105 191 95 197 Q85 191 85 185 Q85 179 90 179 Q95 179 95 185Z" fill="#e74c3c" />
              <path d="M114 196 Q108 187 108 182 Q108 175 114 175 Q120 175 120 182 Q120 187 114 196Z" fill="#d4e8f5" stroke="#b5d5e8" strokeWidth="0.8" />
              <text x="110" y="212" textAnchor="middle" fontFamily="sans-serif" fontSize="6" fill="#555">Sangue · Órgãos · Leite</text>
              {/* Botão central */}
              <circle cx="110" cy="226" r="8" fill="#004278" opacity="0.2" />
              <circle cx="110" cy="226" r="5" fill="#004278" opacity="0.4" />
              <circle cx="110" cy="226" r="2.5" fill="#004278" />
              {/* Braços */}
              <rect x="14" y="152" width="34" height="18" rx="9" fill="#1a1a2e" />
              <circle cx="10" cy="161" r="12" fill="#1a1a2e" />
              <rect x="172" y="152" width="34" height="18" rx="9" fill="#1a1a2e" />
              <circle cx="210" cy="161" r="12" fill="#1a1a2e" />
              {/* Pernas */}
              <rect x="76" y="232" width="24" height="26" rx="8" fill="#1a1a2e" />
              <rect x="120" y="232" width="24" height="26" rx="8" fill="#1a1a2e" />
              <rect x="68" y="248" width="38" height="14" rx="7" fill="#004278" />
              <rect x="114" y="248" width="38" height="14" rx="7" fill="#004278" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── 3 Dimensões ── */}
      <section className="agente-dimensions" id="dimensoes">
        <div className="agente-dimensions__inner">
          <div className="agente-section-header">
            <div className="agente-section-header__sup">
              <img src={logo} alt="" />
              <span>As três dimensões</span>
            </div>
            <h2>A Promoção 3D trabalha<br />três frentes fundamentais</h2>
          </div>

          <div className="agente-dimensions__grid">
            {DIMENSIONS.map((d) => (
              <article key={d.number} className={`agente-dim-card ${d.color}`}>
                <div className="agente-dim-card__top">
                  <span className="agente-dim-card__number">{d.number}</span>
                  <i className={`${d.icon} agente-dim-card__icon`} />
                </div>
                <h3 className="agente-dim-card__label">{d.label}</h3>
                <p className="agente-dim-card__desc">{d.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── O que o agente faz ── */}
      <section className="agente-capabilities">
        <div className="agente-capabilities__inner">
          <div className="agente-section-header agente-section-header--light">
            <div className="agente-section-header__sup">
              <img src={logo} alt="" />
              <span>Capacidades</span>
            </div>
            <h2>O que o assistente pode fazer por você</h2>
          </div>

          <div className="agente-capabilities__grid">
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} className="agente-cap-card">
                <div className="agente-cap-card__header">
                  <div className="agente-cap-card__icon-wrap">
                    <i className={cap.icon} />
                  </div>
                  <h3>{cap.title}</h3>
                </div>
                <ul className="agente-cap-card__list">
                  {cap.items.map((item) => (
                    <li key={item}>
                      <i className="bx bx-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Público-alvo ── */}
      <section className="agente-public">
        <div className="agente-public__inner">
          <div className="agente-section-header">
            <div className="agente-section-header__sup">
              <img src={logo} alt="" />
              <span>Para quem</span>
            </div>
            <h2>Um assistente para toda a sociedade</h2>
          </div>

          <div className="agente-public__grid">
            {PUBLICS.map((p) => (
              <div key={p.label} className="agente-public-item">
                <div className="agente-public-item__icon">
                  <i className={p.icon} />
                </div>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marco legal ── */}
      <section className="agente-legal">
        <div className="agente-legal__inner">
          <div className="agente-section-header agente-section-header--light">
            <div className="agente-section-header__sup">
              <img src={logo} alt="" />
              <span>Marcos legais</span>
            </div>
            <h2>A Promoção 3D respaldada pela lei</h2>
          </div>

          <div className="agente-legal__cards">
            <div className="agente-legal-card">
              <span className="agente-legal-card__tag">Estadual</span>
              <h4>Projeto de Lei N° 582</h4>
              <p>Lei estadual que institui a Promoção 3D no Estado de Pernambuco, transformando a pesquisa em política pública.</p>
            </div>
            <div className="agente-legal-card agente-legal-card--highlight">
              <span className="agente-legal-card__tag">Nacional</span>
              <h4>PL 5.233/2023</h4>
              <p>Projeto de Lei Nacional que propõe a Promoção 3D como política pública de abrangência em todo o território brasileiro.</p>
            </div>
            <div className="agente-legal-card">
              <span className="agente-legal-card__tag">Nacional</span>
              <h4>PL 110/2024</h4>
              <p>Institui o Programa de Ensino da Promoção 3D no currículo escolar e acadêmico brasileiro, proposto pelo Dep. Eduardo da Fonte.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Criadores ── */}
      <section className="agente-creators">
        <div className="agente-creators__inner">
          <div className="agente-section-header">
            <div className="agente-section-header__sup">
              <img src={logo} alt="" />
              <span>Origem</span>
            </div>
            <h2>Criada na Universidade de Pernambuco</h2>
          </div>

          <div className="agente-creators__cards">
            <div className="agente-creator-card">
              <div className="agente-creator-card__avatar">MF</div>
              <div className="agente-creator-card__info">
                <strong>PhD Múcio Luiz Banja Fernandez</strong>
                <span>Orientador e pesquisador · UPE Campus Mata Norte</span>
              </div>
            </div>
            <div className="agente-creator-card">
              <div className="agente-creator-card__avatar">EP</div>
              <div className="agente-creator-card__info">
                <strong>Eliabi Pereira da Silva</strong>
                <span>Doutorando em Educação · UPE Campus Mata Norte</span>
              </div>
            </div>
          </div>

          <p className="agente-creators__note">
            A Promoção 3D já vem sendo adotada por diversos municípios pernambucanos
            e continua em expansão por todo o Brasil, transformando informação em
            cidadania, solidariedade e promoção da vida.
          </p>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="agente-cta">
        <div className="agente-cta__inner">
          <h2 className="agente-cta__title">Pronto para aprender e ensinar?</h2>
          <p className="agente-cta__desc">
            Converse agora com o Assistente Oficial da Promoção 3D e transforme
            conhecimento em cidadania.
          </p>
          <a
            href="https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d"
            target="_blank"
            rel="noreferrer"
            className="agente-btn agente-btn--cta"
          >
            <i className="bx bx-bot" />
            Iniciar conversa com o Agente
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="agente-footer">
        <span>© {new Date().getFullYear()} Promoção 3D · Universidade de Pernambuco</span>
      </footer>
    </div>
  );
};

export default IA;