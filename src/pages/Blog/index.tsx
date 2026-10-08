import { useDeferredValue, useMemo, useState } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowClockwise, ArrowRight, MagnifyingGlass, X } from "@phosphor-icons/react";
import PageShell from "../../components/layout/PageShell";
import { useBlog } from "../../contexts/BlogContext";
import type { BlogPost } from "../../contexts/BlogContext";
import { usePageMeta } from "../../hooks/usePageMeta";
import { formatDate } from "../../utils/format";

const CATEGORIES = ["Todos", "Doação de Sangue", "Doação de Leite", "Doação de Órgãos"] as const;
type Category = (typeof CATEGORIES)[number];

const DIM_BY_CATEGORY: Record<string, string> = {
  "Doação de Sangue": "sangue",
  "Doação de Leite": "leite",
  "Doação de Órgãos": "orgaos",
};

// ─── Cartão de artigo ────────────────────────────────────────────────────────

const PostCard: FC<{ readonly post: BlogPost; readonly featured?: boolean }> = ({ post, featured = false }) => (
  <article className={`post-card${featured ? " post-card--featured" : ""}`}>
    <Link to={`/blog/${post.id}`} className="post-card__link">
      <div className="post-card__cover">
        <img src={post.coverImage} alt="" loading={featured ? "eager" : "lazy"} />
      </div>
      <div className="post-card__body">
        <p className="post-card__meta">
          <span className={`post-cat post-cat--${DIM_BY_CATEGORY[post.category] ?? "leite"}`}>{post.category}</span>
          {post.createdAt && <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>}
        </p>
        <h2 className="post-card__title">{post.title}</h2>
        <p className="post-card__excerpt">{post.subtitle}</p>
        <p className="post-card__foot">
          <span>
            {post.author} · {post.readTime} min de leitura
          </span>
          <ArrowRight size={18} weight="bold" aria-hidden="true" />
        </p>
      </div>
    </Link>
  </article>
);

const PostSkeleton: FC = () => (
  <div className="post-card post-card--skeleton" aria-hidden="true">
    <span className="skeleton post-card__cover" />
    <div className="post-card__body">
      <span className="skeleton skeleton--line skeleton--tiny" />
      <span className="skeleton skeleton--title" />
      <span className="skeleton skeleton--line" />
      <span className="skeleton skeleton--line skeleton--short" />
    </div>
  </div>
);

// ─── Página ──────────────────────────────────────────────────────────────────

/** Blog com busca instantânea, filtro por dimensão e estados de carregamento, erro e vazio. */
const BlogPage: FC = () => {
  usePageMeta(
    "Blog | Promoção 3D",
    "Artigos de Eliabi Pereira sobre doação de sangue, leite materno, órgãos e políticas públicas de saúde e educação.",
  );
  const { posts, isLoading, error, refresh } = useBlog();
  const [category, setCategory] = useState<Category>("Todos");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return posts.filter((p) => {
      const matchCat = category === "Todos" || p.category === category;
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [posts, category, deferredQuery]);

  const [featured, ...rest] = filtered;

  return (
    <PageShell className="blog">
      <header className="page-head">
        <div className="container page-head__inner">
          <h1 className="page-title">
            Blog da <em>Promoção 3D</em>
          </h1>
          <p className="lead">
            Textos de <strong>Eliabi Pereira</strong> sobre doação de sangue, leite materno, órgãos e políticas públicas
            de saúde.
          </p>

          <div className="blog-tools">
            <label className="search">
              <MagnifyingGlass size={18} aria-hidden="true" />
              <span className="sr-only">Buscar artigos</span>
              <input
                type="search"
                placeholder="Buscar artigos"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button type="button" className="search__clear" onClick={() => setQuery("")} aria-label="Limpar busca">
                  <X size={16} weight="bold" aria-hidden="true" />
                </button>
              )}
            </label>

            <div className="filter-chips" role="group" aria-label="Filtrar por tema">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className="filter-chip"
                  aria-pressed={category === cat}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="container blog__content" aria-live="polite" aria-busy={isLoading}>
        {isLoading ? (
          <div className="post-grid">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        ) : error ? (
          <div className="empty-state">
            <p className="notice notice--danger">{error}</p>
            <button type="button" className="btn btn--outline" onClick={() => void refresh()}>
              <ArrowClockwise size={18} aria-hidden="true" />
              Tentar novamente
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <MagnifyingGlass size={32} aria-hidden="true" />
            <h2>{posts.length === 0 ? "Nenhum artigo publicado ainda." : "Nenhum artigo encontrado."}</h2>
            <p>
              {posts.length === 0
                ? "Os primeiros textos do blog aparecem aqui assim que forem publicados."
                : "Tente outro termo ou limpe o filtro de tema."}
            </p>
            {posts.length > 0 && (
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => {
                  setQuery("");
                  setCategory("Todos");
                }}
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <>
            {featured && <PostCard post={featured} featured />}
            {rest.length > 0 && (
              <div className="post-grid">
                {rest.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </PageShell>
  );
};

export default BlogPage;
