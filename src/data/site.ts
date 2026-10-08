/**
 * Dados institucionais compartilhados por todo o site.
 * Qualquer link externo ou texto repetido nasce aqui, nunca espalhado pelos componentes.
 */

export const SITE = {
  name: "Promoção 3D",
  tagline: "Política pública de conscientização e incentivo à doação de sangue, órgãos, tecidos e leite humano.",
  chatbotUrl: "https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d",
  developerUrl: "https://jeffersonsantos.dev",
  /** E-mail que recebe o formulário de contato. Vazio = formulário avisa que o envio está indisponível. */
  contactEmail: "",
} as {
  readonly name: string;
  readonly tagline: string;
  readonly chatbotUrl: string;
  readonly developerUrl: string;
  readonly contactEmail: string;
};

export interface NavItem {
  readonly label: string;
  /** Âncora na home (`#id`) ou rota interna (`/rota`). */
  readonly href: string;
}

/** Navegação principal. Âncoras rolam na home; rotas trocam de página. */
export const PRIMARY_NAV: readonly NavItem[] = [
  { label: "A política", href: "#sobre" },
  { label: "Mitos e medos", href: "#desvendando" },
  { label: "Vídeos", href: "#trilha" },
  { label: "Jogos", href: "#jogo-da-vida" },
  { label: "Expedição", href: "/expedicao" },
  { label: "Blog", href: "/blog" },
];

export const SECONDARY_NAV: readonly NavItem[] = [
  { label: "Saiba mais", href: "/saiba-mais" },
  { label: "Agente IA", href: "/agente" },
  { label: "App Memória e Vida", href: "/app" },
  { label: "Contato", href: "#contato" },
];

export interface LegalMilestone {
  readonly code: string;
  readonly scope: "Estadual" | "Federal" | "Municipal";
  readonly title: string;
  readonly author: string;
  readonly summary: string;
}

/** Marcos legais citados no conteúdo original do site. */
export const LEGAL_MILESTONES: readonly LegalMilestone[] = [
  {
    code: "Lei nº 18.359/2023",
    scope: "Estadual",
    title: "Promoção 3D em Pernambuco",
    author: "Dep. Estadual Henrique Queiroz Filho (PL nº 582)",
    summary: "Sancionada em 27 de outubro de 2023, transforma a pesquisa da UPE em política pública estadual.",
  },
  {
    code: "PL 5.233/2023",
    scope: "Federal",
    title: "Política Pública Nacional",
    author: "Dep. Federal Eduardo da Fonte",
    summary: "Propõe a Promoção 3D como política de abrangência em todo o território brasileiro.",
  },
  {
    code: "PL 110/2024",
    scope: "Federal",
    title: "Programa Nacional de Ensino",
    author: "Dep. Federal Eduardo da Fonte",
    summary: "Institui o ensino da Promoção 3D no currículo escolar e acadêmico brasileiro.",
  },
];

export interface Researcher {
  readonly initials: string;
  readonly name: string;
  readonly role: string;
}

export const RESEARCHERS: readonly Researcher[] = [
  { initials: "MF", name: "PhD Múcio Luiz Banja Fernandez", role: "Orientador · UPE Campus Mata Norte" },
  { initials: "EP", name: "Eliabi Pereira da Silva", role: "Doutorando em Educação · UPE" },
];

export interface SocialLink {
  readonly label: "Instagram" | "WhatsApp" | "YouTube";
  /** Vazio enquanto o perfil oficial não for informado: o link aparece desabilitado. */
  readonly href: string;
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { label: "Instagram", href: "" },
  { label: "WhatsApp", href: "" },
  { label: "YouTube", href: "" },
];
