import { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { PaperPlaneRight } from "@phosphor-icons/react";
import BrandMark from "../ui/BrandMark";
import { SITE } from "../../data/site";
import { usePrefersReducedMotion } from "../../hooks/useUiEffects";

type Role = "bot" | "user";

interface ScriptStep {
  readonly role: Role;
  readonly text: string;
  /** Espera antes do passo, em ms. */
  readonly delay: number;
  /** Tempo do indicador "digitando", em ms (apenas para o assistente). */
  readonly typing: number;
}

interface Message {
  readonly role: Role;
  readonly text: string;
}

const SCRIPT: readonly ScriptStep[] = [
  { role: "bot", text: "Olá! Sou o assistente oficial da Promoção 3D.", delay: 700, typing: 1000 },
  { role: "bot", text: "Posso tirar dúvidas sobre doação de sangue, órgãos e leite humano.", delay: 400, typing: 1300 },
  { role: "user", text: "Como posso me tornar doador de sangue?", delay: 1100, typing: 0 },
  {
    role: "bot",
    text: "Basta ter entre 16 e 69 anos, pesar mais de 50 kg e estar em bom estado de saúde.",
    delay: 600,
    typing: 1700,
  },
  { role: "user", text: "E sobre doação de órgãos?", delay: 1100, typing: 0 },
  {
    role: "bot",
    text: "Qualquer pessoa pode ser doadora. O mais importante é comunicar sua decisão à família.",
    delay: 600,
    typing: 1600,
  },
];

interface ChatPreviewProps {
  readonly className?: string;
}

/**
 * Prévia animada de uma conversa real com o assistente.
 * Com movimento reduzido, a conversa aparece completa e estática.
 */
const ChatPreview: FC<ChatPreviewProps> = ({ className }) => {
  const reduced = usePrefersReducedMotion();
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState(0);
  const listRef = useRef<HTMLOListElement | null>(null);

  useEffect(() => {
    if (reduced || step >= SCRIPT.length) return;
    const current = SCRIPT[step];
    let typingTimer: ReturnType<typeof setTimeout> | undefined;

    const push = () => {
      setTyping(false);
      setMessages((prev) => [...prev, { role: current.role, text: current.text }]);
      setStep((i) => i + 1);
    };

    const delayTimer = setTimeout(() => {
      if (current.role === "bot" && current.typing > 0) {
        setTyping(true);
        typingTimer = setTimeout(push, current.typing);
      } else {
        push();
      }
    }, current.delay);

    return () => {
      clearTimeout(delayTimer);
      if (typingTimer) clearTimeout(typingTimer);
    };
  }, [step, reduced]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [messages, typing, reduced]);

  const visible: readonly Message[] = reduced ? SCRIPT.map(({ role, text }) => ({ role, text })) : messages;

  return (
    <aside
      className={["chat-preview", className].filter(Boolean).join(" ")}
      aria-label="Exemplo de conversa com o assistente da Promoção 3D"
    >
      <header className="chat-preview__head">
        <span className="chat-preview__avatar">
          <BrandMark size={20} />
        </span>
        <span className="chat-preview__who">
          <strong>Assistente 3D</strong>
          <small>Responde 24 horas, em português</small>
        </span>
      </header>

      <ol className="chat-preview__list" ref={listRef} aria-live="polite">
        {visible.map((m, i) => (
          <li key={i} className={`chat-bubble chat-bubble--${m.role}`}>
            {m.text}
          </li>
        ))}
        {typing && (
          <li className="chat-bubble chat-bubble--bot chat-bubble--typing" aria-label="Assistente digitando">
            <span />
            <span />
            <span />
          </li>
        )}
      </ol>

      <a className="chat-preview__input" href={SITE.chatbotUrl} target="_blank" rel="noreferrer noopener">
        <span>Digite sua dúvida</span>
        <span className="chat-preview__send" aria-hidden="true">
          <PaperPlaneRight size={16} weight="fill" />
        </span>
        <span className="sr-only">Abrir o assistente em uma nova aba</span>
      </a>
    </aside>
  );
};

export default ChatPreview;
