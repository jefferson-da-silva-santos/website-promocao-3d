import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import logo from "../../assets/image/logo.png";

const JogoDaVida: React.FC = () => {
  return (
    <div className="desvendando" id="jogo-da-vida">
      <section className="desvendando__content">
        <div className="desvendando__content__section desvendando__content__section--primary">
          <div className="group-sup-img">
            <img src={logo} alt="Logo Promoção 3D" />
            <span className="desvendando__content__section--primary__suptitle">
              Jogo da vida
            </span>
          </div>
          <h2 className="desvendando__content__section--primary__title">
            Você já conhece os Jogos da Vida da Promoção 3D?
          </h2>
        </div>

        <div className="desvendando__content__section desvendando__content__section--secundary-jogo">
          <div className="galeria-jogo-da-vida">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              className="swiper-jogo-da-vida"
            >
              <SwiperSlide>
                <img
                  className="img-jogo-da-vida"
                  src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/Promocao3D/jogos/tabuleiro%20da%20vida/tabuleiro.jpeg"
                  alt="Tabuleiro da Vida"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  className="img-jogo-da-vida"
                  src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/Promocao3D/jogos/tabuleiro%20da%20vida/tab1.jpeg"
                  alt="Tabuleiro 1"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  className="img-jogo-da-vida"
                  src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/Promocao3D/jogos/tabuleiro%20da%20vida/tabu2.jpeg"
                  alt="Tabuleiro 2"
                />
              </SwiperSlide>

              <SwiperSlide>
                <img
                  className="img-jogo-da-vida"
                  src="https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/Promocao3D/jogos/tabuleiro%20da%20vida/tabu3.jpeg"
                  alt="Tabuleiro 3"
                />
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="buttons-jogo-da-vida">
            <button className="btn-jogo-da-vida btnTabuleiro active">
              Tabuleiro da Vida
            </button>
            <button className="btn-jogo-da-vida btnMemoria">Memória da Vida</button>
            <button className="btn-jogo-da-vida btnTrilha">Trilha da Vida</button>
            <button className="btn-jogo-da-vida btnPassa">Passa ou Repassa da Vida</button>
            <button className="btn-jogo-da-vida btnRoda">Roda da Vida</button>
            <button className="btn-jogo-da-vida btnCartas">Cartas da Vida</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JogoDaVida;
