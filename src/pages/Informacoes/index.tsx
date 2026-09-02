import iconeInfoTecidos from "../../assets/image/icone-info-tecidos.png";
import iconeInfoSangue from "../../assets/image/icone-info-sangue.png";
import iconeInfoLeite from "../../assets/image/icone-info-leite.png";
import SectionHeader from "../../components/SectionHeader";
import { c, display, dots, inner, section } from "../../theme";

const CARDS = [
  { accent: c.yellow, img: iconeInfoTecidos, title: "Doação de Orgãos e Tecidos", text: "A doação de órgãos salva vidas e requer autorização/compatibilidade pelo SUS." },
  { accent: c.red, img: iconeInfoSangue, title: "Doação de Sangue", text: "A doação de sangue é rápida, segura e pode salvar até quatro vidas." },
  { accent: c.green, img: iconeInfoLeite, title: "Doação de Leite Materno", text: "A doação de leite materno nutre bebês prematuros e pode salvar vidas." },
];

const Informacoes = () => (
  <div className="informacoes" id="informacoes" style={section}>
    <div aria-hidden style={dots} />
    <section style={inner}>
      <SectionHeader label="Informações" title="Informações sobre a doação" align="center" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(268px, 1fr))", gap: 26 }}>
        {CARDS.map((card) => (
          <article key={card.title} style={{ display: "flex", flexDirection: "column", gap: 14, padding: "26px 24px", background: c.white, border: `3px solid ${c.ink}`, borderRadius: 18, boxShadow: `9px 9px 0 ${card.accent}` }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 58, height: 58, borderRadius: "50%", background: card.accent, border: `3px solid ${c.ink}`, overflow: "hidden" }}>
              <img src={card.img} alt="" style={{ width: 34, height: 34, objectFit: "contain" }} />
            </span>
            <h3 style={{ margin: 0, fontFamily: display, fontSize: 21, lineHeight: 1.2, fontWeight: 700, color: c.ink, textWrap: "balance" as never }}>{card.title}</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: c.text, textWrap: "pretty" as never }}>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  </div>
);

export default Informacoes;
