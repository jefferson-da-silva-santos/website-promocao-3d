import { useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowsIn, MagnifyingGlassPlus } from "@phosphor-icons/react";
import PageShell from "../../components/layout/PageShell";
import ExpeditionMap from "./ExpeditionMap";
import StopPanel from "./StopPanel";
import { MACRO_LABEL, MODALITY_LABEL, RESEARCH_FACTS, STOPS } from "./data/expedition";
import type { Macro, Modality } from "./data/expedition";
import { usePageMeta } from "../../hooks/usePageMeta";

const MACROS: readonly Macro[] = ["litoral", "agreste", "sertao"];
const MODALITIES: readonly Modality[] = ["EREM", "EREF", "ETE", "EREMQ", "EREMI", "EE", "GRE"];

const shortName = (name: string) =>
  name
    .replace(/^GRE\s+/, "")
    .replace("Sertão do ", "")
    .replace("Metropolitana", "Metro");

/**
 * Expedição: diário de bordo interativo da pesquisa de campo pelas 16 GREs.
 * A parada ativa fica na URL (`?destino=`), então cada destino pode ser compartilhado.
 */
const Expedicao: FC = () => {
  usePageMeta(
    "Expedição pelas GREs de Pernambuco | Promoção 3D",
    "Mapa interativo da pesquisa de campo da Promoção 3D nas 16 Gerências Regionais de Educação de Pernambuco, com fotos e histórias de cada escola visitada.",
  );

  const [params, setParams] = useSearchParams();
  const fromUrl = STOPS.findIndex((s) => s.id === params.get("destino"));
  const [active, setActive] = useState(fromUrl >= 0 ? fromUrl : 0);
  const [zoom, setZoom] = useState(true);
  const stripRef = useRef<HTMLOListElement | null>(null);
  const stop = STOPS[active];

  const select = (index: number) => {
    const bounded = Math.min(Math.max(index, 0), STOPS.length - 1);
    setActive(bounded);
    setParams({ destino: STOPS[bounded].id }, { replace: true, preventScrollReset: true });
  };

  // Mantém o destino ativo visível na fita do roteiro.
  useEffect(() => {
    const strip = stripRef.current;
    const chip = strip?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    if (!strip || !chip) return;
    // Rola só a fita, na horizontal: scrollIntoView moveria a página inteira.
    const left = chip.offsetLeft - strip.clientWidth / 2 + chip.offsetWidth / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    strip.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  const schools = useMemo(() => STOPS.reduce((n, s) => n + s.visits.filter((v) => v.modality !== "GRE").length, 0), []);

  return (
    <PageShell className="expedition-page">
      <section className="expedition-hero" aria-labelledby="expedicao-title">
        <div className="hero__grid-bg" aria-hidden="true" />
        <div className="container expedition-hero__inner">
          <div className="expedition-hero__copy">
            <p className="eyebrow">Expedição Promoção 3D</p>
            <h1 id="expedicao-title" className="page-title">
              Uma viagem pelas escolas de <em>Pernambuco.</em>
            </h1>
            <p className="lead">
              O roteiro da pesquisa de campo que levou a Promoção 3D a professores e estudantes das 16 Gerências
              Regionais de Educação, do litoral ao Sertão.
            </p>
          </div>

          <dl className="figures">
            <div>
              <dt>Gerências regionais</dt>
              <dd>{RESEARCH_FACTS.gres}</dd>
            </div>
            <div>
              <dt>Municípios e a ilha de Noronha</dt>
              <dd>{RESEARCH_FACTS.municipalities}</dd>
            </div>
            <div>
              <dt>Escolas visitadas</dt>
              <dd>{schools}</dd>
            </div>
            <div>
              <dt>Professores e estudantes</dt>
              <dd>{RESEARCH_FACTS.teachers + RESEARCH_FACTS.students}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="explorer" aria-label="Mapa da expedição">
        <div className="container explorer__grid">
          <div className="explorer__map-card">
            <ExpeditionMap activeIndex={active} onSelect={select} zoom={zoom} />

            <div className="explorer__overlay">
              <ul className="legend" aria-label="Legenda">
                {MACROS.map((m) => (
                  <li key={m} className={`legend__item legend__item--${m}`}>
                    <span aria-hidden="true" />
                    {MACRO_LABEL[m]}
                  </li>
                ))}
              </ul>
              <button type="button" className="glass-btn" onClick={() => setZoom((z) => !z)} aria-pressed={zoom}>
                {zoom ? (
                  <ArrowsIn size={16} weight="bold" aria-hidden="true" />
                ) : (
                  <MagnifyingGlassPlus size={16} weight="bold" aria-hidden="true" />
                )}
                {zoom ? "Ver o estado inteiro" : "Aproximar destino"}
              </button>
            </div>

            <ol className="route-strip" ref={stripRef} aria-label="Roteiro da expedição">
              {STOPS.map((s, i) => (
                <li key={s.id}>
                  <button
                    type="button"
                    data-index={i}
                    className={`route-chip route-chip--${s.macro}${i === active ? " is-active" : ""}${i < active ? " is-past" : ""}`}
                    aria-current={i === active ? "step" : undefined}
                    onClick={() => select(i)}
                  >
                    <span className="route-chip__num">{i + 1}</span>
                    <span className="route-chip__text">
                      <strong>{shortName(s.name)}</strong>
                      <small>{s.seat}</small>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <StopPanel stop={stop} index={active} total={STOPS.length} onStep={(d) => select(active + d)} />
          <p className="sr-only" aria-live="polite">
            Destino {active + 1}: {stop.name}, sede em {stop.seat}.
          </p>
        </div>
      </section>

      <section className="section expedition-notes" aria-labelledby="notas-title">
        <div className="container expedition-notes__grid">
          <div>
            <h2 className="section-title section-title--sm" id="notas-title">
              Sobre a pesquisa de campo
            </h2>
            <p>
              Após a aprovação do Comitê de Ética, foram realizadas visitas pré-agendadas para entrevistar{" "}
              {RESEARCH_FACTS.teachers} professores das 16 GREs e {RESEARCH_FACTS.students} estudantes da Rede Pública
              Estadual de Educação de Pernambuco.
            </p>
            <p className="expedition-notes__source">
              Fotos: arquivo pessoal do autor da pesquisa (2026). Escolas e GREs:{" "}
              <a href="https://portal.educacao.pe.gov.br/gres-e-escolas/" target="_blank" rel="noreferrer noopener">
                Secretaria de Educação de Pernambuco
              </a>
              .
            </p>
          </div>

          <dl className="glossary">
            {MODALITIES.map((m) => (
              <div key={m}>
                <dt>
                  <span className={`badge badge--${m.toLowerCase()}`}>{m}</span>
                </dt>
                <dd>{MODALITY_LABEL[m]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </PageShell>
  );
};

export default Expedicao;
