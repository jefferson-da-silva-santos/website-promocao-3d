import React, { useRef, useState, useEffect } from "react";
import Plyr from "plyr-react";
import type { APITypes, PlyrProps } from "plyr-react";
import "plyr-react/plyr.css";
import logo from "../../assets/image/logo.png";
import videoLocal from "../../assets/video/video-pro.mp4";

const Resultados: React.FC = () => {
  const playerRef = useRef<APITypes | null>(null);
  const [isLocalVideo, setIsLocalVideo] = useState(false);

  // Configuração dinâmica do player
  const getPlayerProps = (): PlyrProps => {
    if (isLocalVideo) {
      return {
        source: {
          type: "video",
          sources: [
            {
              src: videoLocal,
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

    return {
      source: {
        type: "video",
        sources: [
          {
            src: "iZwb0yh2klk",
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

  // Adiciona classe quando o vídeo local estiver ativo
  useEffect(() => {
    const playerElement = document.querySelector(".plyr--video") as HTMLElement | null;

    if (playerElement) {
      if (isLocalVideo) {
        playerElement.classList.add("plyr--local");
      } else {
        playerElement.classList.remove("plyr--local");
      }
    }
  }, [isLocalVideo]);

  const handleNext = () => setIsLocalVideo(true);
  const handlePrev = () => setIsLocalVideo(false);

  return (
    <div className="resultados" id="resultados">
      <div className="box"></div>

      <section className="resultados__content">
        <div className="resultados__content__section--primary">
          <div className="video-resultados">
            <Plyr ref={playerRef} {...getPlayerProps()} />
          </div>
        </div>

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
            PL110/2024, Deputado Federal Eduardo da Fonte, Institui o Programa
            de Ensino e Conscientização sobre Doação de Sangue, Doação de
            Órgãos/Tecidos e Doação de Leite Materno – Promoção 3D no currículo
            escolar e acadêmico brasileiro.
          </p>

          <div className="buttons-resultados">
            <button
              className="btn-video-prev"
              onClick={handlePrev}
              disabled={!isLocalVideo}
            >
              <i className="bx bxs-chevrons-left"></i> Vídeo anterior
            </button>
            <button
              className="btn-video-next"
              onClick={handleNext}
              disabled={isLocalVideo}
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
