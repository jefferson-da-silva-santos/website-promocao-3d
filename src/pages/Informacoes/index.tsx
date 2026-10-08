import type { FC } from "react";
import { Drop, FirstAidKit, HandHeart } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import type { DimensionId } from "../../data/dimensions";

interface Fact {
  readonly dim: DimensionId;
  readonly icon: Icon;
  readonly figure: string;
  readonly figureLabel: string;
  readonly title: string;
  readonly text: string;
}

const FACTS: readonly Fact[] = [
  {
    dim: "sangue",
    icon: Drop,
    figure: "4",
    figureLabel: "vidas",
    title: "Doação de sangue",
    text: "É rápida, segura e uma única bolsa pode salvar até quatro vidas. Pode doar quem tem entre 16 e 69 anos e pesa mais de 50 kg.",
  },
  {
    dim: "orgaos",
    icon: FirstAidKit,
    figure: "SUS",
    figureLabel: "gratuito",
    title: "Doação de órgãos e tecidos",
    text: "Salva vidas e depende da autorização da família e da compatibilidade avaliada pelo SUS, sem nenhum custo.",
  },
  {
    dim: "leite",
    icon: HandHeart,
    figure: "1 ml",
    figureLabel: "já ajuda",
    title: "Doação de leite humano",
    text: "Nutre bebês prematuros. Qualquer quantidade conta para os Bancos de Leite Humano.",
  },
];

/** Três fatos essenciais em grade assimétrica: o primeiro ganha destaque. */
const Informacoes: FC = () => (
  <section className="section facts" id="informacoes" aria-labelledby="informacoes-title">
    <div className="container">
      <h2 className="section-title facts__title" id="informacoes-title" data-aos="fade-up">
        O que todo estudante <em>deveria saber</em> sobre doação.
      </h2>

      <div className="facts__grid">
        {FACTS.map(({ dim, icon: IconCmp, figure, figureLabel, title, text }, i) => (
          <article key={dim} className={`fact fact--${dim}`} data-aos="fade-up" data-aos-delay={i * 90}>
            <header className="fact__head">
              <span className="fact__icon" aria-hidden="true">
                <IconCmp size={22} weight="fill" />
              </span>
              <h3>{title}</h3>
            </header>
            <p className="fact__figure">
              <strong>{figure}</strong>
              <span>{figureLabel}</span>
            </p>
            <p className="fact__text">{text}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Informacoes;
