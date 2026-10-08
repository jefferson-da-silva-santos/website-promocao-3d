/**
 * As três dimensões da Promoção 3D. Cada uma herda uma cor da logo
 * (vermelho, verde e amarelo) e esse vínculo é usado como código visual em todo o site.
 */

export type DimensionId = "sangue" | "orgaos" | "leite";

export interface Dimension {
  readonly id: DimensionId;
  readonly short: string;
  readonly label: string;
  readonly fact: string;
}

export const DIMENSIONS: readonly Dimension[] = [
  {
    id: "sangue",
    short: "Sangue",
    label: "Sangue e transfusão",
    fact: "A doação de sangue é rápida, segura e pode salvar até quatro vidas.",
  },
  {
    id: "orgaos",
    short: "Órgãos",
    label: "Órgãos e tecidos",
    fact: "A doação de órgãos salva vidas e requer autorização e compatibilidade pelo SUS.",
  },
  {
    id: "leite",
    short: "Leite",
    label: "Leite humano",
    fact: "A doação de leite materno nutre bebês prematuros e pode salvar vidas.",
  },
];
