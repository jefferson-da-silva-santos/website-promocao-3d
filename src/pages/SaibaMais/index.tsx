import { useState } from "react";
import type { CSSProperties, FC } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpenText,
  ChalkboardTeacher,
  ChatCircleDots,
  ChatsCircle,
  Check,
  ClipboardText,
  Drop,
  FilmSlate,
  FirstAidKit,
  Flask,
  GameController,
  HandHeart,
  MaskHappy,
  Scales,
  Star,
  UsersThree,
  X,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import PageShell from "../../components/layout/PageShell";
import { LEGAL_MILESTONES, SITE } from "../../data/site";
import { DIMENSIONS } from "../../data/dimensions";
import type { DimensionId } from "../../data/dimensions";
import { usePageMeta } from "../../hooks/usePageMeta";

interface DimensionDetail {
  readonly id: DimensionId;
  readonly num: string;
  readonly icon: Icon;
  readonly title: string;
  readonly desc: string;
  readonly beneficiarios: readonly string[];
  readonly mitos: readonly string[];
  readonly fato: string;
}

const DIMS: readonly DimensionDetail[] = [
  {
    id: "sangue",
    num: "01",
    icon: Drop,
    title: "Doação de sangue e transfusão",
    desc: "O sangue é um recurso insubstituível: nenhum laboratório do mundo consegue produzi-lo. Cada bolsa doada pode salvar até quatro vidas.",
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
    icon: FirstAidKit,
    title: "Doação de órgãos, tecidos e transplantes",
    desc: "No Brasil, mais de 60 mil pessoas aguardam na fila de transplantes. Uma única decisão de doação pode transformar a vida de até oito famílias.",
    beneficiarios: [
      "Coração: insuficiência cardíaca terminal",
      "Fígado: cirrose e hepatites graves",
      "Rins: insuficiência renal crônica",
      "Pulmões: doenças pulmonares obstrutivas",
      "Pâncreas: diabetes tipo 1 grave",
      "Córneas, ossos, pele e tendões",
    ],
    mitos: [
      "Os médicos não tentarão salvar minha vida",
      "O corpo ficará deformado após a doação",
      "Sou muito velho para ser doador",
      "Minha religião não permite a doação",
    ],
    fato: "No Brasil, é a família que autoriza a doação. Por isso, conte aos seus familiares que você deseja ser doador.",
  },
  {
    id: "leite",
    num: "03",
    icon: HandHeart,
    title: "Doação de leite humano e bancos de leite",
    desc: "O leite humano é o alimento mais completo para recém-nascidos, especialmente prematuros em UTIs neonatais, onde pode ser a diferença entre a vida e a morte.",
    beneficiarios: [
      "Bebês prematuros em UTI neonatal",
      "Recém-nascidos com baixo peso",
      "Bebês cujas mães não podem amamentar",
      "Crianças com alergia a fórmulas artificiais",
    ],
    mitos: [
      "Meu leite é fraco e não serve para doação",
      "Preciso produzir muito leite para poder doar",
      "Se eu doar, faltará leite para meu filho",
      "O processo de doação é complicado e invasivo",
    ],
    fato: "Mesmo pequenas quantidades fazem diferença. Os Bancos de Leite Humano pasteurizam e distribuem o leite com segurança total.",
  },
];

const MUNICIPIOS = [
  "Nazaré da Mata",
  "Carpina",
  "Vitória de Santo Antão",
  "Garanhuns",
  "Belo Jardim",
  "Passira",
  "Buíque",
  "Chã Grande",
  "Triunfo",
  "São José do Egito",
];

const COMPETENCIAS = [
  "Empatia",
  "Solidariedade",
  "Pensamento crítico",
  "Responsabilidade social",
  "Comunicação",
  "Argumentação",
  "Respeito à diversidade",
];

const METODOLOGIAS: ReadonlyArray<{ icon: Icon; label: string }> = [
  { icon: ChalkboardTeacher, label: "Aulas expositivas" },
  { icon: MaskHappy, label: "Teatro pedagógico" },
  { icon: GameController, label: "Jogos educativos" },
  { icon: FilmSlate, label: "Produção de vídeos" },
  { icon: Flask, label: "Feiras de ciências" },
  { icon: ChatsCircle, label: "Debates e rodas" },
  { icon: ClipboardText, label: "Oficinas e cartilhas" },
  { icon: BookOpenText, label: "Projetos interdisciplinares" },
];

const PILLARS: ReadonlyArray<{ icon: Icon; title: string; text: string }> = [
  { icon: UsersThree, title: "Educação em saúde", text: "Integra ensino e cidadania" },
  { icon: BookOpenText, title: "Base científica", text: "BNCC, PNLD e aprendizagem significativa" },
  { icon: Scales, title: "Direitos humanos", text: "Dignidade, solidariedade e justiça social" },
];

const OBJETIVOS = [
  "Informar e conscientizar a população",
  "Desmistificar tabus, medos e preconceitos",
  "Incentivar a solidariedade",
  "Promover cidadania e direitos humanos",
  "Integrar educação e saúde",
  "Formar multiplicadores do conhecimento",
];

// ─── Painel de uma dimensão ──────────────────────────────────────────────────

const DimensionPanel: FC<{ readonly dim: DimensionDetail }> = ({ dim }) => {
  const [tab, setTab] = useState<"beneficiarios" | "mitos">("beneficiarios");
  const items = tab === "beneficiarios" ? dim.beneficiarios : dim.mitos;
  const IconCmp = dim.icon;

  return (
    <article className={`dim-panel dim-panel--${dim.id}`} id={`dim-${dim.id}`} data-aos="fade-up">
      <div className="dim-panel__intro">
        <span className="dim-panel__num">{dim.num}</span>
        <span className="dim-panel__icon" aria-hidden="true">
          <IconCmp size={26} weight="fill" />
        </span>
        <h3>{dim.title}</h3>
        <p>{dim.desc}</p>
        <p className="dim-panel__fact">
          <Star size={18} weight="fill" aria-hidden="true" />
          {dim.fato}
        </p>
      </div>

      <div className="dim-panel__lists">
        <div className="dim-panel__tabs" role="group" aria-label="Alternar lista">
          <button type="button" aria-pressed={tab === "beneficiarios"} onClick={() => setTab("beneficiarios")}>
            <Check size={16} weight="bold" aria-hidden="true" />
            Quem é beneficiado
          </button>
          <button type="button" aria-pressed={tab === "mitos"} onClick={() => setTab("mitos")}>
            <X size={16} weight="bold" aria-hidden="true" />
            Mitos derrubados
          </button>
        </div>
        <ul className={`dim-panel__items dim-panel__items--${tab}`} key={tab}>
          {items.map((item, i) => (
            <li key={item} style={{ "--i": i } as CSSProperties}>
              <span aria-hidden="true">
                {tab === "beneficiarios" ? <Check size={14} weight="bold" /> : <X size={14} weight="bold" />}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

// ─── Página ──────────────────────────────────────────────────────────────────

/** "Saiba mais": a política em profundidade, para professores, gestores e estudantes. */
const SaibaMais: FC = () => {
  usePageMeta(
    "Saiba mais sobre a política | Promoção 3D",
    "Conheça as três dimensões da Promoção 3D, as metodologias para a escola, a base legal e os municípios que já sancionaram a política.",
  );

  return (
    <PageShell className="learn">
      <header className="page-head page-head--learn">
        <div className="hero__grid-bg" aria-hidden="true" />
        <div className="container page-head__inner">
          <p className="eyebrow">Conheça a política pública</p>
          <h1 className="page-title">
            Três dimensões da doação. <em>Um único propósito.</em>
          </h1>
          <blockquote className="learn__quote">
            “Informar para conscientizar, conscientizar para sensibilizar e sensibilizar para salvar vidas.”
          </blockquote>
          <ul className="learn__jump" aria-label="Ir para uma dimensão">
            {DIMENSIONS.map((d) => (
              <li key={d.id}>
                <a href={`#dim-${d.id}`} className={`dim-link dim-link--${d.id}`}>
                  <span className="dim-dot" aria-hidden="true" />
                  <span className="dim-link__label">{d.label}</span>
                  <ArrowRight className="dim-link__arrow" size={16} weight="bold" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <section className="section learn__what" aria-labelledby="oque-title">
        <div className="container learn__what-grid">
          <div data-aos="fade-up">
            <h2 className="section-title" id="oque-title">
              Uma política pública <em>inovadora.</em>
            </h2>
            <p className="lead">
              A Promoção 3D é uma política de conscientização e incentivo desenvolvida na Universidade de Pernambuco
              (UPE), Campus Mata Norte, pelos pesquisadores PhD Múcio Luiz Banja Fernandez e Eliabi Pereira da Silva.
            </p>
            <p>
              O nome representa as três dimensões da doação, todas voltadas à preservação da vida e ao fortalecimento da
              cidadania, respeitando contextos interétnicos e interculturais.
            </p>
            <ul className="pillars">
              {PILLARS.map(({ icon: IconCmp, title, text }) => (
                <li key={title}>
                  <span className="pillars__icon" aria-hidden="true">
                    <IconCmp size={22} />
                  </span>
                  <span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="objectives" data-aos="fade-up" data-aos-delay="80">
            <h3>Objetivos gerais</h3>
            <ol>
              {OBJETIVOS.map((o, i) => (
                <li key={o}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {o}
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="section learn__dims" aria-labelledby="dims-title">
        <div className="container">
          <h2 className="section-title" id="dims-title" data-aos="fade-up">
            Cada doação <em>salva vidas.</em>
          </h2>
          <div className="learn__dims-list">
            {DIMS.map((dim) => (
              <DimensionPanel key={dim.id} dim={dim} />
            ))}
          </div>
        </div>
      </section>

      <section className="section learn__school" aria-labelledby="escola-title">
        <div className="container learn__school-grid">
          <div data-aos="fade-up">
            <h2 className="section-title" id="escola-title">
              Para todos os <em>níveis de ensino.</em>
            </h2>
            <p>
              A Promoção 3D pode ser trabalhada da Educação Infantil ao Ensino Superior e integrada às disciplinas de
              Ciências, Biologia, História, Geografia, Língua Portuguesa, Matemática, Arte e Ensino Religioso.
            </p>
            <ul className="levels">
              {["Educação Infantil", "Ensino Fundamental", "Ensino Médio", "Ensino Superior"].map((l, i) => (
                <li key={l} style={{ "--i": i } as CSSProperties}>
                  {l}
                </li>
              ))}
            </ul>
            <h3 className="learn__subhead">Competências desenvolvidas nos estudantes</h3>
            <ul className="tags">
              {COMPETENCIAS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          <div data-aos="fade-up" data-aos-delay="80">
            <h3 className="learn__subhead">Metodologias</h3>
            <ul className="methods">
              {METODOLOGIAS.map(({ icon: IconCmp, label }) => (
                <li key={label}>
                  <IconCmp size={24} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section learn__law" aria-labelledby="lei-title">
        <div className="container">
          <h2 className="section-title" id="lei-title" data-aos="fade-up">
            Respaldo <em>legal.</em>
          </h2>
          <ol className="laws">
            {LEGAL_MILESTONES.map((law, i) => (
              <li key={law.code} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="laws__scope">{law.scope}</span>
                <strong className="laws__code">{law.code}</strong>
                <span className="laws__title">{law.title}</span>
                <p>{law.summary}</p>
                <small>{law.author}</small>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section learn__cities" aria-labelledby="mun-title">
        <div className="container learn__cities-grid">
          <div data-aos="fade-up">
            <h2 className="section-title" id="mun-title">
              Municípios que já <em>sancionaram.</em>
            </h2>
            <p>
              A Promoção 3D avança por Pernambuco. Estes municípios já têm lei sancionada, e muitos outros estão em
              processo de aprovação.
            </p>
            <Link to="/expedicao" className="text-link">
              Ver a expedição pelas escolas do estado
              <ArrowRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          </div>
          <ol className="cities" data-aos="fade-up" data-aos-delay="80">
            {MUNICIPIOS.map((m, i) => (
              <li key={m}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {m}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section learn__cta" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta-panel" data-aos="fade-up">
            <h2 className="section-title" id="cta-title">
              Tire suas dúvidas com o <em>assistente da Promoção 3D.</em>
            </h2>
            <p>Pergunte sobre doação de sangue, órgãos e leite humano, em qualquer horário.</p>
            <a className="btn btn--primary btn--lg" href={SITE.chatbotUrl} target="_blank" rel="noreferrer noopener">
              <ChatCircleDots size={20} aria-hidden="true" />
              Conversar com o assistente
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default SaibaMais;
