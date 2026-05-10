import { useEffect, useRef, useState } from "react";

/* ── Ícones inline leves ── */
const IconDroplet = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C8 2 5 8 5 12c0 4.4 3.1 8 7 8s7-3.6 7-8c0-4-3-10-7-10z" />
  </svg>
);
const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconMilk = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M8 2h8l1 5H7L8 2z" /><path d="M7 7c0 0-2 2-2 8a7 7 0 0 0 14 0c0-6-2-8-2-8" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const IconScale = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <line x1="12" y1="3" x2="12" y2="21" /><path d="M3 6l9-3 9 3" /><path d="M3 18l9 3 9-3" />
    <path d="M3 6c0 3.3 2.7 6 6 6s6-2.7 6-6" /><path d="M9 18c0 3.3 2.7 6 6 6s6-2.7 6-6" />
  </svg>
);
const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── Dados estruturados ── */
const DIMS = [
  {
    id: "sangue",
    num: "01",
    color: "red",
    icon: <IconDroplet />,
    label: "Doação de Sangue",
    title: "Doação de Sangue & Transfusão",
    desc: "O sangue é um recurso insubstituível — nenhum laboratório do mundo consegue produzi-lo. Cada bolsa doada pode salvar até quatro vidas.",
    beneficiarios: [
      "Pacientes com anemia grave",
      "Vítimas de acidentes de trânsito",
      "Pessoas em cirurgias de grande porte",
      "Pacientes em tratamento de câncer",
      "Mulheres com hemorragias no parto",
    ],
    mitos: [
      "Doar sangue engrossa ou afina o sangue",
      "Quem doa sangue fica fraco por semanas",
      "Doar sangue vicia",
      "Quem tem tatuagem nunca poderá doar",
    ],
    fato: "A doação é segura, dura cerca de 30 minutos e o organismo repõe o volume de líquido em apenas 24 horas.",
  },
  {
    id: "orgaos",
    num: "02",
    color: "green",
    icon: <IconHeart />,
    label: "Doação de Órgãos",
    title: "Doação de Órgãos, Tecidos & Transplantes",
    desc: "No Brasil, mais de 60 mil pessoas aguardam na fila de transplantes. Uma única decisão de doação pode transformar essa realidade para até oito famílias.",
    beneficiarios: [
      "Coração — insuficiência cardíaca terminal",
      "Fígado — cirrose e hepatites graves",
      "Rins — insuficiência renal crônica",
      "Pulmões — doenças pulmonares obstrutivas",
      "Pâncreas — diabetes tipo 1 grave",
      "Córneas, ossos, pele e tendões",
    ],
    mitos: [
      "Os médicos não tentarão salvar minha vida",
      "O corpo ficará deformado após a doação",
      "Sou muito velho para ser doador",
      "Minha religião não permite a doação",
    ],
    fato: "No Brasil, a família autoriza a doação. Por isso, comunique seu desejo de ser doador aos seus familiares — isso é o mais importante.",
  },
  {
    id: "leite",
    num: "03",
    color: "amber",
    icon: <IconMilk />,
    label: "Leite Humano",
    title: "Doação de Leite Humano & Bancos de Leite",
    desc: "O leite humano é o alimento mais completo para recém-nascidos — especialmente prematuros internados em UTIs neonatais, onde pode ser a diferença entre a vida e a morte.",
    beneficiarios: [
      "Bebês prematuros em UTI neonatal",
      "Recém-nascidos com baixo peso",
      "Bebês cujas mães não podem amamentar",
      "Crianças com alergias a fórmulas artificiais",
    ],
    mitos: [
      "Meu leite é fraco e não serve para doação",
      "Preciso produzir muito leite para poder doar",
      "Se eu doar, faltará leite para meu filho",
      "O processo de doação é complicado e invasivo",
    ],
    fato: "Mesmo pequenas quantidades fazem grande diferença. Os Bancos de Leite Humano pasteurizam e distribuem com segurança total.",
  },
];

const MUNICIPIOS = [
  "Nazaré da Mata", "Carpina", "Vitória de Santo Antão",
  "Garanhuns", "Belo Jardim", "Passira",
  "Buíque", "Chã Grande", "Triunfo", "São José do Egito",
];

const COMPETENCIAS = [
  "Empatia", "Solidariedade", "Pensamento crítico",
  "Responsabilidade social", "Comunicação", "Argumentação", "Respeito à diversidade",
];

const METODOLOGIAS = [
  { icon: "📚", label: "Aulas expositivas" },
  { icon: "🎭", label: "Teatro pedagógico" },
  { icon: "🎮", label: "Jogos educativos" },
  { icon: "🎬", label: "Produção de vídeos" },
  { icon: "🔬", label: "Feiras de ciências" },
  { icon: "💬", label: "Debates e rodas" },
  { icon: "📋", label: "Oficinas e cartilhas" },
  { icon: "📐", label: "Projetos interdisciplinares" },
];

const STATS = [
  { num: "3", label: "Dimensões da doação" },
  { num: "10+", label: "Municípios sancionados" },
  { num: "3", label: "PLs em tramitação" },
  { num: "∞", label: "Vidas que podem ser salvas" },
];

/* ── Componente de seção das dimensões ── */
const DimCard = ({ dim, index }: { dim: typeof DIMS[0]; index: number }) => {
  const [activeTab, setActiveTab] = useState<"beneficiarios" | "mitos">("beneficiarios");
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("sm-visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`sm-card sm-card--${dim.color}`}
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div className="sm-card__head">
        <div className={`sm-card__num sm-card__num--${dim.color}`}>{dim.num}</div>
        <div className={`sm-card__icon sm-card__icon--${dim.color}`}>{dim.icon}</div>
        <span className={`sm-card__label sm-card__label--${dim.color}`}>{dim.label}</span>
        <h3 className="sm-card__title">{dim.title}</h3>
        <p className="sm-card__desc">{dim.desc}</p>
      </div>

      <div className="sm-card__tabs">
        <button
          className={`sm-tab ${activeTab === "beneficiarios" ? `sm-tab--active sm-tab--${dim.color}` : ""}`}
          onClick={() => setActiveTab("beneficiarios")}
        >
          <IconCheck /> Beneficiários
        </button>
        <button
          className={`sm-tab ${activeTab === "mitos" ? `sm-tab--active sm-tab--${dim.color}` : ""}`}
          onClick={() => setActiveTab("mitos")}
        >
          <IconX /> Mitos derrubados
        </button>
      </div>

      <ul className="sm-card__list">
        {(activeTab === "beneficiarios" ? dim.beneficiarios : dim.mitos).map((item) => (
          <li key={item} className={`sm-card__item sm-card__item--${activeTab === "beneficiarios" ? "check" : "x"} sm-card__item--${dim.color}`}>
            <span className="sm-card__item-icon">
              {activeTab === "beneficiarios" ? <IconCheck /> : <IconX />}
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className={`sm-card__fato sm-card__fato--${dim.color}`}>
        <IconStar />
        <p>{dim.fato}</p>
      </div>
    </div>
  );
};

/* ── Componente principal ── */
const SaibaMais = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      heroRef.current.style.setProperty("--scroll-y", `${window.scrollY * 0.3}px`);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="sm" id="saiba-mais">
      {/* ── Hero interno ── */}
      <section className="sm-hero" ref={heroRef}>
        <div className="sm-hero__bg">
          <div className="sm-hero__orb sm-hero__orb--1" />
          <div className="sm-hero__orb sm-hero__orb--2" />
          <div className="sm-hero__orb sm-hero__orb--3" />
          <div className="sm-hero__grid" />
        </div>
        <div className="sm-hero__body">
          <div className="sm-hero__badge">
            <span className="sm-hero__badge-dot" />
            Conheça a Política Pública
          </div>
          <h1 className="sm-hero__title">
            Promoção <em>3D</em>
          </h1>
          <p className="sm-hero__subtitle">
            Três dimensões da doação. Um único propósito.
          </p>
          <p className="sm-hero__quote">
            "Informar para conscientizar, conscientizar para sensibilizar e sensibilizar para salvar vidas."
          </p>

          <div className="sm-hero__dims">
            {DIMS.map((d) => (
              <a key={d.id} href={`#dim-${d.id}`} className={`sm-hero__dim sm-hero__dim--${d.color}`}>
                <span className="sm-hero__dim-icon">{d.icon}</span>
                <span>{d.label}</span>
                <IconArrow />
              </a>
            ))}
          </div>
        </div>

        <div className="sm-hero__stats">
          {STATS.map((s) => (
            <div key={s.label} className="sm-hero__stat">
              <strong>{s.num}</strong>
              <small>{s.label}</small>
            </div>
          ))}
        </div>
      </section>

      {/* ── O que é ── */}
      <section className="sm-section sm-what">
        <div className="sm-container">
          <div className="sm-what__grid">
            <div className="sm-what__left">
              <span className="sm-eyebrow">O que é</span>
              <h2 className="sm-section__title">Uma política pública <em>inovadora</em></h2>
              <p className="sm-what__text">
                A Promoção 3D é uma Política de Conscientização e Incentivo desenvolvida
                no âmbito acadêmico da <strong>Universidade de Pernambuco (UPE)</strong>, Campus
                Mata Norte, pelos pesquisadores <strong>PhD Múcio Luiz Banja Fernandez</strong> e{" "}
                <strong>Doutorando Eliabi Pereira da Silva</strong>.
              </p>
              <p className="sm-what__text">
                Seu nome representa as <em>três dimensões da doação</em> — todas voltadas à
                preservação da vida e ao fortalecimento da cidadania, respeitando contextos
                interétnico e interculturais.
              </p>
              <div className="sm-what__pillars">
                {[
                  { icon: <IconUsers />, t: "Educação em Saúde", s: "Integra ensino e cidadania" },
                  { icon: <IconBook />, t: "Base Científica", s: "BNCC, PNLD e aprendizagem significativa" },
                  { icon: <IconScale />, t: "Direitos Humanos", s: "Dignidade, solidariedade e justiça social" },
                ].map((p) => (
                  <div key={p.t} className="sm-pillar">
                    <div className="sm-pillar__icon">{p.icon}</div>
                    <div>
                      <strong>{p.t}</strong>
                      <small>{p.s}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sm-what__right">
              <div className="sm-obj-card">
                <h4 className="sm-obj-card__title">Objetivos Gerais</h4>
                {[
                  "Informar e conscientizar a população",
                  "Desmistificar tabus, medos e preconceitos",
                  "Incentivar a solidariedade",
                  "Promover cidadania e direitos humanos",
                  "Integrar educação e saúde",
                  "Formar multiplicadores do conhecimento",
                ].map((o) => (
                  <div key={o} className="sm-obj-card__item">
                    <span className="sm-obj-card__dot" />
                    {o}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Três Dimensões ── */}
      <section className="sm-section sm-dims">
        <div className="sm-container">
          <div className="sm-section__header">
            <span className="sm-eyebrow">As três dimensões</span>
            <h2 className="sm-section__title">Cada doação <em>salva vidas</em></h2>
            <p className="sm-section__lead">
              Clique nas abas de cada dimensão para explorar quem é beneficiado e quais mitos são derrubados.
            </p>
          </div>
          <div className="sm-dims__grid">
            {DIMS.map((dim, i) => (
              <div key={dim.id} id={`dim-${dim.id}`}>
                <DimCard dim={dim} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Escola e Metodologias ── */}
      <section className="sm-section sm-edu">
        <div className="sm-container">
          <div className="sm-edu__grid">
            <div>
              <span className="sm-eyebrow">Na escola</span>
              <h2 className="sm-section__title">Para todos os <em>níveis</em></h2>
              <p className="sm-edu__text">
                A Promoção 3D foi concebida para ser trabalhada em todos os segmentos da educação
                e pode ser integrada às disciplinas de Ciências, Biologia, História, Geografia,
                Língua Portuguesa, Matemática, Arte e Ensino Religioso.
              </p>
              <div className="sm-levels">
                {["Educação Infantil", "Ensino Fundamental", "Ensino Médio", "Ensino Superior"].map((l) => (
                  <span key={l} className="sm-level">{l}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="sm-edu__subtitle">Metodologias</h3>
              <div className="sm-met-grid">
                {METODOLOGIAS.map((m) => (
                  <div key={m.label} className="sm-met">
                    <span className="sm-met__icon">{m.icon}</span>
                    <span className="sm-met__label">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Competências */}
          <div className="sm-comp-row">
            <h3 className="sm-comp-row__title">Competências desenvolvidas nos estudantes</h3>
            <div className="sm-comp-tags">
              {COMPETENCIAS.map((c) => (
                <span key={c} className="sm-comp-tag">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Base Legal ── */}
      <section className="sm-section sm-legal">
        <div className="sm-container">
          <div className="sm-section__header">
            <span className="sm-eyebrow">Legislação</span>
            <h2 className="sm-section__title">Respaldo <em>legal</em></h2>
          </div>
          <div className="sm-legal__grid">
            {[
              {
                num: "PL 582",
                scope: "Estadual — PE",
                desc: "De autoria do Deputado Estadual Henrique Queiroz Filho.",
                color: "teal",
              },
              {
                num: "PL 5.233/23",
                scope: "Federal",
                desc: "De autoria do Deputado Federal Eduardo da Fonte.",
                color: "blue",
              },
              {
                num: "PL 110/24",
                scope: "Federal",
                desc: "Voltado à inserção no ensino fundamental, médio e acadêmico.",
                color: "purple",
              },
            ].map((pl) => (
              <div key={pl.num} className={`sm-pl sm-pl--${pl.color}`}>
                <div className={`sm-pl__num sm-pl__num--${pl.color}`}>{pl.num}</div>
                <span className={`sm-pl__scope sm-pl__scope--${pl.color}`}>{pl.scope}</span>
                <p className="sm-pl__desc">{pl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Municípios ── */}
      <section className="sm-section sm-munic">
        <div className="sm-container">
          <div className="sm-munic__grid">
            <div>
              <span className="sm-eyebrow">Expansão em Pernambuco</span>
              <h2 className="sm-section__title">Municípios que já <em>sancionaram</em></h2>
              <p className="sm-munic__text">
                A Promoção 3D avança por todo o estado. Esses municípios já possuem
                lei sancionada, e muitos outros estão em processo de aprovação.
              </p>
              <div className="sm-munic__map-icon">
                <IconPin />
                <span>Pernambuco, Brasil</span>
              </div>
            </div>
            <div className="sm-munic__list">
              {MUNICIPIOS.map((m, i) => (
                <div key={m} className="sm-munic__item">
                  <span className="sm-munic__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="sm-cta">
        <div className="sm-cta__bg">
          <div className="sm-cta__orb sm-cta__orb--1" />
          <div className="sm-cta__orb sm-cta__orb--2" />
        </div>
        <div className="sm-container sm-cta__body">
          <p className="sm-cta__eyebrow">Faça parte da mudança</p>
          <h2 className="sm-cta__title">
            Três dimensões da doação,<br />um único propósito —{" "}
            <em>salvar vidas</em>.
          </h2>
          <p className="sm-cta__sub">
            Converse com nosso assistente virtual e tire todas as suas dúvidas sobre
            doação de sangue, órgãos e leite humano.
          </p>
          <a
            href="https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d"
            target="_blank"
            rel="noreferrer"
            className="sm-cta__btn"
          >
            Converse com o Chatbot
            <IconArrow />
          </a>
        </div>
      </section>
    </main>
  );
};

export default SaibaMais;