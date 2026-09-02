import chat from "../../assets/image/chat.png";
import SectionHeader from "../../components/SectionHeader";
import { c, display, dots, inner, section } from "../../theme";

const CHATBOT_URL = "https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d";

const QUESTIONS = [
  { icon: "bx-droplet", color: c.red, text: "Quem pode doar sangue e a partir de que idade?" },
  { icon: "bx-heart", color: c.yellow, text: "Como funciona a fila de transplantes no SUS?" },
  { icon: "bx-donate-heart", color: c.green, text: "Como doar leite materno com segurança?" },
];

const LINKS = [
  { icon: "bx-news", color: c.red, label: "Matéria completa sobre a Promoção 3D", trailing: "bx-right-arrow-alt", href: "#" },
  { icon: "bx-file", color: c.yellow, label: "Trabalho do Doutorando em Educação Eliabi Pereira", trailing: "bx-download", href: "#" },
  { icon: "bx-collection", color: c.green, label: "Mais um link de teste", trailing: "bx-right-arrow-alt", href: "#" },
];

const Material = () => (
  <div className="material" id="material" style={section}>
    <div aria-hidden style={dots} />
    <section style={inner}>
      <article className="p3d-grid-2" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.05fr)", gap: 48, alignItems: "center" }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ border: `3px solid ${c.ink}`, borderRadius: 18, boxShadow: `9px 9px 0 ${c.yellow}`, background: c.white, overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "18px 20px", background: c.ink }}>
              <img src={chat} alt="Assistente da Promoção 3D" style={{ width: 52, height: 52, borderRadius: 14, border: `2px solid ${c.paper}`, flex: "none", objectFit: "cover" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
                <strong style={{ fontFamily: display, fontSize: 20, color: c.paper, lineHeight: 1.15 }}>Assistente 3D</strong>
                <span style={{ fontSize: 12.5, color: "#C9C2B4", lineHeight: 1.35 }}>Treinado na política pública</span>
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `2px solid ${c.green}`, borderRadius: 999, padding: "4px 10px", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: c.green, flex: "none" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.green }} />
                Online
              </span>
            </div>

            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted }}>Perguntas que ele responde</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {QUESTIONS.map((q) => (
                  <div key={q.text} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 14px", background: c.paper, border: `2px solid ${c.ink}`, borderRadius: "14px 14px 14px 4px" }}>
                    <i className={`bx ${q.icon}`} style={{ fontSize: 17, color: q.color, flex: "none", marginTop: 1 }} />
                    <span style={{ fontSize: 13.5, lineHeight: 1.45, color: c.ink }}>{q.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "18px 20px", borderTop: `2px dashed ${c.dash}`, background: c.paper }}>
              <a href={CHATBOT_URL} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, background: c.red, color: "#fff", fontSize: 15, fontWeight: 700, padding: "14px 22px", border: `2px solid ${c.ink}`, borderRadius: 999, boxShadow: `4px 4px 0 ${c.ink}`, textDecoration: "none" }}>
                <i className="bx bx-message-rounded-dots" style={{ fontSize: 19 }} />
                Converse com nosso Chatbot
              </a>
              <div style={{ display: "flex", justifyContent: "center", gap: 18, fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: c.faint }}>
                <span>Gratuito</span><span>24 horas</span><span>Português</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
          <SectionHeader label="Material" title="Você já conhece o Chatbot da Promoção 3D?" />
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.68, color: c.text, textWrap: "pretty" as never }}>
            A Promoção 3D foi revitalizada com uma abordagem inovadora e agora incorpora
            um Assistente de Inteligência Artificial (I.A), treinado especificamente para
            responder, conscientizar, incentivar e educar as pessoas sobre a importância
            das Transfusões, Transplantes e Doações, fundamentais para salvar vidas e
            promover a saúde pública. Disponibilizado em plataforma digital, esse
            assistente foi alimentado com informações detalhadas sobre os aspectos
            essenciais da Política Pública - Promoção 3D, atuando como um recurso valioso
            para informar e engajar o público conscientizando, incentivando e educando
            para salvar vidas.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} style={{ display: "flex", alignItems: "center", gap: 12, background: c.white, border: `2px solid ${c.ink}`, borderRadius: 12, padding: "13px 15px", textDecoration: "none" }}>
                <i className={`bx ${l.icon}`} style={{ fontSize: 20, color: l.color, flex: "none" }} />
                <span style={{ flex: 1, fontSize: 14.5, fontWeight: 700, color: c.ink, lineHeight: 1.35 }}>{l.label}</span>
                <i className={`bx ${l.trailing}`} style={{ fontSize: 18, color: c.ink, flex: "none" }} />
              </a>
            ))}
          </div>
        </div>
      </article>
    </section>
  </div>
);

export default Material;
