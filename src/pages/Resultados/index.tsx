import React, { useState } from "react";
import logo from "../../assets/image/logo.png";
import videoLocal from "../../assets/video/video-pro.mp4";

// ─── Dados dos vídeos ─────────────────────────────────────────────────────────

interface VideoItem {
  type: "youtube" | "local";
  src: string;
  description: string;
}

const VIDEOS: VideoItem[] = [
  {
    type: "youtube",
    src: "iZwb0yh2klk",
    description:
      "PL110/2024, Deputado Federal Eduardo da Fonte, Institui o Programa de Ensino e Conscientização sobre Doação de Sangue, Doação de Órgãos/Tecidos e Doação de Leite Materno – Promoção 3D no currículo escolar e acadêmico brasileiro.",
  },
  {
    type: "local",
    src: videoLocal,
    description:
      "Dr. e Vereador Cristiano Teixeira Dantas, durante a sessão apresenta PROJETO DE LEI 004/2024, com o objetivo de instituir a Política de Conscientização e Incentivo da Doação de Sangue, Órgãos, Tecidos e Leite Materno - Promoção 3D, no Município de Custódia.",
  },
];

// ─── Componente ───────────────────────────────────────────────────────────────

const Resultados: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = VIDEOS[currentIndex];

  return (
    <div className="resultados" id="resultados">
      <div className="box"></div>

      <section className="resultados__content">

        {/* ── Coluna do vídeo ── */}
        <div className="resultados__content__section--primary">
          <div className="video-resultados">
            {/*
              A prop `key` força o React a desmontar e remontar o elemento
              ao trocar de vídeo, garantindo que o primeiro vídeo apareça
              corretamente desde o início — sem depender do Plyr.
            */}
            {current.type === "youtube" ? (
              <iframe
                key={current.src}
                src={`https://www.youtube.com/embed/${current.src}`}
                title="Promoção 3D – vídeo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <video key={current.src} controls>
                <source src={current.src} type="video/mp4" />
                Seu navegador não suporta a tag de vídeo.
              </video>
            )}
          </div>
        </div>

        {/* ── Coluna de texto ── */}
        <div className="resultados__content__section--secundary">
          <div>
            <div className="group">
              <img src={logo} alt="Logo Promoção 3D" />
              <span className="resultados__content__section--secundary__suptitle">
                Resultados
              </span>
            </div>
            <h2 className="resultados__content__section--secundary__title">
              Promoção 3D na mídia
            </h2>
          </div>

          <p className="resultados__content__section--secundary__text">
            {current.description}
          </p>

          <div className="buttons-resultados">
            <button
              className="btn-video-prev"
              onClick={() => setCurrentIndex((i) => i - 1)}
              disabled={currentIndex === 0}
            >
              <i className="bx bxs-chevrons-left"></i> Vídeo anterior
            </button>
            <button
              className="btn-video-next"
              onClick={() => setCurrentIndex((i) => i + 1)}
              disabled={currentIndex === VIDEOS.length - 1}
            >
              Próximo vídeo <i className="bx bxs-chevrons-right"></i>
            </button>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Resultados;