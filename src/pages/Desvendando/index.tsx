import { useState } from "react";
import logo from "../../assets/image/logo.png";

// Importação das 4 imagens de mapa
import mapaMitosSangue from "../../assets/image/mapa mitos doacao de sangue.jpeg";
import mapaMedosSangue from "../../assets/image/mapa medos doacao de sangue.jpeg";
import mapaMitosLeite from "../../assets/image/mapa mitos doacao de leite materno.jpeg";
import mapaMitosOrgaos from "../../assets/image/mapa mitos doação de tecidos.jpeg";

import useModalDesvendando from "../../hooks/useModalDesvendando";

// ─── Dados dos mitos/medos ────────────────────────────────────────────────────

const ARR_OPTION = [
  { id: "m1",  title: "Prejudica a saúde do doador",                    text: "Mito, pois a doação de sangue não prejudica a saúde do doador. Apenas cerca de 10% do sangue é retirado, e o corpo o repõe rapidamente. O processo é seguro, realizado com materiais descartáveis, e a triagem garante que o doador está saudável. Além disso, a prática oferece monitoramento de saúde e não traz.", src: "../../assets/image/pessoa feliz doando sangue.webp" },
  { id: "m2",  title: "Apenas maiores de 18 podem doar",                text: "Mito, pois no Brasil, a doação de sangue é permitida para pessoas entre 16 e 69 anos, desde que atendam a alguns critérios de saúde e peso mínimo (50 kg). No caso de menores de idade (16 e 17 anos), é necessário ter autorização dos responsáveis legais.", src: "../../assets/image/jovem18.webp" },
  { id: "m3",  title: "Quem teve dengue não pode doar",                 text: "Mito, pois quem teve dengue pode doar sangue após a recuperação. Em casos leves, é preciso esperar 30 dias. Para dengue grave, o prazo pode ser maior, com avaliação médica. A restrição é temporária e visa garantir a segurança do doador e do receptor.", src: "../../assets/image/senhora.webp" },
  { id: "m4",  title: "Não pode doar durante o período menstrual",      text: "É mito que mulheres não podem doar sangue durante a menstruação. Esse período não é um impedimento, desde que a mulher esteja saudável, sem anemia e se sentindo bem. Só deve evitar doar se houver fluxo muito intenso ou sintomas como tontura, fraqueza e cansaço.", src: "../../assets/image/adolescente.webp" },
  { id: "m5",  title: "Quem tem piercing e tatuagens não pode doar",    text: "Mito, pois quem tem tatuagens ou piercings podem sim doar sangue. A doação é permitida após um prazo de 12 meses da última tatuagem ou piercing. Se o piercing estiver em locais como boca ou genitais, é preciso removê-lo e aguardar o mesmo período.", src: "../../assets/image/jovem-tatuada.webp" },
  { id: "m6",  title: "Doar sangue engorda",                            text: "Mito, pois doar sangue não engorda. A doação de sangue não interfere no metabolismo nem no ganho de peso. O corpo trabalha apenas para repor o sangue doado, o que pode gerar uma leve sensação de fome, mas isso não altera o metabolismo de forma significativa.", src: "../../assets/image/gordinho.webp" },
  { id: "m7",  title: "Medo de agulhas",                               text: "A fobia de agulhas é um dos principais motivos que afastam doadores. Esse medo pode surgir de experiências traumáticas ou associadas à dor. É importante reforçar que as agulhas utilizadas são específicas e seguras, causando apenas um leve incômodo. Técnicas de relaxamento e apoio emocional podem ajudar a superar esse receio.", src: "../../assets/image/medo agulha.webp" },
  { id: "m8",  title: "Medo de dor",                                    text: "Muitas pessoas acreditam que a doação de sangue será extremamente dolorosa, o que não é verdade. A picada da agulha é rápida e comparável a um pequeno beliscão. O desconforto geralmente dura poucos segundos, e a equipe médica está preparada para garantir o máximo de conforto. Após a coleta, a maioria dos doadores relata sensação tranquila.", src: "../../assets/image/medo dor.webp" },
  { id: "m9",  title: "Medo de tontura e náuseas",                      text: "Alguns doadores temem se sentir mal após a doação, como tonturas ou náuseas. Esses sintomas são raros e, quando ocorrem, geralmente estão relacionados à falta de hidratação ou jejum. Para evitar desconforto, é importante se alimentar bem e beber bastante líquido antes da doação. O descanso após o procedimento também ajuda a prevenir esses efeitos.", src: "../../assets/image/tontura.webp" },
  { id: "m10", title: "Medo de ver sangue",                             text: "Ver o próprio sangue pode causar ansiedade e até mal-estar em algumas pessoas. No entanto, durante a doação, não é necessário observar o processo, e a equipe pode distrair o doador com conversa ou música. Evitar focar na coleta e concentrar-se em pensamentos positivos são estratégias que ajudam a lidar com esse medo.", src: "../../assets/image/ver-sangue.webp" },
  { id: "m11", title: "Medo de centros e hospitais",                    text: "Ambientes hospitalares podem despertar desconforto em alguns indivíduos devido a associações negativas com doenças. Os centros de coleta de sangue são diferentes, sendo locais acolhedores e organizados para transmitir segurança. Conhecer o espaço previamente e ser bem recepcionado pela equipe ajuda a reduzir essa ansiedade.", src: "../../assets/image/hospitais.webp" },
  { id: "m12", title: "Medo de pegar doença",                           text: "Um dos mitos mais prejudiciais é o de que é possível contrair doenças ao doar sangue. No entanto, todo o material utilizado é esterilizado e descartável, garantindo total segurança. Os protocolos seguem rigorosos padrões de saúde, e não há nenhum risco de contaminação. Esclarecer essa questão é essencial para tranquilizar os doadores.", src: "../../assets/image/doencas.webp" },
  { id: "m13", title: "Leite é fraco",                                  text: "Mito, pois o leite materno tem todos os nutrientes necessários para o desenvolvimento do bebê, independentemente de sua aparência mais rala. Sua composição é equilibrada, contendo proteínas, gorduras, vitaminas e anticorpos essenciais para a saúde da criança.", src: "../../assets/image/leite fraco.webp" },
  { id: "m14", title: "Só podem doar grandes quantidades",              text: "Mito, pois qualquer quantidade de leite doado é importante, até mesmo 1 ml pode salvar a vida de um recém-nascido prematuro. Os Bancos de Leite Humano aceitam doações pequenas, valorizando cada contribuição para ajudar bebês em estado crítico.", src: "../../assets/image/leite doado.webp" },
  { id: "m15", title: "Mães podem amamentar outras crianças",           text: "Mito, pois a amamentação cruzada (sem controle dos Bancos de Leite) pode transmitir doenças. A doação segura é feita por meio dos Bancos de Leite Humano, onde o leite é pasteurizado e distribuído de forma controlada para os bebês que mais precisam.", src: "../../assets/image/amamentar outras.webp" },
  { id: "m16", title: "Leite insuficiente",                             text: 'Mito, pois a produção de leite é estimulada pela sucção do bebê e pela regularidade das mamadas. Na maioria dos casos, a percepção de "leite insuficiente" é equivocada, e o apoio correto pode ajudar a manter a produção adequada.', src: "../../assets/image/insulficiente.webp" },
  { id: "m17", title: "O bebê não quis pegar o peito",                 text: "Mito, pois a recusa temporária do peito pode ocorrer por diversos fatores, como mudanças na rotina, estresse ou confusão de bicos. Ajustes no ambiente e orientação adequada ajudam a superar essas dificuldades, garantindo a continuidade da amamentação.", src: "../../assets/image/pegar peito.webp" },
  { id: "m18", title: "Seios caem com a lactação",                      text: "Mito, pois o que provoca a flacidez dos seios é a genética, o envelhecimento e fatores como o ganho de peso, não a amamentação. Pelo contrário, o ato de amamentar traz benefícios à saúde da mulher, reduzindo o risco de câncer de mama e ovário.", src: "../../assets/image/seios caem.webp" },
  { id: "m19", title: "Órgãos podem ser vendidos após a morte do meu familiar", text: "Mito, pois o processo de doação é rigorosamente regulamentado por lei e fiscalizado por autoridades de saúde, garantindo segurança e ética.", src: "../../assets/image/imagemTecidos-1.webp" },
  { id: "m20", title: "Idosos não podem doar",                          text: "Mito, pois a idade não é fator impeditivo para a doação; o que importa é a condição de saúde do órgão no momento da doação.", src: "../../assets/image/imagemTecidos-2.webp" },
  { id: "m21", title: "Confundir morte encefálica com o estado de coma", text: "Mito, pois morte encefálica é irreversível, enquanto o coma é um estado em que há possibilidade de recuperação, conforme critérios médicos.", src: "../../assets/image/imagemTecidos-3.webp" },
  { id: "m22", title: "É necessário custo para doação",                 text: "Mito, pois todos os procedimentos relacionados à doação e ao transplante são gratuitos e custeados pelo sistema público de saúde.", src: "../../assets/image/imagemTecidos-4.webp" },
  { id: "m23", title: "Preferência na fila de espera",                  text: "Mito, pois a fila é única e regulamentada por critérios técnicos de compatibilidade e urgência, sem qualquer privilégio pessoal.", src: "../../assets/image/imagemTecidos-5.webp" },
  { id: "m24", title: "Doação desfigura o corpo",                       text: "Mito, pois os procedimentos são realizados com respeito ao corpo, preservando sua aparência, garantindo dignidade e respeito à família.", src: "../../assets/image/imagemTecidos-6.webp" },
  { id: "m25", title: "Se estiver internado posso correr risco de morrer para que ocorra a doação de órgãos", text: "Mito, pois a prioridade de médicos e hospitais é salvar vidas, e a doação só é considerada após o diagnóstico de morte encefálica.", src: "../../assets/image/imagemTecidos-7.webp" },
  { id: "m26", title: "Pessoas com histórico de doenças não podem fazer doação", text: "Mito, pois cada caso é avaliado individualmente, e algumas doenças não impedem a doação, dependendo da saúde do órgão.", src: "../../assets/image/imagemTecidos-8.webp" },
];

// ─── Configuração das categorias (igual ao script.js original) ───────────────
// buttonIds: id do ARR_OPTION que cada botão do mapa (1..8) deve acionar.
// "" significa que o botão fica oculto nessa categoria.
// visibleBtns: quais índices (0-based) ficam visíveis.

type CategoryKey = "sangue-mitos" | "sangue-medos" | "leite-mitos" | "orgaos-mitos";

interface Category {
  key: CategoryKey;
  label: string;
  btnClass: string;       // classe CSS do botão de filtro
  mapSrc: string;         // imagem do mapa
  buttonIds: string[];    // ids dos 8 botões do mapa (vazio = oculto)
}

const CATEGORIES: Category[] = [
  {
    key: "sangue-mitos",
    label: "Mitos Doação de Sangue",
    btnClass: "btn-01",
    mapSrc: mapaMitosSangue,
    buttonIds: ["m1", "m2", "m3", "m4", "m5", "m6", "", ""],
  },
  {
    key: "sangue-medos",
    label: "Medos Doação de Sangue",
    btnClass: "btn-02",
    mapSrc: mapaMedosSangue,
    buttonIds: ["m7", "m8", "m9", "m10", "m11", "m12", "", ""],
  },
  {
    key: "leite-mitos",
    label: "Mitos Doação de Leite Materno",
    btnClass: "btn-03",
    mapSrc: mapaMitosLeite,
    buttonIds: ["m13", "m14", "m15", "m16", "m17", "m18", "", ""],
  },
  {
    key: "orgaos-mitos",
    label: "Mitos Doação de Órgãos e Tecidos",
    btnClass: "btn-04",
    mapSrc: mapaMitosOrgaos,
    // btn-mapa-7 e btn-mapa-8 ficam visíveis apenas nessa categoria (igual ao JS original)
    buttonIds: ["m19", "m20", "m22", "m23", "m24", "m26", "m25", "m21"],
  },
];

// Posições CSS de cada btn-mapa-N (índice 0 = btn-mapa-1)
const BTN_POSITIONS: React.CSSProperties[] = [
  { top: "0%",    left: "50%",  transform: "translateX(-50%)" },
  { top: "15%",   right: "6%"  },
  { bottom: "13.5%", right: "9%"  },
  { bottom: "0%", left: "38%"  },
  { bottom: "16%", left: "9%"  },
  { top: "20%",   left: "7%"   },
  { top: "42%",   left: "5%"   },   // btn-mapa-7 (oculto por padrão)
  { top: "50%",   right: "4%"  },   // btn-mapa-8 (oculto por padrão)
];

// ─── Componente ───────────────────────────────────────────────────────────────

const Desvendando = () => {
  const [activeKey, setActiveKey] = useState<CategoryKey>("sangue-mitos");
  const { setShowOption, setTitleModal, setTextModal, setImgModal } =
    useModalDesvendando();

  const currentCategory = CATEGORIES.find((c) => c.key === activeKey)!;

  const handleOptionClick = (optionId: string) => {
    if (!optionId) return;
    const found = ARR_OPTION.find((o) => o.id === optionId);
    if (found) {
      setTitleModal(found.title);
      setTextModal(found.text);
      setImgModal(found.src);
      setShowOption(true);
    }
  };

  return (
    <div className="desvendando" id="desvendando">
      <section className="desvendando__content">

        {/* ── Cabeçalho ── */}
        <div className="desvendando__content__section desvendando__content__section--primary">
          <div className="group-sup-img">
            <img src={logo} alt="" />
            <span className="desvendando__content__section--primary__suptitle">
              Desvendando
            </span>
          </div>
          <h2 className="desvendando__content__section--primary__title">
            Mitos e medos que envolvem a promoção 3D
          </h2>
        </div>

        {/* ── Mapa + botões de categoria ── */}
        <div className="desvendando__content__section desvendando__content__section--secundary">

          {/* Mapa — imagem troca conforme categoria ativa */}
          <div className="group-image">
            <img
              src={currentCategory.mapSrc}
              alt="Mapa de mitos e medos"
              className="img-mapa"
            />

            {/* 8 botões flutuantes do mapa */}
            {BTN_POSITIONS.map((style, idx) => {
              const optionId = currentCategory.buttonIds[idx] ?? "";
              const isVisible = optionId !== "";

              return (
                <button
                  key={idx}
                  className={`btn-mapa btn-mapa-${idx + 1} ${optionId}`}
                  style={{ ...style, display: isVisible ? "inline-block" : "none" }}
                  onClick={() => handleOptionClick(optionId)}
                />
              );
            })}
          </div>

          {/* Botões de filtro de categoria */}
          <div className="group-buttons">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={`group-buttons__btn ${cat.btnClass}${activeKey === cat.key ? " active" : ""}`}
                onClick={() => setActiveKey(cat.key)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
};

export default Desvendando;
