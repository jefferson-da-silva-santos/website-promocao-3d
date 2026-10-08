import videoCustodia from "../../assets/video/video-pro.mp4";

export type VideoSource =
  { readonly kind: "youtube"; readonly id: string } | { readonly kind: "file"; readonly src: string };

export interface TrailVideo {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly source: VideoSource;
}

export interface TrailChapter {
  /** Também é a âncora da seção (mantém os links antigos `#audiencia` e `#resultados`). */
  readonly id: "audiencia" | "resultados";
  readonly title: string;
  readonly summary: string;
  readonly videos: readonly TrailVideo[];
}

export const TRAIL: readonly TrailChapter[] = [
  {
    id: "audiencia",
    title: "Audiência pública",
    summary: "O debate público que apresentou a Promoção 3D à sociedade.",
    videos: [
      {
        id: "audiencia-1",
        title: "Audiência pública da Promoção 3D, parte 1",
        description:
          "Abertura da audiência pública que apresentou e debateu a Promoção 3D como política de conscientização e incentivo à doação.",
        source: { kind: "youtube", id: "cgEkDVPqyYU" },
      },
      {
        id: "audiencia-2",
        title: "Audiência pública da Promoção 3D, parte 2",
        description: "Continuação da audiência pública, com as falas e encaminhamentos sobre a política.",
        source: { kind: "youtube", id: "QuJeJ8jG4Jo" },
      },
    ],
  },
  {
    id: "resultados",
    title: "Promoção 3D na mídia",
    summary: "A política chegando ao Congresso Nacional e às câmaras municipais.",
    videos: [
      {
        id: "pl-110-2024",
        title: "PL 110/2024 no Congresso Nacional",
        description:
          "O Deputado Federal Eduardo da Fonte apresenta o PL 110/2024, que institui o Programa de Ensino e Conscientização sobre Doação de Sangue, Órgãos e Tecidos e Leite Materno no currículo escolar e acadêmico brasileiro.",
        source: { kind: "youtube", id: "iZwb0yh2klk" },
      },
      {
        id: "custodia-pl-004-2024",
        title: "Projeto de Lei 004/2024 em Custódia",
        description:
          "O vereador Dr. Cristiano Teixeira Dantas apresenta, em sessão, o Projeto de Lei 004/2024, que institui a Promoção 3D no Município de Custódia.",
        source: { kind: "file", src: videoCustodia },
      },
    ],
  },
];
