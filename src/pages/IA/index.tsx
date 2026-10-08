import type { FC } from "react";
import {
  Bank,
  Buildings,
  ChalkboardTeacher,
  ChatCircleDots,
  Check,
  FirstAid,
  Globe,
  GraduationCap,
  MapPinArea,
  NotePencil,
  ShieldCheck,
  Student,
  UserGear,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import PageShell from "../../components/layout/PageShell";
import ChatPreview from "../../components/ChatPreview";
import { DIMENSIONS } from "../../data/dimensions";
import { LEGAL_MILESTONES, RESEARCHERS, SITE } from "../../data/site";
import { usePageMeta } from "../../hooks/usePageMeta";

const DIM_DESC: Record<string, string> = {
  sangue: "Doação e transfusão de sangue, desmistificando medos e tabus.",
  orgaos: "Doação de órgãos e tecidos, transplantes e critérios éticos e legais.",
  leite: "Bancos de leite humano e a importância da doação para prematuros.",
};

const CAPABILITIES: ReadonlyArray<{ icon: Icon; title: string; items: readonly string[] }> = [
  {
    icon: GraduationCap,
    title: "Ensino e orientação",
    items: [
      "Explica o que é a Promoção 3D",
      "Ensina sobre doação de sangue, órgãos e leite",
      "Esclarece dúvidas sobre transplantes e bancos de leite",
      "Orienta sobre fundamentos sociais, éticos e legais",
    ],
  },
  {
    icon: Bank,
    title: "Apoio institucional",
    items: [
      "Informa sobre a Lei 18.359/2023, o PL 5.233/2023 e o PL 110/2024",
      "Auxilia escolas, universidades e municípios",
      "Orienta gestores na aplicação da política",
      "Apoia profissionais de saúde com conteúdo técnico",
    ],
  },
  {
    icon: NotePencil,
    title: "Criação de conteúdo",
    items: [
      "Textos educativos e cartilhas",
      "Planos de aula e projetos pedagógicos",
      "Campanhas e materiais para redes sociais",
      "Conteúdos institucionais e palestras",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Combate a mitos",
    items: [
      "Desfaz medos sobre doação de sangue",
      "Esclarece tabus sobre doação de órgãos",
      "Corrige desinformação sobre leite materno",
      "Promove cidadania e solidariedade",
    ],
  },
];

const PUBLICS: ReadonlyArray<{ icon: Icon; label: string }> = [
  { icon: Student, label: "Estudantes" },
  { icon: ChalkboardTeacher, label: "Professores" },
  { icon: FirstAid, label: "Profissionais da saúde" },
  { icon: UserGear, label: "Gestores" },
  { icon: Buildings, label: "Escolas" },
  { icon: MapPinArea, label: "Municípios" },
  { icon: Globe, label: "Sociedade" },
];

/** Página do assistente de IA: o que ele sabe, para quem serve e de onde veio. */
const IA: FC = () => {
  usePageMeta(
    "Agente IA | Promoção 3D",
    "Converse com o assistente oficial da Promoção 3D: dúvidas sobre doação de sangue, órgãos e leite humano, planos de aula e materiais educativos.",
  );

  return (
    <PageShell className="agent">
      <header className="page-head page-head--agent">
        <div className="hero__grid-bg" aria-hidden="true" />
        <div className="container agent__head">
          <div className="agent__copy">
            <p className="eyebrow">Assistente online 24 horas</p>
            <h1 className="page-title">
              O assistente oficial da <em>Promoção 3D.</em>
            </h1>
            <p className="lead">
              Orienta, ensina e esclarece, de forma didática, tudo o que envolve a política de conscientização e
              incentivo à doação de sangue, órgãos e leite humano.
            </p>
            <a className="btn btn--primary btn--lg" href={SITE.chatbotUrl} target="_blank" rel="noreferrer noopener">
              <ChatCircleDots size={20} aria-hidden="true" />
              Conversar com o agente
            </a>
          </div>
          <ChatPreview className="agent__chat" />
        </div>
      </header>

      <section className="section agent__dims" aria-labelledby="frentes-title">
        <div className="container">
          <h2 className="section-title" id="frentes-title" data-aos="fade-up">
            Três frentes que ele <em>domina.</em>
          </h2>
          <ol className="agent__fronts">
            {DIMENSIONS.map((d, i) => (
              <li key={d.id} className={`dim-link--${d.id}`} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="dim-dot" aria-hidden="true" />
                <strong>{d.label}</strong>
                <p>{DIM_DESC[d.id]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section agent__caps" aria-labelledby="caps-title">
        <div className="container">
          <h2 className="section-title" id="caps-title" data-aos="fade-up">
            O que ele pode fazer <em>por você.</em>
          </h2>
          <div className="caps">
            {CAPABILITIES.map(({ icon: IconCmp, title, items }, i) => (
              <article key={title} className="caps__item" data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="caps__icon" aria-hidden="true">
                  <IconCmp size={24} />
                </span>
                <h3>{title}</h3>
                <ul>
                  {items.map((it) => (
                    <li key={it}>
                      <Check size={16} weight="bold" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section agent__public" aria-labelledby="publico-title">
        <div className="container agent__public-grid">
          <h2 className="section-title section-title--sm" id="publico-title" data-aos="fade-up">
            Um assistente para toda a sociedade.
          </h2>
          <ul className="audience" data-aos="fade-up" data-aos-delay="60">
            {PUBLICS.map(({ icon: IconCmp, label }) => (
              <li key={label}>
                <IconCmp size={20} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section agent__origin" aria-labelledby="origem-title">
        <div className="container agent__origin-grid">
          <div data-aos="fade-up">
            <h2 className="section-title section-title--sm" id="origem-title">
              Criado na Universidade de Pernambuco.
            </h2>
            <ul className="about__people">
              {RESEARCHERS.map((r) => (
                <li key={r.name}>
                  <span className="avatar avatar--lg" aria-hidden="true">
                    {r.initials}
                  </span>
                  <span>
                    <strong>{r.name}</strong>
                    <small>{r.role}</small>
                  </span>
                </li>
              ))}
            </ul>
            <p className="agent__note">
              A Promoção 3D já é adotada por diversos municípios pernambucanos e segue em expansão pelo Brasil,
              transformando informação em cidadania, solidariedade e promoção da vida.
            </p>
          </div>
          <ul className="law-list" data-aos="fade-up" data-aos-delay="80">
            {LEGAL_MILESTONES.map((law) => (
              <li key={law.code}>
                <span className="tag">{law.scope}</span>
                <strong>{law.code}</strong>
                <p>{law.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section learn__cta" aria-labelledby="agent-cta">
        <div className="container">
          <div className="cta-panel" data-aos="fade-up">
            <h2 className="section-title" id="agent-cta">
              Pronto para aprender <em>e ensinar?</em>
            </h2>
            <p>Converse agora com o assistente e transforme conhecimento em cidadania.</p>
            <a className="btn btn--primary btn--lg" href={SITE.chatbotUrl} target="_blank" rel="noreferrer noopener">
              <ChatCircleDots size={20} aria-hidden="true" />
              Iniciar conversa
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
};

export default IA;
