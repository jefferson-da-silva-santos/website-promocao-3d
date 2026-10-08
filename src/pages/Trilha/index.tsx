import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";
import { Check, Play } from "@phosphor-icons/react";
import { TRAIL } from "./videos";
import type { TrailChapter, TrailVideo } from "./videos";
import { safeStorage } from "../../hooks/useUiEffects";

const STORAGE_KEY = "p3d:trilha:assistidos";

interface FlatVideo extends TrailVideo {
  readonly chapter: TrailChapter;
  readonly order: number;
}

const FLAT: readonly FlatVideo[] = TRAIL.flatMap((chapter) => chapter.videos.map((v) => ({ ...v, chapter }))).map(
  (v, order) => ({ ...v, order }),
);

const thumbOf = (video: TrailVideo): string | null =>
  video.source.kind === "youtube" ? `https://i.ytimg.com/vi/${video.source.id}/hqdefault.jpg` : null;

// ─── Player com fachada leve ─────────────────────────────────────────────────

interface PlayerProps {
  readonly video: FlatVideo;
  readonly onStart: () => void;
}

/**
 * Mostra a capa do vídeo e só carrega o iframe do YouTube no clique:
 * a página não paga o custo de quatro players de terceiros no carregamento.
 */
const Player: FC<PlayerProps> = ({ video, onStart }) => {
  const [playing, setPlaying] = useState(false);
  const { source } = video;

  if (source.kind === "file") {
    return (
      <div className="player">
        <video key={source.src} className="player__media" controls preload="metadata" onPlay={onStart}>
          <source src={source.src} type="video/mp4" />
          Seu navegador não reproduz este vídeo.
        </video>
      </div>
    );
  }

  return (
    <div className="player">
      {playing ? (
        <iframe
          className="player__media"
          src={`https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          className="player__facade"
          onClick={() => {
            setPlaying(true);
            onStart();
          }}
          aria-label={`Assistir: ${video.title}`}
        >
          <img src={`https://i.ytimg.com/vi/${source.id}/maxresdefault.jpg`} alt="" loading="lazy" />
          <span className="player__play" aria-hidden="true">
            <Play size={28} weight="fill" />
          </span>
        </button>
      )}
    </div>
  );
};

// ─── Caminho SVG que liga as estações ────────────────────────────────────────

interface TrailPathProps {
  readonly points: ReadonlyArray<readonly [number, number]>;
  readonly progressIndex: number;
  readonly width: number;
  readonly height: number;
}

/** Curva suave entre pontos verticais: cada trecho é uma cúbica em "S". */
const buildPath = (pts: ReadonlyArray<readonly [number, number]>): string =>
  pts.reduce((d, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = pts[i - 1];
    const my = (py + y) / 2;
    return `${d} C ${px} ${my}, ${x} ${my}, ${x} ${y}`;
  }, "");

const TrailPath: FC<TrailPathProps> = ({ points, progressIndex, width, height }) => {
  const progressRef = useRef<SVGPathElement | null>(null);
  const d = useMemo(() => buildPath(points), [points]);
  const partial = useMemo(() => buildPath(points.slice(0, progressIndex + 1)), [points, progressIndex]);
  const [dash, setDash] = useState({ total: 0, done: 0 });

  useLayoutEffect(() => {
    const el = progressRef.current;
    if (!el || points.length < 2) return;
    const total = el.getTotalLength();
    const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
    probe.setAttribute("d", partial);
    setDash({ total, done: progressIndex === 0 ? 0 : probe.getTotalLength() });
  }, [d, partial, points.length, progressIndex]);

  if (points.length < 2) return null;

  return (
    <svg className="trail__path" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <path d={d} className="trail__path-base" />
      <path
        ref={progressRef}
        d={d}
        className="trail__path-progress"
        style={{ strokeDasharray: `${dash.done} ${dash.total}` }}
      />
    </svg>
  );
};

// ─── Seção ───────────────────────────────────────────────────────────────────

/**
 * Trilha audiovisual: os vídeos viram estações de um percurso.
 * O visitante avança clicando nas estações; as já assistidas ficam marcadas.
 */
const Trilha: FC = () => {
  const [current, setCurrent] = useState(0);
  const [watched, setWatched] = useState<ReadonlySet<string>>(
    () => new Set(safeStorage.get<string[]>(STORAGE_KEY, [])),
  );
  const listRef = useRef<HTMLDivElement | null>(null);
  const markerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [geometry, setGeometry] = useState<{ points: Array<[number, number]>; w: number; h: number }>({
    points: [],
    w: 0,
    h: 0,
  });

  const video = FLAT[current];

  const markWatched = useCallback(() => {
    setWatched((prev) => {
      if (prev.has(video.id)) return prev;
      const next = new Set(prev).add(video.id);
      safeStorage.set(STORAGE_KEY, [...next]);
      return next;
    });
  }, [video.id]);

  // Mede o centro de cada marcador para desenhar a curva da trilha.
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const measure = () => {
      const box = container.getBoundingClientRect();
      const points = markerRefs.current
        .filter((el): el is HTMLSpanElement => el !== null)
        .map((el): [number, number] => {
          const r = el.getBoundingClientRect();
          return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2];
        });
      setGeometry({ points, w: box.width, h: box.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  const progressCount = watched.size;

  return (
    <section className="section trail-section" id="trilha" aria-labelledby="trilha-title">
      <span id="audiencia" className="anchor-alias" aria-hidden="true" />
      <span id="resultados" className="anchor-alias" aria-hidden="true" />

      <div className="container">
        <header className="trail-section__head" data-aos="fade-up">
          <p className="eyebrow">Trilha em vídeo</p>
          <h2 className="section-title" id="trilha-title">
            Da audiência pública ao <em>Congresso Nacional.</em>
          </h2>
          <p className="trail-section__progress" aria-live="polite">
            <span className="progress-dots" aria-hidden="true">
              {FLAT.map((v) => (
                <span key={v.id} className={watched.has(v.id) ? "is-done" : undefined} />
              ))}
            </span>
            {progressCount === 0
              ? "Comece pela primeira estação."
              : `${progressCount} de ${FLAT.length} vídeos assistidos.`}
          </p>
        </header>

        <div className="trail-layout">
          <div className="trail-stage" data-aos="fade-up">
            <Player key={video.id} video={video} onStart={markWatched} />
            <div className="trail-stage__info">
              <span className="trail-stage__chapter">{video.chapter.title}</span>
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          </div>

          <div className="trail" ref={listRef}>
            <TrailPath points={geometry.points} progressIndex={current} width={geometry.w} height={geometry.h} />

            {TRAIL.map((chapter) => (
              <div key={chapter.id} className="trail__chapter">
                <div className="trail__chapter-head">
                  <h3>{chapter.title}</h3>
                  <p>{chapter.summary}</p>
                </div>
                <ol className="trail__stops">
                  {chapter.videos.map((v) => {
                    const flat = FLAT.find((f) => f.id === v.id);
                    if (!flat) return null;
                    const isCurrent = flat.order === current;
                    const isDone = watched.has(v.id);
                    const thumb = thumbOf(v);
                    return (
                      <li key={v.id} className={`stop${isCurrent ? " is-current" : ""}${isDone ? " is-done" : ""}`}>
                        <button
                          type="button"
                          className="stop__btn"
                          onClick={() => setCurrent(flat.order)}
                          aria-current={isCurrent ? "step" : undefined}
                        >
                          <span
                            className="stop__marker"
                            ref={(el) => {
                              markerRefs.current[flat.order] = el;
                            }}
                            aria-hidden="true"
                          >
                            {isDone ? <Check size={14} weight="bold" /> : flat.order + 1}
                          </span>
                          <span className="stop__thumb" aria-hidden="true">
                            {thumb ? <img src={thumb} alt="" loading="lazy" /> : <Play size={20} weight="fill" />}
                          </span>
                          <span className="stop__text">
                            <strong>{v.title}</strong>
                            <small>{isCurrent ? "No player agora" : isDone ? "Assistido" : "Assistir"}</small>
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trilha;
