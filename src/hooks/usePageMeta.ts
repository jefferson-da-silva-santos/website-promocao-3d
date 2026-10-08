import { useEffect } from "react";

const DEFAULT_TITLE = "Promoção 3D | Doação de sangue, órgãos e leite humano";

/**
 * Atualiza título e descrição da página em rotas internas da SPA.
 * As meta tags estáticas do `index.html` continuam valendo para robôs sem JavaScript.
 */
export function usePageMeta(title: string, description?: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = meta?.content;

    document.title = title;
    if (meta && description) meta.content = description;

    return () => {
      document.title = previousTitle || DEFAULT_TITLE;
      if (meta && previousDescription) meta.content = previousDescription;
    };
  }, [title, description]);
}
