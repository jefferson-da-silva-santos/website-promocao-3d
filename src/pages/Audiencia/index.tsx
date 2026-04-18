import React, { useState } from "react";
import logo from "../../assets/image/logo.png";

const VIDEOS = [
  { id: "cgEkDVPqyYU", label: "Vídeo 1 – Audiência Pública" },
  { id: "QuJeJ8jG4Jo", label: "Vídeo 2 – Audiência Pública" },
];

const Audiencia: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="audiencia" id="audiencia">
      <div className="audiencia__overlay"></div>

      <section className="audiencia__content" data-aos="fade-up">
        {/* Cabeçalho */}
        <div className="audiencia__content--primary">
          <div className="group-sup-img">
            <img src={logo} alt="Logo Promoção 3D" />
            <span className="audiencia__content--primary__suptitle">
              Audiência Pública
            </span>
          </div>
          <h2 className="audiencia__content--primary__title">
            Audiência Pública da Promoção 3D
          </h2>
        </div>

        {/* Player */}
        <div className="audiencia__content--secundary">

          {/*
            Renderiza apenas o iframe do índice atual.
            A prop `key` força o React a desmontar/remontar o iframe
            ao trocar de vídeo, evitando que o player antigo fique preso.
          */}
          <div className="video-audiencia-wrapper">
            <iframe
              key={VIDEOS[currentIndex].id}
              className="audiencia-iframe"
              src={`https://www.youtube.com/embed/${VIDEOS[currentIndex].id}`}
              title={VIDEOS[currentIndex].label}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          {/* Dots de navegação */}
          <div className="audiencia-dots">
            {VIDEOS.map((_, idx) => (
              <button
                key={idx}
                className={`audiencia-dot${idx === currentIndex ? " audiencia-dot--active" : ""}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir para vídeo ${idx + 1}`}
              />
            ))}
          </div>

          {/* Botões prev / next */}
          <div className="buttons_audiencia">
            <button
              className="btn-audience-prev"
              onClick={() => setCurrentIndex((i) => i - 1)}
              disabled={currentIndex === 0}
            >
              <i className="bx bxs-chevrons-left"></i> Vídeo anterior
            </button>

            <span className="audiencia-counter">
              {currentIndex + 1}&nbsp;/&nbsp;{VIDEOS.length}
            </span>

            <button
              className="btn-audience-next"
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

export default Audiencia;
