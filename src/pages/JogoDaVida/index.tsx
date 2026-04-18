import React, { useState, useEffect, useCallback } from "react";
import logo from "../../assets/image/logo.png";

const BASE_URL =
  "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/Promocao3D/jogos";

interface GameImage {
  src: string;
  alt: string;
}

interface GameData {
  key: string;
  label: string;
  images: GameImage[];
}

const GAMES: GameData[] = [
  {
    key: "tabuleiro",
    label: "Tabuleiro da Vida",
    images: [
      { src: `${BASE_URL}/tabuleiro%20da%20vida/tabuleiro.jpeg`, alt: "Tabuleiro da Vida" },
      { src: `${BASE_URL}/tabuleiro%20da%20vida/tab1.jpeg`,      alt: "Tabuleiro 1" },
      { src: `${BASE_URL}/tabuleiro%20da%20vida/tabu2.jpeg`,     alt: "Tabuleiro 2" },
      { src: `${BASE_URL}/tabuleiro%20da%20vida/tabu3.jpeg`,     alt: "Tabuleiro 3" },
    ],
  },
  {
    key: "memoria",
    label: "Memória da Vida",
    images: [
      { src: `${BASE_URL}/memoria%20da%20vida/memoria.jpeg`, alt: "Memória da Vida" },
    ],
  },
  { key: "trilha",  label: "Trilha da Vida",           images: [] },
  { key: "passa",   label: "Passa ou Repassa da Vida", images: [] },
  { key: "roda",    label: "Roda da Vida",             images: [] },
  { key: "cartas",  label: "Cartas da Vida",           images: [] },
];

// ─── Lightbox ────────────────────────────────────────────────────────────────

interface LightboxProps {
  images: GameImage[];
  startIndex: number;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [prev, next, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="jogo-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizar imagem"
    >
      <div className="jogo-lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <img
          key={images[current].src}
          src={images[current].src}
          alt={images[current].alt}
          className="jogo-lightbox__img"
        />
        <div className="jogo-lightbox__caption">
          <span>{images[current].alt}</span>
          <span className="jogo-lightbox__counter">
            {current + 1}&nbsp;/&nbsp;{images.length}
          </span>
        </div>
      </div>

      <button className="jogo-lightbox__close" onClick={onClose} aria-label="Fechar">
        <i className="bx bx-x" />
      </button>

      {images.length > 1 && (
        <>
          <button
            className="jogo-lightbox__arrow jogo-lightbox__arrow--prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Imagem anterior"
          >
            <i className="bx bxs-chevron-left" />
          </button>
          <button
            className="jogo-lightbox__arrow jogo-lightbox__arrow--next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Próxima imagem"
          >
            <i className="bx bxs-chevron-right" />
          </button>

          <div className="jogo-lightbox__thumbs" onClick={(e) => e.stopPropagation()}>
            {images.map((img, idx) => (
              <button
                key={img.src}
                className={`jogo-lightbox__thumb${idx === current ? " jogo-lightbox__thumb--active" : ""}`}
                onClick={() => setCurrent(idx)}
                aria-label={`Ver ${img.alt}`}
              >
                <img src={img.src} alt={img.alt} loading="lazy" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// ─── Componente principal ─────────────────────────────────────────────────────

const JogoDaVida: React.FC = () => {
  const [activeKey, setActiveKey] = useState("tabuleiro");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeGame = GAMES.find((g) => g.key === activeKey)!;

  const handleGameChange = (key: string) => {
    setLightboxIndex(null);
    setActiveKey(key);
  };

  return (
    <div className="jogo-da-vida" id="jogo-da-vida">
      <section className="jogo-da-vida__content" data-aos="fade-up">

        {/* ── Cabeçalho ── */}
        <div className="jogo-da-vida__header">
          <div className="jogo-da-vida__sup">
            <img src={logo} alt="Logo Promoção 3D" />
            <span className="jogo-da-vida__suptitle">Jogo da vida</span>
          </div>
          <h2 className="jogo-da-vida__title">
            Você já conhece os Jogos da Vida da Promoção 3D?
          </h2>
        </div>

        {/* ── Corpo ── */}
        <div className="jogo-da-vida__body">

          {/* Galeria */}
          <div className="jogo-da-vida__gallery">
            {activeGame.images.length > 0 ? (
              <>
                {/* Imagem principal */}
                <button
                  className="jogo-da-vida__featured"
                  onClick={() => setLightboxIndex(0)}
                  aria-label={`Ampliar ${activeGame.images[0].alt}`}
                >
                  <img
                    src={activeGame.images[0].src}
                    alt={activeGame.images[0].alt}
                    loading="lazy"
                  />
                  <span className="jogo-da-vida__featured-overlay">
                    <i className="bx bx-zoom-in" />
                  </span>
                </button>

                {/* Thumbnails */}
                {activeGame.images.length > 1 && (
                  <div className="jogo-da-vida__thumbs">
                    {activeGame.images.slice(1).map((img, idx) => (
                      <button
                        key={img.src}
                        className="jogo-da-vida__thumb"
                        onClick={() => setLightboxIndex(idx + 1)}
                        aria-label={`Ampliar ${img.alt}`}
                      >
                        <img src={img.src} alt={img.alt} loading="lazy" />
                        <span className="jogo-da-vida__thumb-overlay">
                          <i className="bx bx-zoom-in" />
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="jogo-da-vida__empty">
                <i className="bx bx-time-five" />
                <p>Em breve</p>
              </div>
            )}
          </div>

          {/* Botões de seleção */}
          <div className="jogo-da-vida__filters">
            {GAMES.map((game) => (
              <button
                key={game.key}
                className={`jogo-da-vida__filter-btn${activeKey === game.key ? " jogo-da-vida__filter-btn--active" : ""}`}
                onClick={() => handleGameChange(game.key)}
              >
                {game.label}
                {game.images.length > 0 && (
                  <span className="jogo-da-vida__badge">{game.images.length}</span>
                )}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={activeGame.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

export default JogoDaVida;