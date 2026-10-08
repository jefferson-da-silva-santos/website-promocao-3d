import type { CSSProperties, FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChatCircleDots } from "@phosphor-icons/react";
import ChatPreview from "../../components/ChatPreview";
import { DIMENSIONS } from "../../data/dimensions";
import { SITE } from "../../data/site";

const HEADLINE = ["Doar", "sangue,", "órgãos", "e", "leite", "também", "se", "aprende"];

/**
 * Hero da home: tese educativa à esquerda, foto real de sala de aula à direita
 * com a prévia do assistente sobreposta em vidro fosco.
 */
const Inicio: FC = () => (
  <section className="hero" id="hero" aria-labelledby="hero-title">
    <div className="hero__grid-bg" aria-hidden="true" />

    <div className="hero__inner container">
      <div className="hero__copy">
        <p className="eyebrow">Política pública · Lei estadual nº 18.359/2023</p>

        <h1 className="hero__title" id="hero-title">
          <span className="sr-only">Promoção 3D: </span>
          {HEADLINE.map((word, i) => (
            <span key={word + i} className="hero__word" style={{ "--i": i } as CSSProperties}>
              {word}{" "}
            </span>
          ))}
          <em className="hero__word hero__word--accent" style={{ "--i": HEADLINE.length } as CSSProperties}>
            na escola.
          </em>
        </h1>

        <p className="hero__lead">
          A Promoção 3D leva informação científica às salas de aula para derrubar mitos e formar uma geração de
          doadores.
        </p>

        <div className="hero__actions">
          <Link to="/saiba-mais" className="btn btn--primary btn--lg">
            Conhecer a política
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
          <a className="btn btn--ghost btn--lg" href={SITE.chatbotUrl} target="_blank" rel="noreferrer noopener">
            <ChatCircleDots size={20} aria-hidden="true" />
            Tirar dúvidas
          </a>
        </div>
      </div>

      <figure className="hero__media">
        <div className="hero__photo">
          <img
            src="/expedicao/vale-sala-2.webp"
            alt="Estudantes da rede estadual reunidos em volta de uma mesa jogando um dos jogos educativos da Promoção 3D"
            width={1400}
            height={1050}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <ChatPreview className="hero__chat" />
        <figcaption>Jogos da Promoção 3D em sala de aula, GRE Vale do Capibaribe.</figcaption>
      </figure>
    </div>

    <ul className="hero__dims container" aria-label="As três dimensões da doação">
      {DIMENSIONS.map((dim) => (
        <li key={dim.id}>
          <Link to={`/saiba-mais#dim-${dim.id}`} className={`dim-link dim-link--${dim.id}`}>
            <span className="dim-dot" aria-hidden="true" />
            <span className="dim-link__label">{dim.label}</span>
            <ArrowRight className="dim-link__arrow" size={16} weight="bold" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

export default Inicio;
