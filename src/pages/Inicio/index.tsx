import { useEffect, useRef, useState } from "react";
import chat from "/agente_logo.png";

const FULL_TITLE = "Doações, Transfusão & Transplantes";

const CHAT_SCRIPT = [
  { role: "bot" as const, text: "Olá! Eu sou o assistente oficial da Promoção 3D. 👋", delay: 800, typing: 1100 },
  { role: "bot" as const, text: "Posso te ajudar com dúvidas sobre doação de sangue, órgãos e leite humano.", delay: 500, typing: 1500 },
  { role: "user" as const, text: "Como posso me tornar doador de sangue?", delay: 1000, typing: 0 },
  { role: "bot" as const, text: "Para doar sangue basta ter entre 16 e 69 anos, pesar mais de 50 kg e estar em bom estado de saúde. 🩸", delay: 700, typing: 1900 },
  { role: "user" as const, text: "E sobre doação de órgãos?", delay: 1000, typing: 0 },
  { role: "bot" as const, text: "Qualquer pessoa pode ser doadora! O mais importante é comunicar sua decisão à família. 💚", delay: 700, typing: 1700 },
];

type Message = { role: "bot" | "user"; text: string };

const ChatCard = ({ chatImg }: { chatImg: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [scriptIndex, setScriptIndex] = useState(0);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scriptIndex >= CHAT_SCRIPT.length) return;
    const step = CHAT_SCRIPT[scriptIndex];
    const delayTimer = setTimeout(() => {
      if (step.role === "bot" && step.typing > 0) {
        setIsTyping(true);
        const typingTimer = setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, { role: step.role, text: step.text }]);
          setScriptIndex((i) => i + 1);
        }, step.typing);
        return () => clearTimeout(typingTimer);
      } else {
        setMessages((prev) => [...prev, { role: step.role, text: step.text }]);
        setScriptIndex((i) => i + 1);
      }
    }, step.delay);
    return () => clearTimeout(delayTimer);
  }, [scriptIndex]);

  useEffect(() => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  return (
    <div className="hero__bot-card">
      <div className="hero__bot-header">
        <div className="hero__bot-avatar">
          <img src={chatImg} alt="Assistente Promoção 3D" />
        </div>
        <div className="hero__bot-header-info">
          <p className="hero__bot-name">Assistente 3D</p>
          <span className="hero__bot-status">
            <span className="hero__bot-dot" />
            Online agora
          </span>
        </div>
        <div className="hero__bot-dots">
          <span /><span /><span />
        </div>
      </div>
      <div className="hero__bot-messages" ref={messagesRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`hero__bot-row hero__bot-row--${msg.role}`}>
            {msg.role === "bot" && (
              <div className="hero__bot-avatar-mini">
                <img src={chatImg} alt="" aria-hidden="true" />
              </div>
            )}
            <div className={`hero__bot-bubble hero__bot-bubble--${msg.role}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="hero__bot-row hero__bot-row--bot">
            <div className="hero__bot-avatar-mini">
              <img src={chatImg} alt="" aria-hidden="true" />
            </div>
            <div className="hero__bot-bubble hero__bot-bubble--bot hero__bot-bubble--typing">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>
      <div className="hero__bot-inputbar">
        <span className="hero__bot-inputbar-text">Digite sua dúvida...</span>
        <a
          href="https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d"
          target="_blank"
          rel="noreferrer"
          className="hero__bot-send"
          aria-label="Abrir chatbot"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </a>
      </div>
      <div className="hero__bot-stats">
        <div className="hero__stat"><strong>3</strong><small>Dimensões</small></div>
        <div className="hero__stat-divider" />
        <div className="hero__stat"><strong>24h</strong><small>Disponível</small></div>
        <div className="hero__stat-divider" />
        <div className="hero__stat"><strong>PT-BR</strong><small>Idioma</small></div>
      </div>
    </div>
  );
};

const Inicio = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      if (i < FULL_TITLE.length) {
        el.textContent += FULL_TITLE[i];
        i++;
      } else {
        clearInterval(interval);
        el.classList.add("typing-done");
      }
    }, 38);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero" id="hero">
      <div className="hero__bg">
        <div className="hero__bg-orb hero__bg-orb--1" />
        <div className="hero__bg-orb hero__bg-orb--2" />
        <div className="hero__bg-orb hero__bg-orb--3" />
        <div className="hero__bg-grid" />
      </div>

      <div className="hero__content">
        <section className="hero__left" data-aos="fade-right">
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Política Pública de Saúde
          </div>

          <p className="hero__eyebrow">Promoção 3D</p>

          <h1 className="hero__title hero__title--typing" ref={titleRef} />

          <p className="hero__text">
            Conscientização sobre mitos, tabus e preconceitos para fortalecer os
            direitos humanos e a cidadania — respeitando contextos interétnico e
            interculturais.
          </p>

          <div className="hero__pills">
            <span className="hero__pill hero__pill--red">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C8 2 5 8 5 12c0 4.4 3.1 8 7 8s7-3.6 7-8c0-4-3-10-7-10z" />
              </svg>
              Sangue &amp; Transfusão
            </span>
            <span className="hero__pill hero__pill--green">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Órgãos &amp; Tecidos
            </span>
            <span className="hero__pill hero__pill--amber">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7z" />
              </svg>
              Leite Humano
            </span>
          </div>

          <div className="hero__actions">
            <a
              href="https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d"
              target="_blank"
              rel="noreferrer"
              className="hero__cta"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              Converse com o Chatbot
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a href="/saiba-mais" className="hero__link">
              Saiba mais
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
          </div>

          {/* App Memória e Vida */}
          <a href="/app" className="hero__app-btn">
            <img src="/iconApp.png" alt="" className="hero__app-btn-icon" aria-hidden="true" />
            <div className="hero__app-btn-text">
              <span className="hero__app-btn-label">Baixar o app</span>
              <span className="hero__app-btn-name">Memória e Vida</span>
            </div>
            <svg
              className="hero__app-btn-arrow"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

        </section>

        <section className="hero__right" data-aos="fade-left">
          <ChatCard chatImg={chat} />
        </section>
      </div>
    </div>
  );
};

export default Inicio;