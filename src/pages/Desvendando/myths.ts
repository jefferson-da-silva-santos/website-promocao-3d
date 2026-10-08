import type { DimensionId } from "../../data/dimensions";

const mapaMitosSangue = "/media/mapa mitos doacao de sangue.jpeg";
const mapaMedosSangue = "/media/mapa medos doacao de sangue.jpeg";
const mapaMitosLeite = "/media/mapa mitos doacao de leite materno.jpeg";
const mapaMitosOrgaos = "/media/mapa mitos doação de tecidos.jpeg";

const pessoaFelizDoandoSangue = "/media/pessoa feliz doando sangue.webp";
const jovem18 = "/media/jovem18.webp";
const senhora = "/media/senhora.webp";
const adolescente = "/media/adolescente.webp";
const jovemTatuada = "/media/jovem-tatuada.webp";
const gordinho = "/media/gordinho.webp";
const medoAgulha = "/media/medo agulha.webp";
const medoDor = "/media/medo dor.webp";
const tontura = "/media/tontura.webp";
const verSangue = "/media/ver-sangue.webp";
const hospitais = "/media/hospitais.webp";
const doencas = "/media/doencas.webp";
const leiteFraco = "/media/leite fraco.webp";
const leiteDoado = "/media/leite doado.webp";
const amamentarOutras = "/media/amamentar outras.webp";
const insuficiente = "/media/insulficiente.webp";
const pegarPeito = "/media/pegar peito.webp";
const seiosCaem = "/media/seios caem.webp";
const imagemTecidos1 = "/media/imagemTecidos-1.webp";
const imagemTecidos2 = "/media/imagemTecidos-2.webp";
const imagemTecidos3 = "/media/imagemTecidos-3.webp";
const imagemTecidos4 = "/media/imagemTecidos-4.webp";
const imagemTecidos5 = "/media/imagemTecidos-5.webp";
const imagemTecidos6 = "/media/imagemTecidos-6.webp";
const imagemTecidos7 = "/media/imagemTecidos-7.webp";
const imagemTecidos8 = "/media/imagemTecidos-8.webp";

export type MythKind = "mito" | "medo";
export type CategoryKey = "sangue-mitos" | "sangue-medos" | "leite-mitos" | "orgaos-mitos";

export interface Myth {
  readonly id: string;
  readonly kind: MythKind;
  /** A frase como as pessoas costumam dizer. */
  readonly statement: string;
  /** Explicação baseada no conteúdo da pesquisa. */
  readonly answer: string;
  readonly image: string;
}

export interface MythCategory {
  readonly key: CategoryKey;
  readonly dim: DimensionId;
  readonly label: string;
  readonly short: string;
  readonly mapImage: string;
  readonly myths: readonly Myth[];
}

export const MYTH_CATEGORIES: readonly MythCategory[] = [
  {
    key: "sangue-mitos",
    dim: "sangue",
    label: "Mitos da doação de sangue",
    short: "Mitos do sangue",
    mapImage: mapaMitosSangue,
    myths: [
      {
        id: "m1",
        kind: "mito",
        statement: "Doar sangue prejudica a saúde do doador",
        answer:
          "A doação não prejudica a saúde de quem doa. Apenas cerca de 10% do sangue é retirado e o corpo o repõe rapidamente. O processo é seguro, feito com materiais descartáveis, e a triagem garante que o doador está saudável. A prática ainda oferece acompanhamento da própria saúde.",
        image: pessoaFelizDoandoSangue,
      },
      {
        id: "m2",
        kind: "mito",
        statement: "Apenas maiores de 18 anos podem doar",
        answer:
          "No Brasil, pode doar quem tem entre 16 e 69 anos, desde que atenda a critérios de saúde e ao peso mínimo de 50 kg. Menores de idade, com 16 e 17 anos, precisam da autorização dos responsáveis legais.",
        image: jovem18,
      },
      {
        id: "m3",
        kind: "mito",
        statement: "Quem teve dengue não pode doar",
        answer:
          "Quem teve dengue pode doar após a recuperação. Em casos leves, é preciso esperar 30 dias. Na dengue grave, o prazo pode ser maior, com avaliação médica. A restrição é temporária e protege doador e receptor.",
        image: senhora,
      },
      {
        id: "m4",
        kind: "mito",
        statement: "Não se pode doar durante a menstruação",
        answer:
          "A menstruação não impede a doação, desde que a mulher esteja saudável, sem anemia e se sentindo bem. Só é melhor evitar em caso de fluxo muito intenso ou sintomas como tontura, fraqueza e cansaço.",
        image: adolescente,
      },
      {
        id: "m5",
        kind: "mito",
        statement: "Quem tem piercing ou tatuagem não pode doar",
        answer:
          "Quem tem tatuagem ou piercing pode doar sangue após 12 meses do último procedimento. Se o piercing estiver na boca ou nos genitais, é preciso removê-lo e aguardar o mesmo período.",
        image: jovemTatuada,
      },
      {
        id: "m6",
        kind: "mito",
        statement: "Doar sangue engorda",
        answer:
          "A doação não interfere no metabolismo nem no ganho de peso. O corpo trabalha para repor o sangue doado, o que pode dar uma leve sensação de fome, sem alterar o metabolismo de forma significativa.",
        image: gordinho,
      },
    ],
  },
  {
    key: "sangue-medos",
    dim: "sangue",
    label: "Medos da doação de sangue",
    short: "Medos do sangue",
    mapImage: mapaMedosSangue,
    myths: [
      {
        id: "m7",
        kind: "medo",
        statement: "Tenho medo de agulha",
        answer:
          "A fobia de agulhas é um dos principais motivos que afastam doadores. As agulhas usadas são específicas e seguras e causam apenas um leve incômodo. Técnicas de relaxamento e apoio emocional ajudam a superar esse receio.",
        image: medoAgulha,
      },
      {
        id: "m8",
        kind: "medo",
        statement: "Vai doer muito",
        answer:
          "A picada é rápida, parecida com um pequeno beliscão, e o desconforto dura poucos segundos. A equipe é preparada para garantir conforto, e a maioria dos doadores relata tranquilidade após a coleta.",
        image: medoDor,
      },
      {
        id: "m9",
        kind: "medo",
        statement: "Vou sentir tontura e náusea",
        answer:
          "Esses sintomas são raros e costumam estar ligados à falta de hidratação ou ao jejum. Alimente-se bem, beba bastante líquido antes de doar e descanse depois do procedimento.",
        image: tontura,
      },
      {
        id: "m10",
        kind: "medo",
        statement: "Não consigo ver sangue",
        answer:
          "Não é preciso olhar a coleta. A equipe pode conversar ou colocar música para distrair o doador. Focar em pensamentos positivos também ajuda a lidar com esse medo.",
        image: verSangue,
      },
      {
        id: "m11",
        kind: "medo",
        statement: "Hospitais me deixam desconfortável",
        answer:
          "Os centros de coleta são diferentes de enfermarias: são locais acolhedores e organizados para transmitir segurança. Conhecer o espaço antes e ser bem recebido pela equipe reduz a ansiedade.",
        image: hospitais,
      },
      {
        id: "m12",
        kind: "medo",
        statement: "Posso pegar uma doença ao doar",
        answer:
          "Todo o material usado é esterilizado e descartável. Os protocolos seguem padrões rigorosos de saúde e não há risco de contaminação para quem doa.",
        image: doencas,
      },
    ],
  },
  {
    key: "leite-mitos",
    dim: "leite",
    label: "Mitos da doação de leite materno",
    short: "Mitos do leite",
    mapImage: mapaMitosLeite,
    myths: [
      {
        id: "m13",
        kind: "mito",
        statement: "Meu leite é fraco",
        answer:
          "O leite materno tem todos os nutrientes de que o bebê precisa, mesmo quando parece mais ralo. Sua composição reúne proteínas, gorduras, vitaminas e anticorpos essenciais.",
        image: leiteFraco,
      },
      {
        id: "m14",
        kind: "mito",
        statement: "Só vale a pena doar grandes quantidades",
        answer:
          "Qualquer quantidade importa: até 1 ml pode salvar a vida de um recém-nascido prematuro. Os Bancos de Leite Humano aceitam pequenas doações.",
        image: leiteDoado,
      },
      {
        id: "m15",
        kind: "mito",
        statement: "Mães podem amamentar outras crianças",
        answer:
          "A amamentação cruzada, sem o controle dos Bancos de Leite, pode transmitir doenças. A doação segura passa pelos Bancos de Leite Humano, que pasteurizam e distribuem o leite aos bebês que mais precisam.",
        image: amamentarOutras,
      },
      {
        id: "m16",
        kind: "mito",
        statement: "Meu leite é insuficiente",
        answer:
          "A produção é estimulada pela sucção do bebê e pela regularidade das mamadas. Na maioria dos casos, a sensação de pouco leite é equivocada, e a orientação certa ajuda a manter a produção.",
        image: insuficiente,
      },
      {
        id: "m17",
        kind: "mito",
        statement: "O bebê não quis pegar o peito",
        answer:
          "A recusa temporária pode acontecer por mudanças na rotina, estresse ou confusão de bicos. Ajustes no ambiente e orientação adequada ajudam a continuar a amamentação.",
        image: pegarPeito,
      },
      {
        id: "m18",
        kind: "mito",
        statement: "Os seios caem com a amamentação",
        answer:
          "A flacidez vem da genética, do envelhecimento e de variações de peso, não da amamentação. Amamentar ainda reduz o risco de câncer de mama e de ovário.",
        image: seiosCaem,
      },
    ],
  },
  {
    key: "orgaos-mitos",
    dim: "orgaos",
    label: "Mitos da doação de órgãos e tecidos",
    short: "Mitos dos órgãos",
    mapImage: mapaMitosOrgaos,
    myths: [
      {
        id: "m19",
        kind: "mito",
        statement: "Órgãos podem ser vendidos após a morte de um familiar",
        answer:
          "O processo de doação é regulamentado por lei e fiscalizado por autoridades de saúde, com segurança e ética.",
        image: imagemTecidos1,
      },
      {
        id: "m20",
        kind: "mito",
        statement: "Idosos não podem doar",
        answer: "A idade não impede a doação. O que importa é a condição de saúde do órgão no momento da doação.",
        image: imagemTecidos2,
      },
      {
        id: "m21",
        kind: "mito",
        statement: "Morte encefálica e coma são a mesma coisa",
        answer:
          "A morte encefálica é irreversível. O coma é um estado em que há possibilidade de recuperação, segundo critérios médicos.",
        image: imagemTecidos3,
      },
      {
        id: "m22",
        kind: "mito",
        statement: "A família paga pela doação",
        answer:
          "Todos os procedimentos de doação e transplante são gratuitos e custeados pelo sistema público de saúde.",
        image: imagemTecidos4,
      },
      {
        id: "m23",
        kind: "mito",
        statement: "Existe preferência na fila de espera",
        answer: "A fila é única e segue critérios técnicos de compatibilidade e urgência, sem privilégio pessoal.",
        image: imagemTecidos5,
      },
      {
        id: "m24",
        kind: "mito",
        statement: "A doação desfigura o corpo",
        answer: "Os procedimentos respeitam o corpo e preservam sua aparência, garantindo dignidade à família.",
        image: imagemTecidos6,
      },
      {
        id: "m25",
        kind: "mito",
        statement: "Internado, posso ser deixado morrer para que haja doação",
        answer:
          "A prioridade de médicos e hospitais é salvar vidas. A doação só é considerada após o diagnóstico de morte encefálica.",
        image: imagemTecidos7,
      },
      {
        id: "m26",
        kind: "mito",
        statement: "Quem tem histórico de doenças não pode doar",
        answer:
          "Cada caso é avaliado individualmente, e algumas doenças não impedem a doação, dependendo da saúde do órgão.",
        image: imagemTecidos8,
      },
    ],
  },
];
