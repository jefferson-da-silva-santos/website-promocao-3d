import type { FC } from "react";

interface BrandMarkProps {
  readonly size?: number;
  readonly className?: string;
  /** Quando `true`, o símbolo é lido por leitores de tela como a marca. */
  readonly labelled?: boolean;
}

/**
 * Símbolo da Promoção 3D: os três círculos da logo oficial, redesenhados em vetor
 * nas cores oficiais (vermelho, verde e amarelo). Cada círculo é uma dimensão da doação.
 */
const BrandMark: FC<BrandMarkProps> = ({ size = 32, className, labelled = false }) => (
  <svg
    className={["brand-mark", className].filter(Boolean).join(" ")}
    width={size}
    height={size}
    viewBox="0 0 425 442"
    role={labelled ? "img" : undefined}
    aria-label={labelled ? "Promoção 3D" : undefined}
    aria-hidden={labelled ? undefined : true}
    focusable="false"
  >
    <circle className="brand-mark__dot brand-mark__dot--sangue" cx="110" cy="115" r="96" />
    <circle className="brand-mark__dot brand-mark__dot--orgaos" cx="312" cy="219" r="96" />
    <circle className="brand-mark__dot brand-mark__dot--leite" cx="110" cy="330" r="96" />
  </svg>
);

export default BrandMark;
