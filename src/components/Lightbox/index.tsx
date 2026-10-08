import { useCallback, useEffect, useRef, useState } from "react";
import type { FC, PointerEvent } from "react";
import { createPortal } from "react-dom";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { useBodyLock, useKeyboard } from "../../hooks/useUiEffects";

export interface LightboxImage {
  readonly src: string;
  readonly alt: string;
  readonly caption?: string;
}

interface LightboxProps {
  readonly images: readonly LightboxImage[];
  readonly startIndex?: number;
  readonly onClose: () => void;
  readonly label?: string;
}

/**
 * Visualizador de imagens em tela cheia com teclado (setas, Esc), gesto de arraste
 * e miniaturas. Renderizado em portal para escapar de qualquer `overflow` do pai.
 */
const Lightbox: FC<LightboxProps> = ({ images, startIndex = 0, onClose, label = "Visualizar imagem" }) => {
  const [index, setIndex] = useState(startIndex);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const dragStart = useRef<number | null>(null);
  const total = images.length;
  const current = images[index];

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useBodyLock(true);
  useKeyboard({ Escape: onClose, ArrowLeft: prev, ArrowRight: next });

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previouslyFocused?.focus();
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null || total < 2) return;
    const delta = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(delta) > 48) (delta > 0 ? prev : next)();
  };

  if (!current) return null;

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
      <div
        className="lightbox__stage"
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <img key={current.src} src={current.src} alt={current.alt} className="lightbox__img" draggable={false} />
        {(current.caption || total > 1) && (
          <p className="lightbox__caption">
            <span>{current.caption ?? current.alt}</span>
            {total > 1 && (
              <span className="lightbox__count">
                {index + 1} de {total}
              </span>
            )}
          </p>
        )}
      </div>

      <button ref={closeRef} type="button" className="lightbox__close icon-btn" onClick={onClose} aria-label="Fechar">
        <X size={22} aria-hidden="true" />
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            className="lightbox__arrow lightbox__arrow--prev icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Imagem anterior"
          >
            <CaretLeft size={22} weight="bold" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="lightbox__arrow lightbox__arrow--next icon-btn"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Próxima imagem"
          >
            <CaretRight size={22} weight="bold" aria-hidden="true" />
          </button>
          <ul className="lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
            {images.map((img, i) => (
              <li key={img.src}>
                <button
                  type="button"
                  className={i === index ? "is-active" : undefined}
                  aria-current={i === index}
                  aria-label={`Ver imagem ${i + 1}`}
                  onClick={() => setIndex(i)}
                >
                  <img src={img.src} alt="" loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>,
    document.body,
  );
};

export default Lightbox;
