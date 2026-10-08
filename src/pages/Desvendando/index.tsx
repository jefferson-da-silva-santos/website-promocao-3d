import { useEffect, useId, useRef, useState } from "react";
import type { FC, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ArrowsOut, CaretLeft, CaretRight, Lightbulb, SealCheck, X } from "@phosphor-icons/react";
import Lightbox from "../../components/Lightbox";
import { MYTH_CATEGORIES } from "./myths";
import type { CategoryKey, Myth, MythCategory } from "./myths";
import { useBodyLock, useKeyboard } from "../../hooks/useUiEffects";

// ─── Painel lateral de detalhe ───────────────────────────────────────────────

interface MythSheetProps {
  readonly category: MythCategory;
  readonly index: number;
  readonly onIndexChange: (index: number) => void;
  readonly onClose: () => void;
}

/** Slide-over com veredito, explicação e navegação entre os itens do mesmo tema. */
const MythSheet: FC<MythSheetProps> = ({ category, index, onIndexChange, onClose }) => {
  const myth = category.myths[index];
  const total = category.myths.length;
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const [visible, setVisible] = useState(false);

  const go = (delta: number) => onIndexChange((index + delta + total) % total);

  useBodyLock(true);
  useKeyboard({ Escape: onClose, ArrowRight: () => go(1), ArrowLeft: () => go(-1) });

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    closeRef.current?.focus();
    return () => cancelAnimationFrame(frame);
  }, []);

  const isFear = myth.kind === "medo";

  return createPortal(
    <div className={`sheet${visible ? " is-visible" : ""}`} role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="sheet__scrim" aria-label="Fechar" tabIndex={-1} onClick={onClose} />
      <article className={`sheet__panel sheet__panel--${category.dim}`}>
        <header className="sheet__top">
          <span className="sheet__crumb">{category.label}</span>
          <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Fechar explicação">
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="sheet__body" key={myth.id}>
          <figure className="sheet__media">
            <img src={myth.image} alt="" />
          </figure>

          <p className={`verdict verdict--${myth.kind}`}>
            {isFear ? (
              <Lightbulb size={18} weight="fill" aria-hidden="true" />
            ) : (
              <SealCheck size={18} weight="fill" aria-hidden="true" />
            )}
            {isFear ? "Medo comum, e como lidar com ele" : "Isso é mito"}
          </p>

          <h3 className="sheet__title" id={titleId}>
            “{myth.statement}”
          </h3>
          <p className="sheet__text">{myth.answer}</p>
        </div>

        <footer className="sheet__nav">
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => go(-1)}>
            <CaretLeft size={16} weight="bold" aria-hidden="true" />
            Anterior
          </button>
          <span className="sheet__count" aria-live="polite">
            {index + 1} de {total}
          </span>
          <button type="button" className="btn btn--ghost btn--sm" onClick={() => go(1)}>
            Próximo
            <CaretRight size={16} weight="bold" aria-hidden="true" />
          </button>
        </footer>
      </article>
    </div>,
    document.body,
  );
};

// ─── Linha de afirmação ──────────────────────────────────────────────────────

interface StatementRowProps {
  readonly myth: Myth;
  readonly order: number;
  readonly onOpen: () => void;
}

const StatementRow: FC<StatementRowProps> = ({ myth, order, onOpen }) => (
  <li className="statement">
    <button type="button" className="statement__btn" onClick={onOpen} aria-haspopup="dialog">
      <span className="statement__num">{String(order).padStart(2, "0")}</span>
      <span className="statement__text">“{myth.statement}”</span>
      <span className={`chip chip--${myth.kind}`}>{myth.kind === "mito" ? "Mito?" : "Medo"}</span>
      <ArrowRight className="statement__arrow" size={18} weight="bold" aria-hidden="true" />
    </button>
  </li>
);

// ─── Seção ───────────────────────────────────────────────────────────────────

/**
 * "Desvendando": o visitante escolhe um tema, lê a frase popular e abre a explicação.
 * Mantém os mapas mentais originais de cada tema, agora ampliáveis.
 */
const Desvendando: FC = () => {
  const [activeKey, setActiveKey] = useState<CategoryKey>("sangue-mitos");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();

  const category = MYTH_CATEGORIES.find((c) => c.key === activeKey) ?? MYTH_CATEGORIES[0];
  const activeTab = MYTH_CATEGORIES.indexOf(category);

  const open = (index: number) => {
    lastTrigger.current = document.activeElement as HTMLElement | null;
    setOpenIndex(index);
  };
  const close = () => {
    setOpenIndex(null);
    requestAnimationFrame(() => lastTrigger.current?.focus());
  };

  /** Navegação por setas entre abas (padrão WAI-ARIA). */
  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const nextIndex = (activeTab + delta + MYTH_CATEGORIES.length) % MYTH_CATEGORIES.length;
    setActiveKey(MYTH_CATEGORIES[nextIndex].key);
    tabsRef.current[nextIndex]?.focus();
  };

  return (
    <section className="section myths" id="desvendando" aria-labelledby="desvendando-title">
      <div className="container">
        <div className="myths__intro" data-aos="fade-up">
          <h2 className="section-title" id="desvendando-title">
            Mitos e medos que <em>afastam doadores.</em>
          </h2>
          <p className="lead">Escolha um tema, leia a frase que circula por aí e descubra o que a ciência explica.</p>
        </div>

        <div className="segmented" role="tablist" aria-label="Temas" data-aos="fade-up" data-aos-delay="60">
          {MYTH_CATEGORIES.map((cat, i) => (
            <button
              key={cat.key}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${cat.key}`}
              aria-selected={cat.key === activeKey}
              aria-controls={`${baseId}-panel`}
              tabIndex={cat.key === activeKey ? 0 : -1}
              className={`segmented__btn segmented__btn--${cat.dim}`}
              onClick={() => setActiveKey(cat.key)}
              onKeyDown={onTabKey}
            >
              <span className="dim-dot" aria-hidden="true" />
              {cat.short}
              <span className="segmented__count">{cat.myths.length}</span>
            </button>
          ))}
        </div>

        <div
          className={`myths__panel myths__panel--${category.dim}`}
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${category.key}`}
          key={category.key}
        >
          <figure className={`mindmap mindmap--${category.dim}`}>
            <button type="button" className="mindmap__btn" onClick={() => setMapOpen(true)}>
              <img src={category.mapImage} alt={`Mapa mental: ${category.label}`} loading="lazy" />
              <span className="mindmap__zoom">
                <ArrowsOut size={18} weight="bold" aria-hidden="true" />
                Ampliar mapa mental
              </span>
            </button>
            <figcaption>
              <strong>{category.label}</strong>
              <span>Mapa mental produzido na pesquisa da Promoção 3D.</span>
            </figcaption>
          </figure>

          <ol className="statements">
            {category.myths.map((myth, i) => (
              <StatementRow key={myth.id} myth={myth} order={i + 1} onOpen={() => open(i)} />
            ))}
          </ol>
        </div>
      </div>

      {openIndex !== null && (
        <MythSheet category={category} index={openIndex} onIndexChange={setOpenIndex} onClose={close} />
      )}
      {mapOpen && (
        <Lightbox
          images={[{ src: category.mapImage, alt: `Mapa mental: ${category.label}`, caption: category.label }]}
          onClose={() => setMapOpen(false)}
          label="Mapa mental ampliado"
        />
      )}
    </section>
  );
};

export default Desvendando;
