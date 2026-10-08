import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

/**
 * Indica se a página saiu do topo, observando um sentinela com IntersectionObserver
 * (sem listener de scroll, sem re-render a cada quadro).
 */
export function useScrolledPast<T extends Element>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, scrolled];
}

/** Retorna o id da seção que ocupa o centro da viewport (scrollspy). */
export function useScrollSpy(ids: readonly string[], enabled = true): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!enabled) return;
    const sections = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [key, enabled]);

  return enabled ? active : null;
}

/** Trava a rolagem do documento enquanto um diálogo estiver aberto. */
export function useBodyLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const { overflow, paddingRight } = document.body.style;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [active]);
}

/** Registra atalhos de teclado enquanto `active` for verdadeiro. */
export function useKeyboard(handlers: Partial<Record<string, () => void>>, active = true): void {
  const latest = useRef(handlers);
  latest.current = handlers;

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      const handler = latest.current[event.key];
      if (handler) {
        event.preventDefault();
        handler();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);
}

/** Respeita a preferência do sistema por menos movimento. */
export function usePrefersReducedMotion(): boolean {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Leitura e escrita resilientes no localStorage (modo privado pode lançar exceção). */
export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* armazenamento indisponível: a interface continua funcionando sem persistir */
    }
  },
};
