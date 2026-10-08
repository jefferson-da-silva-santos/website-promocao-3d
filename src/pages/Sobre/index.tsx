import type { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, Scales } from "@phosphor-icons/react";
const UPE = "/media/UPE.jpeg";
import { LEGAL_MILESTONES, RESEARCHERS } from "../../data/site";

/**
 * "Como surgiu": a origem acadêmica da política e a linha do tempo legal,
 * da pesquisa na UPE ao Congresso Nacional.
 */
const Sobre: FC = () => (
  <section className="section about" id="sobre" aria-labelledby="sobre-title">
    <div className="container about__grid">
      <div className="about__copy" data-aos="fade-up">
        <h2 className="section-title" id="sobre-title">
          Uma pesquisa da universidade que virou <em>lei.</em>
        </h2>
        <p className="lead">
          A Promoção 3D nasceu da pesquisa do doutorando em Educação Eliabi Pereira e de seu orientador, PhD Múcio
          Banja, na Universidade de Pernambuco, Campus Mata Norte.
        </p>
        <p>
          O trabalho se tornou a Lei nº 18.359, de 27 de outubro de 2023, no Estado de Pernambuco, e foi apresentado no
          Congresso Nacional como Política Pública Nacional e como Programa Nacional de Ensino.
        </p>

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

        <Link to="/saiba-mais" className="text-link">
          Entenda a política em detalhes
          <ArrowRight size={16} weight="bold" aria-hidden="true" />
        </Link>
      </div>

      <div className="about__visual">
        <figure className="about__photo" data-aos="fade-up" data-aos-delay="80">
          <img
            src={UPE}
            alt="Fachada da Universidade de Pernambuco, onde a pesquisa da Promoção 3D foi desenvolvida"
            loading="lazy"
          />
        </figure>

        <ol className="timeline" aria-label="Da pesquisa à lei">
          <li className="timeline__item" data-aos="fade-up" data-aos-delay="120">
            <span className="timeline__icon" aria-hidden="true">
              <GraduationCap size={18} weight="bold" />
            </span>
            <div>
              <span className="timeline__code">Pesquisa acadêmica</span>
              <strong>Universidade de Pernambuco</strong>
              <p>Doutorado em Educação, Campus Mata Norte.</p>
            </div>
          </li>
          {LEGAL_MILESTONES.map((law, i) => (
            <li key={law.code} className="timeline__item" data-aos="fade-up" data-aos-delay={180 + i * 60}>
              <span className="timeline__icon" aria-hidden="true">
                <Scales size={18} weight="bold" />
              </span>
              <div>
                <span className="timeline__code">
                  {law.code} <span className="tag">{law.scope}</span>
                </span>
                <strong>{law.title}</strong>
                <p>{law.author}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

export default Sobre;
