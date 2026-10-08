import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { CaretLeft, CaretRight, ImageSquare, MapPin } from "@phosphor-icons/react";
import Lightbox from "../../components/Lightbox";
import type { LightboxImage } from "../../components/Lightbox";
import { MACRO_LABEL, MODALITY_LABEL } from "./data/expedition";
import type { Stop, Visit } from "./data/expedition";

const full = (file: string) => `/expedicao/${file}.webp`;
const thumb = (file: string) => `/expedicao/thumbs/${file}.webp`;

// ─── Uma escola ou GRE visitada ──────────────────────────────────────────────

interface VisitBlockProps {
  readonly visit: Visit;
  readonly onOpen: (images: readonly LightboxImage[], index: number) => void;
}

const MAX_THUMBS = 4;

const VisitBlock: FC<VisitBlockProps> = ({ visit, onOpen }) => {
  const images: LightboxImage[] = visit.photos.map((p) => ({ src: full(p.file), alt: p.alt, caption: visit.name }));
  const [cover, ...rest] = visit.photos;
  const extra = rest.length - MAX_THUMBS;

  return (
    <article className="visit">
      <header className="visit__head">
        <abbr className={`badge badge--${visit.modality.toLowerCase()}`} title={MODALITY_LABEL[visit.modality]}>
          {visit.modality}
        </abbr>
        <h4>{visit.name}</h4>
        <p className="visit__place">
          <MapPin size={14} weight="fill" aria-hidden="true" />
          {visit.municipality}
        </p>
      </header>

      {cover ? (
        <div className={`visit__gallery${rest.length ? " has-thumbs" : ""}`}>
          <button
            type="button"
            className="visit__cover"
            onClick={() => onOpen(images, 0)}
            aria-label={`Ampliar foto: ${cover.alt}`}
          >
            <img src={full(cover.file)} alt={cover.alt} loading="lazy" decoding="async" />
          </button>
          {rest.slice(0, MAX_THUMBS).map((p, i) => {
            const isLast = i === MAX_THUMBS - 1 && extra > 0;
            return (
              <button
                key={p.file}
                type="button"
                className="visit__thumb"
                onClick={() => onOpen(images, i + 1)}
                aria-label={isLast ? `Ver mais ${extra + 1} fotos` : `Ampliar foto: ${p.alt}`}
              >
                <img src={thumb(p.file)} alt="" loading="lazy" decoding="async" />
                {isLast && <span className="visit__more">+{extra + 1}</span>}
              </button>
            );
          })}
        </div>
      ) : (
        <p className="visit__nophoto">
          <ImageSquare size={18} aria-hidden="true" />
          Sem registro fotográfico publicado desta visita.
        </p>
      )}

      {visit.about && <p className="visit__about">{visit.about}</p>}
    </article>
  );
};

// ─── Painel da parada ────────────────────────────────────────────────────────

interface StopPanelProps {
  readonly stop: Stop;
  readonly index: number;
  readonly total: number;
  readonly onStep: (delta: number) => void;
}

/** Painel lateral com a GRE ativa, suas escolas visitadas e a navegação do roteiro. */
const StopPanel: FC<StopPanelProps> = ({ stop, index, total, onStep }) => {
  const [viewer, setViewer] = useState<{ images: readonly LightboxImage[]; index: number } | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [stop.id]);

  return (
    <aside className={`stop-panel stop-panel--${stop.macro}`} aria-labelledby="stop-panel-title">
      <div className="stop-panel__scroll" ref={scrollRef} key={stop.id}>
        <header className="stop-panel__head">
          <p className="stop-panel__meta">
            <span className="stop-panel__index">
              Destino {index + 1} de {total}
            </span>
            <span className={`macro-tag macro-tag--${stop.macro}`}>{MACRO_LABEL[stop.macro]}</span>
          </p>
          <h3 id="stop-panel-title">{stop.name}</h3>
          <p className="stop-panel__seat">
            Sede em <strong>{stop.seat}</strong>
            {stop.date && (
              <>
                {" "}
                · visita em{" "}
                <time dateTime={stop.date}>{new Date(`${stop.date}T12:00:00`).toLocaleDateString("pt-BR")}</time>
              </>
            )}
          </p>
          <details className="stop-panel__coverage">
            <summary>
              Abrange {stop.coverage.length} {stop.coverage.length === 1 ? "área" : "municípios"}
            </summary>
            <p>{stop.coverage.join(", ")}.</p>
            <small>{stop.decree}</small>
          </details>
        </header>

        <div className="stop-panel__visits">
          {stop.visits.map((visit) => (
            <VisitBlock key={visit.name} visit={visit} onOpen={(images, i) => setViewer({ images, index: i })} />
          ))}
        </div>
      </div>

      <footer className="stop-panel__nav">
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => onStep(-1)} disabled={index === 0}>
          <CaretLeft size={16} weight="bold" aria-hidden="true" />
          Anterior
        </button>
        <button
          type="button"
          className="btn btn--primary btn--sm"
          onClick={() => onStep(1)}
          disabled={index === total - 1}
        >
          Próximo destino
          <CaretRight size={16} weight="bold" aria-hidden="true" />
        </button>
      </footer>

      {viewer && (
        <Lightbox images={viewer.images} startIndex={viewer.index} onClose={() => setViewer(null)} label={stop.name} />
      )}
    </aside>
  );
};

export default StopPanel;
