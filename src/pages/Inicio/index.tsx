import { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../assets/image/logo.png";
import agenteLogo from "/agente_logo.png";
import iconApp from "/iconApp.png";
import "./hero3d.scss";

/* ────────────────────────────────────────────────────────────
   Conteúdo
   ──────────────────────────────────────────────────────────── */

const CHATBOT_URL =
  "https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d";

const NAV_LINKS = [
  { href: "#hero", label: "Início" },
  { href: "#desvendando", label: "Desvendando" },
  { href: "#informacoes", label: "Informações" },
  { href: "#material", label: "Material" },
  { href: "#jogo-da-vida", label: "Jogo da Vida" },
  { href: "#contato", label: "Contato" },
];

const TOPICS = [
  {
    href: "#desvendando",
    modifier: "sangue",
    kicker: "Sangue",
    icon: "bx-droplet",
    title: "Doação de Sangue",
    text: "6 mitos e 6 medos para estudar",
  },
  {
    href: "#informacoes",
    modifier: "orgaos",
    kicker: "Órgãos",
    icon: "bx-heart",
    title: "Órgãos e Tecidos",
    text: "Como funciona a fila única do SUS",
  },
  {
    href: "#material",
    modifier: "leite",
    kicker: "Leite",
    icon: "bx-donate-heart",
    title: "Leite Materno",
    text: "1 ml pode salvar um prematuro",
  },
];

const STATS = [
  { value: "26", label: "mitos" },
  { value: "6", label: "jogos da vida" },
  { value: "3", label: "projetos de lei" },
];

/* ────────────────────────────────────────────────────────────
   Chat — roteiro de abertura + base de respostas
   ──────────────────────────────────────────────────────────── */

type Role = "bot" | "user";
type Message = { role: Role; text: string };

const INTRO: { text: string; delay: number; typing: number }[] = [
  {
    text: "Olá! Eu sou o assistente oficial da Promoção 3D. 👋",
    delay: 600,
    typing: 900,
  },
  {
    text: "Posso te ajudar com dúvidas sobre doação de sangue, órgãos e leite humano. Pergunte o que quiser.",
    delay: 400,
    typing: 1300,
  },
];

const KB: { keys: string[]; answer: string }[] = [
  {
    keys: [
      "doador de sangue",
      "doar sangue",
      "requisito",
      "quem pode doar",
      "idade",
      "peso",
      "posso doar",
    ],
    answer:
      "Para doar sangue basta ter entre 16 e 69 anos (menores de 18 precisam de autorização), pesar mais de 50 kg e estar em bom estado de saúde. 🩸\nLeve um documento oficial com foto, evite jejum e alimentos gordurosos antes da doação.",
  },
  {
    keys: ["orgao", "órgão", "transplante", "fila", "sus", "familia", "família"],
    answer:
      "Qualquer pessoa pode ser doadora de órgãos! No Brasil não existe documento de doador: o mais importante é comunicar sua decisão à família, porque é ela que autoriza a doação. 💚\nA distribuição é feita por uma fila única do SUS, por critérios técnicos como compatibilidade e gravidade.",
  },
  {
    keys: ["leite", "materno", "prematuro", "banco de leite", "amament"],
    answer:
      "1 ml de leite humano pode alimentar um bebê prematuro. 🍼\nPodem doar mães saudáveis, com leite excedente, que não usem medicamentos incompatíveis com a amamentação. O banco de leite mais próximo orienta sobre coleta e frascos.",
  },
  {
    keys: ["mito", "medo", "preconceito", "verdade", "engorda", "vicia", "dói", "doi"],
    answer:
      'Reunimos 26 mitos e medos sobre as três dimensões da doação — como "doar sangue engorda", "doar vicia" ou "a família perde o corpo". Todos são desmentidos com fonte na seção Desvendando. 🧠',
  },
  {
    keys: ["tatuagem", "tatuei", "piercing"],
    answer:
      "Quem fez tatuagem ou piercing precisa aguardar 6 meses antes de doar sangue, por precaução. Após esse período, e estando saudável, a doação é liberada.",
  },
  {
    keys: ["onde", "hemocentro", "local", "agendar", "horário", "horario"],
    answer:
      "A doação é feita em hemocentros e postos de coleta do SUS. Em Pernambuco, o Hemope é a referência — vale agendar pelo site ou telefone da unidade mais próxima.",
  },
  {
    keys: ["material", "aula", "professor", "escola", "atividade", "plano"],
    answer:
      "Sim! Temos material para aula: cartilha, o Jogo da Vida (6 versões) e roteiros de atividade. Está tudo na seção Material para aula, pronto para baixar. 📚",
  },
  {
    keys: ["lei", "pl", "18.359", "110", "curriculo", "currículo", "projeto"],
    answer:
      "A Promoção 3D é apoiada pela Lei nº 18.359/2023 (PE) e pelo PL 110/2024, que propõe incluir o tema no currículo escolar e acadêmico brasileiro. 3 projetos de lei acompanham a pauta.",
  },
  {
    keys: ["jogo", "jogo da vida", "dinamica", "dinâmica"],
    answer:
      "O Jogo da Vida é uma dinâmica em que a turma vive decisões reais de doação e transplante. Existem 6 versões, para diferentes faixas de idade. 🎲",
  },
  {
    keys: ["app", "aplicativo", "memoria", "memória", "baixar"],
    answer:
      "O app Memória e Vida reúne os conteúdos da Promoção 3D no celular, para estudar offline. O link de download está aqui no topo da página. 📱",
  },
];

const FALLBACK =
  "Ainda não sei responder isso por aqui. 🤔 Você pode perguntar sobre doação de sangue, órgãos e tecidos, leite materno, mitos e medos, ou o material para aula — ou falar com o assistente completo em chatgpt.com/g/promocao-3d.";

const SUGGESTIONS = [
  "Como doar sangue?",
  "Como funciona a fila do SUS?",
  "Quem pode doar leite?",
  "Tenho tatuagem, posso doar?",
  "Tem material para aula?",
];

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const answerFor = (question: string) => {
  const q = normalize(question);
  let best: string | null = null;
  let score = 0;
  KB.forEach((entry) => {
    const hits = entry.keys.filter((k) => q.includes(normalize(k))).length;
    if (hits > score) {
      score = hits;
      best = entry.answer;
    }
  });
  return best ?? FALLBACK;
};

/* ────────────────────────────────────────────────────────────
   Card do chat
   ──────────────────────────────────────────────────────────── */

const ChatCard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [introStep, setIntroStep] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Rolagem suave a cada mensagem nova
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  // Roteiro de abertura
  useEffect(() => {
    const step = INTRO[introStep];
    if (!step) return;
    const delay = setTimeout(() => {
      setIsTyping(true);
      const typing = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { role: "bot", text: step.text }]);
        setIntroStep((i) => i + 1);
      }, step.typing);
      return () => clearTimeout(typing);
    }, step.delay);
    return () => clearTimeout(delay);
  }, [introStep]);

  const ask = useCallback(
    (text: string) => {
      const question = text.trim();
      if (!question || isTyping) return;

      setDraft("");
      setMessages((prev) => [...prev, { role: "user", text: question }]);

      const reply = answerFor(question);
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, { role: "bot", text: reply }]);
        }, Math.min(2000, 500 + reply.length * 9));
      }, 350);
    },
    [isTyping]
  );

  return (
    <div className="hero3d__chat">
      <header className="hero3d__chat-header">
        <img
          className="hero3d__chat-avatar"
          src={agenteLogo}
          alt="Assistente Promoção 3D"
        />
        <div className="hero3d__chat-id">
          <strong>Assistente 3D</strong>
          <span className="hero3d__chat-status">
            <i />
            Online agora
          </span>
        </div>
        <span className="hero3d__chat-tag">IA</span>
      </header>

      <div className="hero3d__chat-messages" ref={listRef}>
        {messages.map((msg, i) => (
          <div
            key={`${msg.role}-${i}`}
            className={`hero3d__chat-row hero3d__chat-row--${msg.role}`}
          >
            <p className={`hero3d__bubble hero3d__bubble--${msg.role}`}>
              {msg.text}
            </p>
          </div>
        ))}

        {isTyping && (
          <div className="hero3d__chat-row hero3d__chat-row--bot">
            <div className="hero3d__typing" aria-label="Assistente digitando">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
      </div>

      <div className="hero3d__chat-suggestions">
        {SUGGESTIONS.map((s) => (
          <button key={s} type="button" onClick={() => ask(s)}>
            {s}
          </button>
        ))}
      </div>

      <form
        className="hero3d__chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Digite sua dúvida..."
          aria-label="Digite sua dúvida"
          autoComplete="off"
        />
        <button type="submit" aria-label="Enviar pergunta">
          <i className="bx bx-send" />
        </button>
      </form>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Hero
   ──────────────────────────────────────────────────────────── */

const Inicio = () => (
  <>
    <header className="hero3d-nav">
      <div className="hero3d-nav__inner">
        <a className="hero3d-nav__logo" href="#hero">
          <img src={logo} alt="" aria-hidden />
          <strong>Promoção 3D</strong>
        </a>

        <nav className="hero3d-nav__links">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={i === 0 ? "is-active" : undefined}
              data-secondary=""
            >
              {link.label}
            </a>
          ))}
          <a className="hero3d-nav__blog" href="#blog">
            <i className="bx bx-edit-alt" />
            Blog
          </a>
        </nav>
      </div>
    </header>

    <section className="hero3d" id="hero">
      <div className="hero3d__dots" aria-hidden />
      <div className="hero3d__orb" aria-hidden />

      <div className="hero3d__grid">
        <div className="hero3d__col">
          <div className="hero3d__meta">
            <span className="hero3d__badge">
              <i className="bx bx-book-open" />
              Material educativo
            </span>
            <span className="hero3d__law">Lei nº 18.359/2023 · PE</span>
          </div>

          <div className="hero3d__headline">
            <p className="hero3d__eyebrow">Promoção 3D</p>
            <h1 className="hero3d__title">
              Doações, Transfusão &amp; Transplantes
            </h1>
            <p className="hero3d__lede">
              Um percurso de aprendizagem sobre doação de sangue, órgãos,
              tecidos e leite materno — para estudantes, professores e escolas
              desvendarem os mitos, medos e preconceitos que ainda impedem vidas
              de serem salvas.
            </p>
          </div>

          <div className="hero3d__actions">
            <a className="hero3d__cta" href="#desvendando">
              <i className="bx bx-play-circle" />
              Começar a aprender
            </a>
            <a className="hero3d__cta hero3d__cta--ghost" href="#material">
              <i className="bx bx-folder-open" />
              Material para aula
            </a>
          </div>

          <div className="hero3d__topics">
            {TOPICS.map((topic) => (
              <a
                key={topic.title}
                href={topic.href}
                className={`hero3d__topic hero3d__topic--${topic.modifier}`}
              >
                <span className="hero3d__topic-kicker">
                  <i className={`bx ${topic.icon}`} />
                  {topic.kicker}
                </span>
                <strong className="hero3d__topic-title">{topic.title}</strong>
                <span className="hero3d__topic-text">{topic.text}</span>
              </a>
            ))}
          </div>

          <div className="hero3d__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="hero3d__stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <p className="hero3d__note">
            Conteúdo alinhado ao PL 110/2024, que propõe a Promoção 3D no
            currículo escolar e acadêmico brasileiro.
          </p>
        </div>

        <aside className="hero3d__aside">
          <ChatCard />

          <p className="hero3d__caption">
            Tire dúvidas em linguagem simples, a qualquer hora, em português.{" "}
            <a href={CHATBOT_URL} target="_blank" rel="noreferrer">
              Abrir assistente completo
            </a>
          </p>

          <a className="hero3d__app" href="/app">
            <img src={iconApp} alt="" aria-hidden />
            <span>
              <small>Baixe o app</small>
              <strong>Memória e Vida</strong>
            </span>
            <i className="bx bx-download" />
          </a>
        </aside>
      </div>
    </section>
  </>
);

export default Inicio;
