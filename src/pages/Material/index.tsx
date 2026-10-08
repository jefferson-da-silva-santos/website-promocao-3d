import type { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChatCircleDots, FileText, Newspaper } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
const chat = "/media/chat.png";
import { SITE } from "../../data/site";

interface Resource {
  readonly icon: Icon;
  readonly title: string;
  readonly description: string;
  /** Vazio enquanto o arquivo não for publicado: o item aparece como "em breve". */
  readonly href: string;
}

const RESOURCES: readonly Resource[] = [
  {
    icon: Newspaper,
    title: "Matéria completa sobre a Promoção 3D",
    description: "Reportagem com a história e os objetivos da política.",
    href: "",
  },
  {
    icon: FileText,
    title: "Tese do doutorando Eliabi Pereira",
    description: "Trabalho acadêmico que deu origem à política pública.",
    href: "",
  },
];

/** Material de apoio: o Agente IA e os documentos de referência da pesquisa. */
const Material: FC = () => (
  <section className="section material" id="material" aria-labelledby="material-title">
    <div className="container">
      <div className="material__panel" data-aos="fade-up">
        <div className="material__copy">
          <h2 className="section-title" id="material-title">
            Um assistente treinado para <em>ensinar sobre doação.</em>
          </h2>
          <p>
            A Promoção 3D ganhou um assistente de inteligência artificial alimentado com o conteúdo da política pública.
            Ele responde dúvidas, conscientiza e ajuda professores a preparar aulas sobre transfusões, transplantes e
            doações.
          </p>
          <div className="material__actions">
            <a className="btn btn--primary" href={SITE.chatbotUrl} target="_blank" rel="noreferrer noopener">
              <ChatCircleDots size={20} aria-hidden="true" />
              Conversar com o assistente
            </a>
            <Link to="/agente" className="text-link">
              O que ele sabe fazer
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <figure className="material__figure">
          <img src={chat} alt="Tela do assistente virtual da Promoção 3D" loading="lazy" />
        </figure>
      </div>

      <ul className="resources" aria-label="Documentos de referência">
        {RESOURCES.map(({ icon: IconCmp, title, description, href }, i) => {
          const content = (
            <>
              <span className="resource__icon" aria-hidden="true">
                <IconCmp size={22} />
              </span>
              <span className="resource__text">
                <strong>{title}</strong>
                <small>{description}</small>
              </span>
              <span className="resource__state">
                {href ? <ArrowUpRight size={18} weight="bold" aria-hidden="true" /> : "Em breve"}
              </span>
            </>
          );
          return (
            <li key={title} data-aos="fade-up" data-aos-delay={i * 80}>
              {href ? (
                <a className="resource" href={href} target="_blank" rel="noreferrer noopener">
                  {content}
                </a>
              ) : (
                <span className="resource is-disabled" aria-disabled="true">
                  {content}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default Material;
