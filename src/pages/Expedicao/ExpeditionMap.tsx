import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, FC, KeyboardEvent } from "react";
import {
  GRE_BORDERS,
  GRE_REGION_PATHS,
  MAP_HEIGHT,
  MAP_WIDTH,
  MUNICIPAL_BORDERS,
  NORONHA,
  STATE_OUTLINE,
  VISITED_MUNICIPALITIES,
} from "./data/pernambucoMap";
import { STOPS } from "./data/expedition";
import type { Macro, Stop } from "./data/expedition";

// ─── Geometria derivada (calculada uma única vez) ────────────────────────────

interface Pin {
  readonly key: string;
  readonly stopIndex: number;
  readonly municipality: string;
  readonly x: number;
  readonly y: number;
  readonly macro: Macro;
  readonly inset: boolean;
}

const POINT_BY_CITY = new Map<string, readonly [number, number]>(
  VISITED_MUNICIPALITIES.map((m) => [m.name, [m.cx, m.cy] as const]),
);
POINT_BY_CITY.set("Fernando de Noronha", [NORONHA.cx, NORONHA.cy]);

/** Um pino por município de cada parada; paradas no mesmo município são afastadas lateralmente. */
const PINS: readonly Pin[] = (() => {
  const seen = new Map<string, number>();
  const pins: Pin[] = [];
  STOPS.forEach((stop, stopIndex) => {
    const cities = [...new Set(stop.visits.map((v) => v.municipality))];
    cities.forEach((city) => {
      const point = POINT_BY_CITY.get(city);
      if (!point) return;
      const repeat = seen.get(city) ?? 0;
      seen.set(city, repeat + 1);
      pins.push({
        key: `${stop.id}-${city}`,
        stopIndex,
        municipality: city,
        x: point[0] + repeat * 15,
        y: point[1] - repeat * 9,
        macro: stop.macro,
        inset: city === "Fernando de Noronha",
      });
    });
  });
  return pins;
})();

/** Pontos do percurso na ordem do roteiro (a ilha fica fora da linha terrestre). */
const ROUTE = PINS.filter((p) => !p.inset);
const ROUTE_D = ROUTE.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

const MACRO_OF_REGION = new Map<string, Macro>(STOPS.map((s) => [s.region, s.macro]));
const VISITED_CITY_MACRO = new Map<string, Macro>(
  STOPS.flatMap((s) => s.visits.map((v) => [v.municipality, s.macro] as const)),
);

// ─── Câmera ──────────────────────────────────────────────────────────────────

interface Camera {
  readonly x: number;
  readonly y: number;
  readonly scale: number;
}

const IDENTITY: Camera = { x: 0, y: 0, scale: 1 };

/** Enquadra a região da parada; regiões pequenas (litoral) recebem mais zoom. */
function frameRegion(box: DOMRect, pins: readonly Pin[]): Camera {
  const xs = [box.x, box.x + box.width, ...pins.map((p) => p.x)];
  const ys = [box.y, box.y + box.height, ...pins.map((p) => p.y)];
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const w = Math.max(maxX - minX, 40);
  const h = Math.max(maxY - minY, 40);
  const scale = Math.min(Math.max(Math.min((MAP_WIDTH * 0.5) / w, (MAP_HEIGHT * 0.62) / h), 1), 2.8);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const x = Math.min(0, Math.max(MAP_WIDTH - MAP_WIDTH * scale, MAP_WIDTH / 2 - cx * scale));
  const y = Math.min(0, Math.max(MAP_HEIGHT - MAP_HEIGHT * scale, MAP_HEIGHT / 2 - cy * scale));
  return { x, y, scale };
}

// ─── Componente ──────────────────────────────────────────────────────────────

interface ExpeditionMapProps {
  readonly activeIndex?: number;
  readonly onSelect?: (index: number) => void;
  /** Aproxima a câmera da região ativa. */
  readonly zoom?: boolean;
  /** Versão decorativa, sem interação (usada na home). */
  readonly preview?: boolean;
  readonly className?: string;
}

/**
 * Mapa vetorial de Pernambuco com as 16 GREs, os municípios visitados e o percurso
 * da expedição. A linha do roteiro se desenha até a parada selecionada.
 */
const ExpeditionMap: FC<ExpeditionMapProps> = ({
  activeIndex = -1,
  onSelect,
  zoom = false,
  preview = false,
  className,
}) => {
  const regionRefs = useRef(new Map<string, SVGPathElement>());
  const routeRef = useRef<SVGPathElement | null>(null);
  const [camera, setCamera] = useState<Camera>(IDENTITY);
  const [routeDash, setRouteDash] = useState({ total: 0, done: 0 });
  const [hover, setHover] = useState<Pin | null>(null);
  const active: Stop | undefined = STOPS[activeIndex];

  // Comprimento do percurso até a última cidade da parada ativa.
  const lastRouteIndex = useMemo(() => {
    let last = -1;
    ROUTE.forEach((p, i) => {
      if (p.stopIndex <= activeIndex) last = i;
    });
    return last;
  }, [activeIndex]);

  useLayoutEffect(() => {
    const el = routeRef.current;
    if (!el) return;
    const total = el.getTotalLength();
    if (lastRouteIndex <= 0) {
      setRouteDash({ total, done: preview ? total : 0 });
      return;
    }
    const probe = document.createElementNS("http://www.w3.org/2000/svg", "path");
    probe.setAttribute(
      "d",
      ROUTE.slice(0, lastRouteIndex + 1)
        .map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`)
        .join(" "),
    );
    setRouteDash({ total, done: probe.getTotalLength() });
  }, [lastRouteIndex, preview]);

  useLayoutEffect(() => {
    if (!zoom || !active) {
      setCamera(IDENTITY);
      return;
    }
    const region = regionRefs.current.get(active.region);
    if (!region) return;
    const pins = PINS.filter((p) => p.stopIndex === activeIndex && !p.inset);
    setCamera(frameRegion(region.getBBox(), pins));
  }, [zoom, active, activeIndex]);

  const select = (index: number) => {
    if (!preview) onSelect?.(index);
  };

  const onPinKey = (event: KeyboardEvent<SVGGElement>, index: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select(index);
    }
  };

  const renderPin = (pin: Pin) => {
    const isActive = pin.stopIndex === activeIndex;
    const isPast = activeIndex >= 0 && pin.stopIndex < activeIndex;
    const label = `${pin.stopIndex + 1}. ${STOPS[pin.stopIndex].name}, ${pin.municipality}`;
    return (
      <g
        key={pin.key}
        className={`pe-pin pe-pin--${pin.macro}${isActive ? " is-active" : ""}${isPast ? " is-past" : ""}`}
        transform={`translate(${pin.x} ${pin.y})`}
        role={preview ? undefined : "button"}
        tabIndex={preview ? undefined : 0}
        aria-label={preview ? undefined : label}
        aria-pressed={preview ? undefined : isActive}
        onClick={() => select(pin.stopIndex)}
        onKeyDown={(e) => onPinKey(e, pin.stopIndex)}
        onPointerEnter={() => setHover(pin)}
        onPointerLeave={() => setHover(null)}
        onFocus={() => setHover(pin)}
        onBlur={() => setHover(null)}
      >
        <g className="pe-pin__body">
          {isActive && <circle className="pe-pin__pulse" r="16" />}
          <circle className="pe-pin__dot" r="10" />
          <text className="pe-pin__num" dy="3.6">
            {pin.stopIndex + 1}
          </text>
        </g>
      </g>
    );
  };

  const cameraStyle = {
    transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.scale})`,
    "--map-scale": camera.scale,
  } as CSSProperties;

  return (
    <div className={["pe-map", preview ? "pe-map--preview" : "", className].filter(Boolean).join(" ")}>
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="pe-map__svg"
        role={preview ? "img" : "group"}
        aria-label="Mapa de Pernambuco com as Gerências Regionais de Educação visitadas pela expedição"
      >
        <g className="pe-map__camera" style={cameraStyle}>
          {Object.entries(GRE_REGION_PATHS).map(([id, d]) => {
            const macro = MACRO_OF_REGION.get(id) ?? "litoral";
            const isActive = active?.region === id;
            return (
              <path
                key={id}
                ref={(el) => {
                  if (el) regionRefs.current.set(id, el);
                }}
                d={d}
                className={`pe-map__region pe-map__region--${macro}${isActive ? " is-active" : ""}`}
                onClick={() => {
                  const index = STOPS.findIndex((s) => s.region === id);
                  if (index >= 0) select(index);
                }}
              />
            );
          })}

          <path d={MUNICIPAL_BORDERS} className="pe-map__muni-borders" />
          {VISITED_MUNICIPALITIES.map((m) => (
            <path
              key={m.name}
              d={m.d}
              className={`pe-map__city pe-map__city--${VISITED_CITY_MACRO.get(m.name) ?? "litoral"}`}
            />
          ))}
          <path d={GRE_BORDERS} className="pe-map__gre-borders" />
          <path d={STATE_OUTLINE} className="pe-map__outline" />

          <path d={ROUTE_D} className="pe-map__route-base" />
          <path
            ref={routeRef}
            d={ROUTE_D}
            className="pe-map__route"
            style={{ strokeDasharray: `${routeDash.done} ${routeDash.total}` }}
          />

          {PINS.filter((p) => !p.inset).map(renderPin)}
        </g>

        {/* Arquipélago fora da câmera: o recorte continua visível com qualquer zoom. */}
        <g className="pe-map__inset">
          <rect x={NORONHA.box.x} y={NORONHA.box.y} width={NORONHA.box.w} height={NORONHA.box.h} rx="8" />
          <text x={NORONHA.box.x + 8} y={NORONHA.box.y + NORONHA.box.h - 7}>
            Fernando de Noronha
          </text>
          <path d={NORONHA.d} className="pe-map__city pe-map__city--litoral" />
          {PINS.filter((p) => p.inset).map(renderPin)}
        </g>
      </svg>

      {!preview && hover && (
        <div
          className="pe-map__tip"
          style={{
            left: `${((hover.inset ? hover.x : hover.x * camera.scale + camera.x) / MAP_WIDTH) * 100}%`,
            top: `${((hover.inset ? hover.y : hover.y * camera.scale + camera.y) / MAP_HEIGHT) * 100}%`,
          }}
          aria-hidden="true"
        >
          <strong>{hover.municipality}</strong>
          <span>{STOPS[hover.stopIndex].name}</span>
        </div>
      )}
    </div>
  );
};

export default ExpeditionMap;
