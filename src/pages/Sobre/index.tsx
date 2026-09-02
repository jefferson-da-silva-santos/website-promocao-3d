import UPE from "../../assets/image/UPE.jpeg";
import SectionHeader from "../../components/SectionHeader";
import { c, dots, frame, inner, section } from "../../theme";

const MARCOS = [
  { label: "Lei nº 18.359/2023 · PE", accent: c.red },
  { label: "PL 5.233/2023 · Nacional", accent: c.yellow },
  { label: "PL 110/2024 · Ensino", accent: c.green },
];

const Sobre = () => (
  <div className="sobre" id="sobre" style={section}>
    <div aria-hidden style={dots} />
    <section style={inner}>
      <article className="p3d-grid-2" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: 48, alignItems: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
          <SectionHeader label="Sobre o projeto" title="Como surgiu a promoção 3D?" />
          <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.68, color: c.text, textWrap: "pretty" as never }}>
            A Promoção 3D é resultado de uma pesquisa do Doutorando em Educação Eliabi
            Pereira e seu Orientador: PhD Múcio Banja da Universidade de Pernambuco,
            Campus Mata Norte. Essa Pesquisa foi transformado na Lei N° 18.359 de 27 de
            Outubro de 2023 no Estado de Pernambuco, pelo Deputado Estadual Henrique
            Queiroz Filho, a pesquisa também foi apresentada no Congresso Nacional em
            Brasília pelo Deputado Federal Eduardo da Fonte, como Política Pública
            Nacional PL 5.233/2023 e Programa Nacional de Ensino PL110/2024.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {MARCOS.map((m) => (
              <span key={m.label} style={{ display: "inline-flex", alignItems: "center", gap: 7, border: `2px solid ${c.ink}`, borderBottomWidth: 4, borderBottomColor: m.accent, borderRadius: 10, padding: "8px 13px", fontSize: 13, fontWeight: 700, color: c.ink, background: c.white }}>
                {m.label}
              </span>
            ))}
          </div>
        </div>

        <div style={{ minWidth: 0 }}>
          <div style={{ ...frame(c.green), aspectRatio: "4 / 3" }}>
            <img src={UPE} alt="Universidade de Pernambuco, Campus Mata Norte" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <p style={{ margin: "12px 4px 0", fontSize: 11.5, lineHeight: 1.5, color: c.faint }}>Pesquisa desenvolvida na UPE · Campus Mata Norte</p>
        </div>
      </article>
    </section>
  </div>
);

export default Sobre;
