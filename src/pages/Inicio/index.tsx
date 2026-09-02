import chat from "/agente_logo.png";
import iconApp from "/iconApp.png";
import logo from "../../assets/image/logo.png";
import { c, display, pillBtn } from "../../theme";

const FULL_TITLE = "Doações, Transfusão & Transplantes";

const CHAT_SCRIPT = [
  { role: "bot" as const, text: "Olá! Eu sou o assistente oficial da Promoção 3D. 👋", delay: 800, typing: 1100 },
  { role: "bot" as const, text: "Posso te ajudar com dúvidas sobre doação de sangue, órgãos e leite humano.", delay: 500, typing: 1500 },
  { role: "user" as const, text: "Como posso me tornar doador de sangue?", delay: 1000, typing: 0 },
  { role: "bot" as const, text: "Para doar sangue basta ter entre 16 e 69 anos, pesar mais de 50 kg e estar em bom estado de saúde. 🩸", delay: 700, typing: 1900 },
  { role: "user" as const, text: "E sobre doação de órgãos?", delay: 1000, typing: 0 },
  { role: "bot" as const, text: "Qualquer pessoa pode ser doadora! O mais importante é comunicar sua decisão à família. 💚", delay: 700, typing: 1700 },
];

const CHATBOT_URL = "https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d";

type Message = { role: "bot" | "user"; text: string };

const STUDY_CARDS = [
  { href: "#desvendando", accent: c.red, iconBg: c.red, iconColor: "#fff", icon: "bx-droplet", title: "Doação de Sangue", text: "6 mitos e 6 medos para estudar" },
  { href: "#informacoes", accent: c.yellow, iconBg: c.yellow, iconColor: c.ink, icon: "bx-heart", title: "Órgãos e Tecidos", text: "Como funciona a fila única do SUS" },
  { href: "#material", accent: c.green, iconBg: c.green, iconColor: c.ink, icon: "bx-donate-heart", title: "Leite Materno", text: "1 ml pode salvar um prematuro" },
];

import { useEffect, useRef, useState } from "react";

const ChatCard = () => {
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
      }
      setMessages((prev) => [...prev, { role: step.role, text: step.text }]);
      setScriptIndex((i) => i + 1);
    }, step.delay);
    return () => clearTimeout(delayTimer);
  }, [scriptIndex]);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  const bubble = (role: "bot" | "user"): React.CSSProperties => ({
    maxWidth: "86%",
    padding: "10px 13px",
    background: role === "bot" ? c.white : c.red,
    color: role === "bot" ? c.ink : "#fff",
    border: `2px solid ${c.ink}`,
    borderRadius: role === "bot" ? "14px 14px 14px 4px" : "14px 14px 4px 14px",
    fontSize: 13.5,
    lineHeight: 1.5,
  });

  return (
    <div style={{ background: c.white, border: `3px solid ${c.ink}`, borderRadius: 20, boxShadow: `8px 8px 0 ${c.ink}`, overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "16px 18px", background: c.ink }}>
        <img src={chat} alt="Assistente Promoção 3D" style={{ width: 38, height: 38, borderRadius: 10, border: `2px solid ${c.paper}` }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 1, flex: 1, minWidth: 0 }}>
          <strong style={{ fontSize: 14.5, color: c.paper, lineHeight: 1.2 }}>Assistente 3D</strong>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "#C9C2B4" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: c.green }} />
            Online agora
          </span>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: c.yellow, textTransform: "uppercase" }}>IA</span>
      </div>

      <div ref={messagesRef} style={{ display: "flex", flexDirection: "column", gap: 10, height: 274, overflowY: "auto", padding: "16px 16px 14px", background: c.paper }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.role === "bot" ? "flex-start" : "flex-end" }}>
            <div style={bubble(msg.role)}>{msg.text}</div>
          </div>
        ))}
        {isTyping && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "11px 14px", background: c.white, border: `2px solid ${c.ink}`, borderRadius: "14px 14px 14px 4px" }}>
              {[c.red, c.yellow, c.green].map((color, i) => (
                <span key={color} style={{ width: 6, height: 6, borderRadius: "50%", background: color, animation: `p3dblink 1s infinite ${i * 0.18}s` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderTop: `2px dashed ${c.dash}`, background: c.white }}>
        <span style={{ flex: 1, fontSize: 13.5, color: "#9A9284" }}>Digite sua dúvida...</span>
        <a href={CHATBOT_URL} target="_blank" rel="noreferrer" aria-label="Abrir chatbot" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: "50%", background: c.red, color: "#fff", border: `2px solid ${c.ink}` }}>
          <i className="bx bx-send" style={{ fontSize: 17 }} />
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", textAlign: "center", borderTop: `2px solid ${c.ink}` }}>
        {[["26", "mitos"], ["6", "jogos da vida"], ["3", "projetos de lei"]].map(([n, l], i) => (
          <div key={l} style={{ display: "flex", flexDirection: "column", gap: 1, padding: "12px 6px", borderLeft: i === 1 ? "2px solid #F0EADA" : undefined, borderRight: i === 1 ? "2px solid #F0EADA" : undefined }}>
            <strong style={{ fontSize: 18, color: c.ink }}>{n}</strong>
            <span style={{ fontSize: 11.5, color: c.muted, lineHeight: 1.3 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Inicio = () => (
  <div id="hero" style={{ position: "relative", overflow: "hidden", background: c.paper, padding: "124px 24px 68px", borderBottom: `3px solid ${c.ink}` }}>
    <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(${c.ink} 1px, transparent 1px)`, backgroundSize: "26px 26px", opacity: 0.07, pointerEvents: "none" }} />
    <div aria-hidden style={{ position: "absolute", top: -180, right: -140, width: 440, height: 440, borderRadius: "50%", background: c.green, opacity: 0.16, pointerEvents: "none" }} />
    <div aria-hidden style={{ position: "absolute", bottom: -220, left: -160, width: 400, height: 400, borderRadius: "50%", background: c.yellow, opacity: 0.18, pointerEvents: "none" }} />

    <div className="p3d-grid-2" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 380px)", gap: 56, alignItems: "center" }}>
      <section style={{ display: "flex", flexDirection: "column", gap: 22, minWidth: 0 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9, alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: c.ink, color: c.paper, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.09em", textTransform: "uppercase", padding: "6px 13px", borderRadius: 999 }}>
            <i className="bx bx-book-open" style={{ fontSize: 14, color: c.green }} />
            Material educativo
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, border: `2px solid ${c.ink}`, color: c.ink, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 999 }}>
            Lei nº 18.359/2023 · PE
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: c.red }}>Promoção 3D</p>
          <h1 style={{ margin: 0, fontFamily: display, fontSize: "clamp(33px, 3.9vw, 56px)", lineHeight: 1.04, fontWeight: 700, letterSpacing: "-0.015em", color: c.ink, textWrap: "balance" as never }}>
            {FULL_TITLE}
          </h1>
          <p style={{ margin: 0, maxWidth: "52ch", fontSize: 16.5, lineHeight: 1.62, color: c.text, textWrap: "pretty" as never }}>
            Um percurso de aprendizagem sobre doação de sangue, órgãos, tecidos e leite
            materno — para estudantes, professores e escolas desvendarem os mitos, medos
            e preconceitos que ainda impedem vidas de serem salvas.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(152px, 1fr))", gap: 12 }}>
          {STUDY_CARDS.map((card) => (
            <a key={card.title} href={card.href} style={{ display: "flex", flexDirection: "column", gap: 5, padding: "14px 14px 13px", background: c.white, border: `2px solid ${c.ink}`, borderRadius: 13, borderBottomWidth: 5, borderBottomColor: card.accent, textDecoration: "none" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: "50%", background: card.iconBg, color: card.iconColor }}>
                <i className={`bx ${card.icon}`} style={{ fontSize: 17 }} />
              </span>
              <strong style={{ fontSize: 14.5, color: c.ink, lineHeight: 1.25 }}>{card.title}</strong>
              <span style={{ fontSize: 12.5, color: c.muted, lineHeight: 1.45 }}>{card.text}</span>
            </a>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <a href="#desvendando" style={pillBtn(c.red, "#fff")}>
            <i className="bx bx-play-circle" style={{ fontSize: 19 }} />
            Começar a aprender
          </a>
          <a href="#material" style={{ ...pillBtn(c.white, c.ink), boxShadow: "none" }}>
            <i className="bx bx-folder-open" style={{ fontSize: 19, color: c.red }} />
            Material para aula
          </a>
          <a href="/app" style={{ display: "inline-flex", alignItems: "center", gap: 11, background: c.ink, padding: "9px 18px 9px 10px", border: `2px solid ${c.ink}`, borderRadius: 999, textDecoration: "none" }}>
            <img src={iconApp} alt="" aria-hidden style={{ width: 32, height: 32, borderRadius: 9, border: `2px solid ${c.paper}` }} />
            <span style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: c.yellow }}>Baixe o app</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: c.paper, lineHeight: 1.2 }}>Memória e Vida</span>
            </span>
            <i className="bx bx-download" style={{ fontSize: 18, color: c.green }} />
          </a>
        </div>

        <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.5, color: c.faint }}>
          Conteúdo alinhado ao PL 110/2024, que propõe a Promoção 3D no currículo escolar e acadêmico brasileiro.
        </p>
      </section>

      <section style={{ minWidth: 0 }}>
        <ChatCard />
        <p style={{ margin: "12px 4px 0", fontSize: 11.5, lineHeight: 1.5, color: c.faint, textAlign: "center" }}>
          Tire dúvidas em linguagem simples, a qualquer hora, em português.
        </p>
        <img src={logo} alt="" aria-hidden style={{ display: "none" }} />
      </section>
    </div>
  </div>
);

export default Inicio;
