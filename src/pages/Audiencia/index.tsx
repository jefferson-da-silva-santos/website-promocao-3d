import React, { useRef, useState } from "react";
import Plyr from "plyr-react";
import type { APITypes, PlyrProps } from "plyr-react";
import "plyr-react/plyr.css";
import logo from "../../assets/image/logo.png";
import video from "../../assets/video/video-pro.mp4";

const Audiencia: React.FC = () => {
  const playerRef = useRef<APITypes | null>(null);

  // Estado para alternar o vídeo
  const [isLocalVideo, setIsLocalVideo] = useState(false);

  // Configuração do player dinamicamente
  const getPlayerProps = (): PlyrProps => {
    if (isLocalVideo) {
      // 🎬 vídeo local (MP4)
      return {
        source: {
          type: "video",
          sources: [
            {
              src: video,
              type: "video/mp4",
            },
          ],
        },
        options: {
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "settings",
            "fullscreen",
          ],
        },
      };
    }

    // ▶️ vídeo do YouTube
    return {
      source: {
        type: "video",
        sources: [
          {
            src: "cgEkDVPqyYU",
            provider: "youtube",
          },
        ],
      },
      options: {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "settings",
          "fullscreen",
        ],
      },
    };
  };

  // Funções dos botões
  const handleNext = () => setIsLocalVideo(true);
  const handlePrev = () => setIsLocalVideo(false);

  return (
    <div className="audiencia" id="audiencia">
      <div className="audiencia__overlay"></div>

      <section className="audiencia__content">
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
          <div
            className={`video-audiencia ${
              isLocalVideo ? "video-audiencia--local" : ""
            }`}
          >
            <Plyr ref={playerRef} {...getPlayerProps()} />
          </div>

          <div className="buttons_audiencia">
            <button
              className="btn-audience-prev"
              onClick={handlePrev}
              disabled={!isLocalVideo}
            >
              Vídeo anterior
            </button>
            <button
              className="btn-audience-next"
              onClick={handleNext}
              disabled={isLocalVideo}
            >
              Próximo vídeo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Audiencia;
