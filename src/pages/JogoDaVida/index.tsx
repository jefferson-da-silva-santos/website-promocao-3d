import React, { useCallback, useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import { c, dots, inner, section } from "../../theme";

const BASE_URL =
  "https://raw.githubusercontent.com/jefferson-da-silva-santos/imagens-projetos/refs/heads/main/Promocao3D/jogos";

interface GameImage { src: string; alt: string; }
interface GameData { key: string; label: string; images: GameImage[]; }

const GAMES: GameData[] = [
  { key: "tabuleiro", label: "Tabuleiro da Vida", images: [{ src: `${BASE_URL}/tabuleiro%20da%20vida/tabuleiro.jpeg`, alt: "Tabuleiro da Vida" }] },
  { key: "memoria", label: "Memória da Vida", images: [{ src: `${BASE_URL}/memoria%20da%20vida/memoria.jpeg`, alt: "Memória da Vida" }] },
  { key: "trilha", label: "Trilha da Vida", images: [] },
  { key: "passa", label: "Passa ou Repassa da Vida", images: [] },
  { key: "roda", label: "Roda da Vida", images: [] },
  { key: "cartas", label: "Cartas da Vida", images: [] },
];

const Lightbox: React.FC<{ images: GameImage[]; startIndex: number; onClose: () => void }> = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
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
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Visualizar imagem"
      style={{ position: "fixed", inset: 0, zIndex: 9000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(22, 19, 15, 0.88)" }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ maxWidth: "min(1000px, 92vw)", background: c.paper, border: `3px solid ${c.ink}`, borderRadius: 20, boxShadow: `12px 12px 0 ${c.green}`, overflow: "hidden" }}>
        <img src={images[current].src} alt={images[current].alt} style={{ display: "block", width: "100%", maxHeight: "72vh", objectFit: "contain", background: c.white }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "14px 18px", borderTop: `2px solid ${c.ink}` }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: c.ink }}>{images[current].alt}</span>
          <span style={{ fontSize: 12.5, color: c.muted }}>{current + 1}&nbsp;/&nbsp;{images.length}</span>
        </div>
      </div>

      <button onClick={onClose} aria-label="Fechar" style={{ position: "absolute", top: 20, right: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", background: c.ink, color: c.paper, border: `2px solid ${c.paper}`, cursor: "pointer" }}>
        <i className="bx bx-x" style={{ fontSize: 24 }} />
      </button>

      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Imagem anterior" style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: c.paper, color: c.ink, border: `2px solid ${c.ink}`, cursor: "pointer" }}>
            <i className="bx bxs-chevron-left" style={{ fontSize: 22 }} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Próxima imagem" style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: c.paper, color: c.ink, border: `2px solid ${c.ink}`, cursor: "pointer" }}>
            <i className="bx bxs-chevron-right" style={{ fontSize: 22 }} />
          </button>
        </>
      )}
    </div>
  );
};

const JogoDaVida: React.FC = () => {
  const [activeKey, setActiveKey] = useState("tabuleiro");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeGame = GAMES.find((g) => g.key === activeKey)!;
  const featured = activeGame.images[0];

  return (
    <div className="jogo-da-vida" id="jogo-da-vida" style={section}>
      <div aria-hidden style={dots} />
      <section style={inner}>
        <SectionHeader
          label="Jogo da vida"
          title="Você já conhece os Jogos da Vida da Promoção 3D?"
          subtitle="Materiais lúdicos para trabalhar as três dimensões em sala de aula."
          align="center"
        />

        <div className="p3d-grid-2" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 320px)", gap: 44, alignItems: "start" }}>
          <div style={{ minWidth: 0, border: `3px solid ${c.ink}`, borderRadius: 18, boxShadow: `9px 9px 0 ${c.green}`, background: c.white, padding: 18 }}>
            {featured ? (
              <button onClick={() => setLightboxIndex(0)} aria-label={`Ampliar ${featured.alt}`} style={{ display: "block", width: "100%", padding: 0, border: "none", background: "none", cursor: "zoom-in" }}>
                <img src={featured.src} alt={featured.alt} loading="lazy" style={{ display: "block", width: "100%", height: "auto", border: `2px solid ${c.ink}`, borderRadius: 10 }} />
              </button>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 320, border: `2px dashed ${c.ink}`, borderRadius: 10, background: c.paper }}>
                <i className="bx bx-time-five" style={{ fontSize: 34, color: c.faint }} />
                <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: c.muted }}>Em breve</p>
              </div>
            )}
            <p style={{ margin: "14px 4px 2px", fontSize: 11.5, lineHeight: 1.5, color: c.faint }}>{featured ? featured.alt : "Em breve"}</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: c.muted }}>Escolha o jogo</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {GAMES.map((game) => {
                const active = game.key === activeKey;
                return (
                  <button
                    key={game.key}
                    onClick={() => { setLightboxIndex(null); setActiveKey(game.key); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, width: "100%",
                      textAlign: "left", cursor: "pointer", padding: "13px 15px", borderRadius: 12,
                      border: `2px solid ${c.ink}`, borderBottomWidth: active ? 2 : 4,
                      background: active ? c.ink : c.white,
                      color: active ? c.paper : c.ink,
                      fontSize: 14.5, fontWeight: 700, lineHeight: 1.35,
                      boxShadow: active ? `4px 4px 0 ${c.green}` : "none",
                    }}
                  >
                    <span style={{ flex: 1 }}>{game.label}</span>
                    <span style={{ flex: "none", fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 9px", borderRadius: 999, border: `2px solid ${active ? c.paper : c.ink}`, color: active ? c.paper : c.muted }}>
                      {game.images.length ? game.images.length : "em breve"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && featured && (
        <Lightbox images={activeGame.images} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </div>
  );
};

export default JogoDaVida;
