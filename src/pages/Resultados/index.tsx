import React from "react";
import videoLocal from "../../assets/video/video-pro.mp4";
import SectionHeader from "../../components/SectionHeader";
import { c, dots, inner, section } from "../../theme";

const VideoRow: React.FC<{
  index: string;
  eyebrow: string;
  description: string;
  accent: string;
  reverse?: boolean;
  media: React.ReactNode;
  watchHref?: string;
}> = ({ index, eyebrow, description, accent, reverse, media, watchHref }) => (
  <article className="p3d-grid-media" style={{ display: "grid", gridTemplateColumns: reverse ? "minmax(0, 0.85fr) minmax(0, 1.15fr)" : "minmax(0, 1.15fr) minmax(0, 0.85fr)", gap: 44, alignItems: "center" }}>
    <div style={{ minWidth: 0, order: reverse ? 2 : 1 }}>
      <div style={{ border: `3px solid ${c.ink}`, borderRadius: 18, boxShadow: `9px 9px 0 ${accent}`, overflow: "hidden", background: c.ink, aspectRatio: "16 / 9" }}>
        {media}
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 0, order: reverse ? 1 : 2 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", background: accent, border: `3px solid ${c.ink}`, fontSize: 16, fontWeight: 800, color: c.ink }}>{index}</span>
        <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted }}>{eyebrow}</span>
      </div>
      <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: c.text, textWrap: "pretty" as never }}>{description}</p>
      {watchHref && (
        <a href={watchHref} target="_blank" rel="noreferrer" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: c.ink, textDecoration: "none", borderBottom: `2px solid ${accent}`, paddingBottom: 3 }}>
          Assistir no YouTube <i className="bx bx-link-external" style={{ fontSize: 16 }} />
        </a>
      )}
    </div>
  </article>
);

const divider = (
  <div aria-hidden style={{ height: 2, background: "repeating-linear-gradient(90deg, #E3DCCB 0 10px, transparent 10px 20px)" }} />
);

const ytFrame = (id: string, title: string) => (
  <iframe
    src={`https://www.youtube.com/embed/${id}`}
    title={title}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    style={{ display: "block", width: "100%", height: "100%", border: 0 }}
  />
);

const Resultados: React.FC = () => (
  <div className="resultados" id="resultados" style={section}>
    <div aria-hidden style={dots} />
    <section style={{ ...inner, gap: 56 }}>
      <SectionHeader
        label="Resultados"
        title="Promoção 3D na mídia"
        subtitle="Os avanços da política nas casas legislativas, em vídeo."
        align="center"
      />
      <VideoRow
        index="01"
        eyebrow="Câmara dos Deputados"
        accent={c.red}
        description="PL110/2024, Deputado Federal Eduardo da Fonte, Institui o Programa de Ensino e Conscientização sobre Doação de Sangue, Doação de Órgãos/Tecidos e Doação de Leite Materno – Promoção 3D no currículo escolar e acadêmico brasileiro."
        media={ytFrame("iZwb0yh2klk", "Promoção 3D — Câmara dos Deputados")}
        watchHref="https://www.youtube.com/watch?v=iZwb0yh2klk"
      />
      {divider}
      <VideoRow
        index="02"
        reverse
        eyebrow="Câmara Municipal de Custódia"
        accent={c.yellow}
        description="Dr. e Vereador Cristiano Teixeira Dantas, durante a sessão apresenta PROJETO DE LEI 004/2024, com o objetivo de instituir a Política de Conscientização e Incentivo da Doação de Sangue, Órgãos, Tecidos e Leite Materno - Promoção 3D, no Município de Custódia."
        media={
          <video controls style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}>
            <source src={videoLocal} type="video/mp4" />
            Seu navegador não suporta a tag de vídeo.
          </video>
        }
      />
    </section>
  </div>
);

export default Resultados;
