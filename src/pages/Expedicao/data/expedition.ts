/**
 * Roteiro da pesquisa de campo da Promoção 3D pelas 16 Gerências Regionais de Educação (GRE)
 * de Pernambuco. Fonte: capítulo 4.2 da tese ("Escolas em que foi realizada a pesquisa" e
 * "Visitas às escolas"). Fotos: arquivo pessoal do autor da pesquisa (2026).
 *
 * A ordem segue o relato da pesquisa: início pelo Vale do Capibaribe, depois Zona da Mata,
 * Região Metropolitana, Agreste e Sertão. Para registrar a data exata de cada visita,
 * preencha o campo opcional `date` (formato AAAA-MM-DD).
 */

export type Macro = "litoral" | "agreste" | "sertao";

export type Modality = "EREM" | "EREF" | "ETE" | "EREMQ" | "EREMI" | "EE" | "GRE";

export interface Photo {
  /** Nome do arquivo em `public/expedicao/` (sem extensão). */
  readonly file: string;
  readonly alt: string;
}

export interface Visit {
  readonly name: string;
  readonly municipality: string;
  readonly modality: Modality;
  readonly about?: string;
  readonly photos: readonly Photo[];
}

export interface Stop {
  readonly id: string;
  /** Região do mapa (Recife Norte e Recife Sul compartilham o município do Recife). */
  readonly region: string;
  readonly name: string;
  readonly seat: string;
  readonly macro: Macro;
  readonly decree: string;
  readonly coverage: readonly string[];
  readonly visits: readonly Visit[];
  readonly date?: string;
}

export const MACRO_LABEL: Record<Macro, string> = {
  litoral: "Litoral e Zona da Mata",
  agreste: "Agreste",
  sertao: "Sertão",
};

export const MODALITY_LABEL: Record<Modality, string> = {
  EREM: "Escola de Referência em Ensino Médio",
  EREF: "Escola de Referência em Ensino Fundamental",
  ETE: "Escola Técnica Estadual",
  EREMQ: "Escola de Referência em Ensino Médio Quilombola",
  EREMI: "Escola Indígena",
  EE: "Escola Estadual",
  GRE: "Gerência Regional de Educação",
};

const photo = (file: string, alt: string): Photo => ({ file, alt });
const series = (prefix: string, count: number, alt: string): Photo[] =>
  Array.from({ length: count }, (_, i) => photo(`${prefix}-${i + 1}`, `${alt} (${i + 1} de ${count})`));

const DECREE_2015 = "Decreto nº 42.129, de 15 de setembro de 2015";
const DECREE_2017 = "Decreto nº 44.225, de 15 de março de 2017";

export const STOPS: readonly Stop[] = [
  {
    id: "vale-capibaribe",
    region: "vale-capibaribe",
    name: "GRE Vale do Capibaribe",
    seat: "Limoeiro",
    macro: "agreste",
    decree: DECREE_2015,
    coverage: [
      "Bom Jardim",
      "Casinhas",
      "Cumaru",
      "Feira Nova",
      "Frei Miguelinho",
      "João Alfredo",
      "Lagoa de Itaenga",
      "Limoeiro",
      "Machados",
      "Orobó",
      "Passira",
      "Salgadinho",
      "Santa Maria do Cambucá",
      "Surubim",
      "Vertente do Lério",
      "Vertentes",
    ],
    visits: [
      {
        name: "Escola Técnica Estadual José Humberto de Moura Cavalcanti",
        municipality: "Limoeiro",
        modality: "ETE",
        about:
          "Criada pelo Decreto nº 34.241, de 23 de novembro de 2009. Ponto de partida da expedição, por estar na área de residência do pesquisador.",
        photos: [
          photo("ete-jose-humberto", "Pesquisador em frente à fachada da ETE José Humberto de Moura Cavalcanti"),
          ...series("vale-sala", 10, "Atividade da Promoção 3D com estudantes em sala de aula"),
        ],
      },
      {
        name: "Escola de Referência em Ensino Médio Manoel Guilherme da Silva",
        municipality: "Passira",
        modality: "EREM",
        about: "Tornou-se Escola de Referência em Ensino Médio pelo Decreto nº 37.826, de 31 de janeiro de 2012.",
        photos: [
          photo("erem-manoel-guilherme", "Pesquisador diante do muro com o nome da EREM Manoel Guilherme da Silva"),
        ],
      },
    ],
  },
  {
    id: "mata-norte",
    region: "mata-norte",
    name: "GRE Mata Norte",
    seat: "Nazaré da Mata",
    macro: "litoral",
    decree: DECREE_2015,
    coverage: [
      "Aliança",
      "Buenos Aires",
      "Camutanga",
      "Carpina",
      "Condado",
      "Ferreiros",
      "Goiana",
      "Itambé",
      "Itaquitinga",
      "Lagoa do Carro",
      "Macaparana",
      "Nazaré da Mata",
      "Paudalho",
      "São Vicente Férrer",
      "Timbaúba",
      "Tracunhaém",
      "Vicência",
    ],
    visits: [
      {
        name: "Escola de Referência em Ensino Fundamental Laurindo Gomes",
        municipality: "Buenos Aires",
        modality: "EREF",
        about:
          "Inaugurada em 30 de junho de 1966, no governo de Paulo Pessoa Guerra. O nome homenageia o Major Laurindo Gomes, do Engenho Criméia, pelos serviços prestados ao município.",
        photos: [photo("eref-laurindo-gomes", "Pesquisador em frente à EREF Laurindo Gomes")],
      },
    ],
  },
  {
    id: "mata-centro",
    region: "mata-centro",
    name: "GRE Mata Centro",
    seat: "Vitória de Santo Antão",
    macro: "litoral",
    decree: DECREE_2015,
    coverage: [
      "Barra de Guabiraba",
      "Bezerros",
      "Bonito",
      "Camocim de São Félix",
      "Chã de Alegria",
      "Chã Grande",
      "Escada",
      "Glória do Goitá",
      "Gravatá",
      "Pombos",
      "Sairé",
      "São Joaquim do Monte",
      "Vitória de Santo Antão",
    ],
    visits: [
      {
        name: "Gerência Regional de Educação Mata Centro",
        municipality: "Vitória de Santo Antão",
        modality: "GRE",
        photos: [photo("gre-mata-centro", "Pesquisador na entrada da Gerência Regional de Educação Mata Centro")],
      },
      {
        name: "Escola de Referência em Ensino Médio Senador João Cleofas de Oliveira",
        municipality: "Vitória de Santo Antão",
        modality: "EREM",
        about:
          "Criada em jornada integral pelo Decreto nº 37.824, de 31 de janeiro de 2012. Homenageia o engenheiro e político vitoriense que foi Ministro da Agricultura e presidente do Senado.",
        photos: [photo("erem-joao-cleofas", "Pesquisador diante da EREM Senador João Cleofas de Oliveira")],
      },
    ],
  },
  {
    id: "mata-sul",
    region: "mata-sul",
    name: "GRE Mata Sul",
    seat: "Palmares",
    macro: "litoral",
    decree: DECREE_2015,
    coverage: [
      "Água Preta",
      "Amaraji",
      "Barreiros",
      "Belém de Maria",
      "Catende",
      "Cortês",
      "Gameleira",
      "Jaqueira",
      "Joaquim Nabuco",
      "Lagoa dos Gatos",
      "Maraial",
      "Palmares",
      "Primavera",
      "Quipapá",
      "Ribeirão",
      "Rio Formoso",
      "São Benedito do Sul",
      "São José da Coroa Grande",
      "Sirinhaém",
      "Tamandaré",
      "Xexéu",
    ],
    visits: [
      {
        name: "Escola de Referência em Ensino Médio Doutor Eurico Chaves",
        municipality: "Sirinhaém",
        modality: "EREM",
        about: "Tornou-se Escola de Referência em Ensino Médio pelo Decreto nº 36.120, de 21 de janeiro de 2011.",
        photos: [photo("erem-eurico-chaves", "Pesquisador na entrada da EREM Doutor Eurico Chaves")],
      },
    ],
  },
  {
    id: "metro-norte",
    region: "metro-norte",
    name: "GRE Metropolitana Norte",
    seat: "Recife",
    macro: "litoral",
    decree: DECREE_2015,
    coverage: ["Abreu e Lima", "Araçoiaba", "Igarassu", "Itamaracá", "Itapissuma", "Olinda", "Paulista"],
    visits: [
      {
        name: "Escola de Referência em Ensino Médio Santa Ana",
        municipality: "Olinda",
        modality: "EREM",
        about: "Tornou-se Escola de Referência em Ensino Médio pelo Decreto nº 37.826, de 31 de janeiro de 2012.",
        photos: [photo("erem-santa-ana", "Pesquisador ao lado da placa da EREM Santa Ana")],
      },
    ],
  },
  {
    id: "recife-norte",
    region: "recife",
    name: "GRE Recife Norte",
    seat: "Recife",
    macro: "litoral",
    decree: DECREE_2015,
    coverage: ["Recife (margem esquerda do Capibaribe)", "Fernando de Noronha"],
    visits: [
      {
        name: "Escola de Referência em Ensino Médio Ginásio Pernambucano",
        municipality: "Recife",
        modality: "EREM",
        about:
          "Fundado em 1825 como Liceu Provincial, é referência em educação há quase dois séculos e foi a primeira escola a implantar o ensino integral, em 2004. Por suas bancas passaram Clarice Lispector, Ariano Suassuna, Celso Furtado e Epitácio Pessoa. Abriga o Museu de História Natural Louis Jacques Brunet.",
        photos: [photo("ginasio-pernambucano", "Pesquisador na porta do prédio histórico do Ginásio Pernambucano")],
      },
      {
        name: "EREM Arquipélago de Fernando de Noronha",
        municipality: "Fernando de Noronha",
        modality: "EREM",
        about:
          "Inaugurada em 1972, quando o arquipélago era território federal, é conhecida como Escola Arquipélago. Oferece educação básica, integral, EJA e ensino superior a distância.",
        photos: [],
      },
    ],
  },
  {
    id: "recife-sul",
    region: "recife",
    name: "GRE Recife Sul",
    seat: "Recife",
    macro: "litoral",
    decree: DECREE_2015,
    coverage: ["Recife (margem direita do Capibaribe)"],
    visits: [
      {
        name: "Escola Técnica Estadual Porto Digital",
        municipality: "Recife",
        modality: "ETE",
        about:
          "Criada em 2006 como Centro de Ensino Experimental Porto Digital e transformada em Escola Técnica Estadual em 2017, oferece cursos técnicos de nível médio em jornada integral.",
        photos: [photo("ete-porto-digital", "Pesquisador na entrada da ETE Porto Digital")],
      },
    ],
  },
  {
    id: "metro-sul",
    region: "metro-sul",
    name: "GRE Metropolitana Sul",
    seat: "Recife",
    macro: "litoral",
    decree: DECREE_2015,
    coverage: [
      "Cabo de Santo Agostinho",
      "Camaragibe",
      "Ipojuca",
      "Jaboatão dos Guararapes",
      "Moreno",
      "São Lourenço da Mata",
    ],
    visits: [
      {
        name: "Escola Técnica Estadual Maximiano Accioly Campos",
        municipality: "Jaboatão dos Guararapes",
        modality: "ETE",
        about: "Denominada pela Lei nº 13.988, de 18 de dezembro de 2009.",
        photos: [photo("ete-maximiano-accioly", "Pesquisador diante do letreiro da ETE Maximiano Accioly Campos")],
      },
      {
        name: "Escola de Referência em Ensino Médio Zumbi dos Palmares",
        municipality: "Cabo de Santo Agostinho",
        modality: "EREM",
        about:
          "Leva o nome do líder do Quilombo dos Palmares, maior símbolo de resistência contra a escravidão no Brasil. Sua morte, em 20 de novembro, originou o Dia Nacional da Consciência Negra.",
        photos: [photo("erem-zumbi-dos-palmares", "Pesquisador ao lado do muro com o nome da EREM Zumbi dos Palmares")],
      },
    ],
  },
  {
    id: "agreste-centro-norte",
    region: "agreste-centro-norte",
    name: "GRE Agreste Centro Norte",
    seat: "Caruaru",
    macro: "agreste",
    decree: DECREE_2015,
    coverage: [
      "Agrestina",
      "Altinho",
      "Belo Jardim",
      "Brejo da Madre de Deus",
      "Cachoeirinha",
      "Caruaru",
      "Cupira",
      "Ibirajuba",
      "Jataúba",
      "Panelas",
      "Riacho das Almas",
      "Santa Cruz do Capibaribe",
      "São Caetano",
      "Tacaimbó",
      "Taquaritinga do Norte",
      "Toritama",
    ],
    visits: [
      {
        name: "Escola de Referência em Ensino Médio Dom Miguel de Lima Valverde",
        municipality: "Caruaru",
        modality: "EREM",
        about: "Tornou-se Escola de Referência em Ensino Médio pelo Decreto nº 37.826, de 31 de janeiro de 2012.",
        photos: [photo("erem-dom-miguel", "Pesquisador ao lado do muro da EREM Dom Miguel de Lima Valverde")],
      },
      {
        name: "Escola de Referência em Ensino Médio Padre Zacarias Tavares",
        municipality: "Caruaru",
        modality: "EREM",
        about: "Tornou-se Escola de Referência em Ensino Médio pelo Decreto nº 39.039, de 4 de janeiro de 2013.",
        photos: [photo("erem-padre-zacarias", "Pesquisador diante da placa da EREM Padre Zacarias Tavares")],
      },
    ],
  },
  {
    id: "agreste-meridional",
    region: "agreste-meridional",
    name: "GRE Agreste Meridional",
    seat: "Garanhuns",
    macro: "agreste",
    decree: DECREE_2015,
    coverage: [
      "Águas Belas",
      "Angelim",
      "Bom Conselho",
      "Brejão",
      "Caetés",
      "Calçado",
      "Canhotinho",
      "Capoeiras",
      "Correntes",
      "Garanhuns",
      "Iati",
      "Jucati",
      "Jupi",
      "Jurema",
      "Lagoa do Ouro",
      "Lajedo",
      "Palmeirina",
      "Paranatama",
      "Saloá",
      "São Bento do Una",
      "São João",
      "Terezinha",
    ],
    visits: [
      {
        name: "Escola de Aplicação Professora Ivonita Alves Guerra",
        municipality: "Garanhuns",
        modality: "EE",
        about:
          "Funciona nas dependências da Universidade de Pernambuco e iniciou as atividades em 1995 com pouco mais de 110 alunos.",
        photos: [
          photo(
            "escola-ivonita-guerra",
            "Entrada da Universidade de Pernambuco em Garanhuns, onde funciona a Escola de Aplicação",
          ),
        ],
      },
    ],
  },
  {
    id: "sertao-moxoto-ipanema",
    region: "sertao-moxoto-ipanema",
    name: "GRE Sertão do Moxotó-Ipanema",
    seat: "Arcoverde",
    macro: "sertao",
    decree: DECREE_2015,
    coverage: [
      "Alagoinha",
      "Arcoverde",
      "Betânia",
      "Buíque",
      "Custódia",
      "Ibimirim",
      "Inajá",
      "Itaíba",
      "Manari",
      "Pedra",
      "Pesqueira",
      "Poção",
      "Sanharó",
      "Sertânia",
      "Tupanatinga",
      "Venturosa",
    ],
    visits: [
      {
        name: "Gerência Regional de Educação Sertão do Moxotó-Ipanema",
        municipality: "Arcoverde",
        modality: "GRE",
        photos: [photo("gre-moxoto-ipanema", "Pesquisador em frente à sede da GRE Sertão do Moxotó-Ipanema")],
      },
      {
        name: "EREM Quilombola Vereadora Alzira Tenório do Amaral",
        municipality: "Custódia",
        modality: "EREMQ",
        about:
          "Primeira escola quilombola de referência em tempo integral de Pernambuco, transformada pelo Decreto nº 42.439, de 1º de dezembro de 2015. Fica na Comunidade Quilombola de Buenos Aires, distrito de Quitimbu.",
        photos: series(
          "quilombola-alzira",
          8,
          "Visita à EREM Quilombola Vereadora Alzira Tenório do Amaral e à comunidade de Buenos Aires",
        ),
      },
    ],
  },
  {
    id: "sertao-alto-pajeu",
    region: "sertao-alto-pajeu",
    name: "GRE Sertão do Alto Pajeú",
    seat: "Afogados da Ingazeira",
    macro: "sertao",
    decree: DECREE_2015,
    coverage: [
      "Afogados da Ingazeira",
      "Brejinho",
      "Calumbi",
      "Carnaíba",
      "Flores",
      "Iguaraci",
      "Ingazeira",
      "Itapetim",
      "Quixaba",
      "Santa Cruz da Baixa Verde",
      "Santa Terezinha",
      "São José do Egito",
      "Serra Talhada",
      "Solidão",
      "Tabira",
      "Triunfo",
      "Tuparetama",
    ],
    visits: [
      {
        name: "Escola de Referência em Ensino Médio Pedro Santos Estima",
        municipality: "Flores",
        modality: "EREM",
        about:
          "Transformada em Escola de Referência em Ensino Médio pelo Decreto nº 54.430, de 3 de fevereiro de 2023.",
        photos: [photo("erem-pedro-santos-estima", "Muro com o nome da EREM Pedro Santos Estima")],
      },
    ],
  },
  {
    id: "sertao-central",
    region: "sertao-central",
    name: "GRE Sertão Central",
    seat: "Salgueiro",
    macro: "sertao",
    decree: DECREE_2017,
    coverage: [
      "Cedro",
      "Mirandiba",
      "Parnamirim",
      "Salgueiro",
      "São José do Belmonte",
      "Serrita",
      "Terra Nova",
      "Verdejante",
    ],
    visits: [
      {
        name: "Escola Técnica Estadual Pedro Leão Leal",
        municipality: "São José do Belmonte",
        modality: "ETE",
        about:
          "Criada pelo Decreto nº 41.776, de 27 de maio de 2015, para a oferta de cursos de Educação Profissional Técnica de Nível Médio.",
        photos: [photo("ete-pedro-leao-leal", "Pesquisador diante do letreiro da ETE Pedro Leão Leal")],
      },
    ],
  },
  {
    id: "sertao-araripe",
    region: "sertao-araripe",
    name: "GRE Sertão do Araripe",
    seat: "Araripina",
    macro: "sertao",
    decree: DECREE_2017,
    coverage: [
      "Araripina",
      "Bodocó",
      "Exu",
      "Granito",
      "Ipubi",
      "Moreilândia",
      "Ouricuri",
      "Santa Cruz",
      "Santa Filomena",
      "Trindade",
    ],
    visits: [
      {
        name: "Escola Estadual Dom Idílio José Soares",
        municipality: "Ouricuri",
        modality: "EE",
        photos: [photo("escola-dom-idilio", "Pesquisador em frente à placa da Escola Estadual Dom Idílio José Soares")],
      },
      {
        name: "Escola de Referência em Ensino Médio Fernando Bezerra",
        municipality: "Ouricuri",
        modality: "EREM",
        about: "Criada como Escola de Referência em Ensino Médio pelo Decreto nº 32.961, de 21 de janeiro de 2009.",
        photos: [photo("escola-fernando-bezerra", "Pesquisador ao lado da placa da Escola Estadual Fernando Bezerra")],
      },
    ],
  },
  {
    id: "sertao-medio-sf",
    region: "sertao-medio-sf",
    name: "GRE Sertão do Médio São Francisco",
    seat: "Petrolina",
    macro: "sertao",
    decree: "Sede no Município de Petrolina",
    coverage: ["Afrânio", "Cabrobó", "Dormentes", "Lagoa Grande", "Orocó", "Petrolina", "Santa Maria da Boa Vista"],
    visits: [
      {
        name: "Escola de Referência em Ensino Médio Dom Malan",
        municipality: "Petrolina",
        modality: "EREM",
        about:
          "Homenageia Dom Antônio Maria Malan, primeiro bispo de Petrolina, que idealizou a Catedral do Sagrado Coração de Jesus e impulsionou a educação e a saúde na região.",
        photos: [photo("erem-dom-malan", "Pesquisador diante da placa da EREM Dom Malan")],
      },
      {
        name: "Escola Estadual Indígena Capitão Dena",
        municipality: "Cabrobó",
        modality: "EREMI",
        about:
          "Escola do povo Truká, na Aldeia Sabonete (Área da Retomada). Em 2024 tornou-se a primeira escola indígena do Brasil em regime de educação integral.",
        photos: series("capitao-dena", 10, "Visita à Escola Estadual Indígena Capitão Dena, do povo Truká"),
      },
    ],
  },
  {
    id: "sertao-submedio",
    region: "sertao-submedio",
    name: "GRE Sertão do Submédio São Francisco",
    seat: "Floresta",
    macro: "sertao",
    decree: "Sede no Município de Floresta",
    coverage: [
      "Belém do São Francisco",
      "Carnaubeira da Penha",
      "Floresta",
      "Itacuruba",
      "Jatobá",
      "Petrolândia",
      "Tacaratu",
    ],
    visits: [
      {
        name: "Gerência Regional de Educação Submédio São Francisco",
        municipality: "Floresta",
        modality: "GRE",
        photos: [photo("gre-submedio", "Pesquisador em frente à sede da GRE Submédio São Francisco")],
      },
    ],
  },
];

/** Dados gerais da pesquisa de campo, citados no texto da tese. */
export const RESEARCH_FACTS = {
  teachers: 35,
  students: 45,
  gres: 16,
  municipalities: 19,
} as const;
