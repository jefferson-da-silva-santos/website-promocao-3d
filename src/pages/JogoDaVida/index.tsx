import { useState } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowsOut, DeviceMobile, Hourglass } from "@phosphor-icons/react";
import Lightbox from "../../components/Lightbox";
import type { LightboxImage } from "../../components/Lightbox";

const BASE_URL =
  "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/Promocao3D/jogos";

interface Game {
  readonly key: string;
  readonly label: string;
  readonly images: readonly LightboxImage[];
}

const GAMES: readonly Game[] = [
  {
    key: "tabuleiro",
    label: "Tabuleiro da Vida",
    images: [
      {
        src: `${BASE_URL}/tabuleiro%20da%20vida/tabuleiro.jpeg`,
        alt: "Tabuleiro da Vida, jogo de tabuleiro da Promoção 3D",
      },
    ],
  },
  {
    key: "memoria",
    label: "Memória da Vida",
    images: [
      { src: `${BASE_URL}/memoria%20da%20vida/memoria.jpeg`, alt: "Memória da Vida, jogo da memória da Promoção 3D" },
    ],
  },
  { key: "trilha", label: "Trilha da Vida", images: [] },
  { key: "passa", label: "Passa ou Repassa da Vida", images: [] },
  { key: "roda", label: "Roda da Vida", images: [] },
  { key: "cartas", label: "Cartas da Vida", images: [] },
];

/** Os Jogos da Vida: seletor em fita horizontal e palco amplo com a imagem do jogo. */
const JogoDaVida: FC = () => {
  const [activeKey, setActiveKey] = useState(GAMES[0].key);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const game = GAMES.find((g) => g.key === activeKey) ?? GAMES[0];
  const ready = game.images.length > 0;

  return (
    <section className="section games" id="jogo-da-vida" aria-labelledby="jogos-title">
      <div className="container">
        <h2 className="section-title games__title" id="jogos-title" data-aos="fade-up">
          Aprender jogando: os <em>Jogos da Vida.</em>
        </h2>

        <div className="games__picker" role="group" aria-label="Escolha um jogo" data-aos="fade-up" data-aos-delay="60">
          {GAMES.map((g, i) => (
            <button
              key={g.key}
              type="button"
              className="game-pill"
              aria-pressed={g.key === activeKey}
              onClick={() => {
                setActiveKey(g.key);
                setLightboxIndex(null);
              }}
            >
              <span className="game-pill__num">{String(i + 1).padStart(2, "0")}</span>
              <span className="game-pill__name">{g.label}</span>
              {g.images.length === 0 && <span className="game-pill__soon">Em breve</span>}
            </button>
          ))}
        </div>

        <div className="games__stage" data-aos="fade-up" data-aos-delay="100">
          {ready ? (
            <button type="button" className="games__featured" onClick={() => setLightboxIndex(0)} key={game.key}>
              <img src={game.images[0].src} alt={game.images[0].alt} loading="lazy" />
              <span className="games__zoom">
                <ArrowsOut size={18} weight="bold" aria-hidden="true" />
                Ver em tela cheia
              </span>
            </button>
          ) : (
            <div className="games__empty" key={game.key}>
              <Hourglass size={32} aria-hidden="true" />
              <p>
                <strong>{game.label}</strong> está em produção pela equipe da pesquisa.
              </p>
              <span>As imagens do jogo aparecem aqui assim que forem publicadas.</span>
            </div>
          )}

          <Link to="/app" className="games__app">
            <img src="/iconApp.png" alt="" width={48} height={48} />
            <span>
              <small>
                <DeviceMobile size={14} weight="bold" aria-hidden="true" /> Também no celular
              </small>
              <strong>App Memória e Vida</strong>
            </span>
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {lightboxIndex !== null && ready && (
        <Lightbox
          images={game.images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          label={game.label}
        />
      )}
    </section>
  );
};

export default JogoDaVida;
