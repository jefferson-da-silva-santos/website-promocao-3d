import { useEffect, useState } from "react";
import type { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, LinkSimple, WhatsappLogo } from "@phosphor-icons/react";
import PageShell from "../layout/PageShell";
import { useBlog } from "../../contexts/BlogContext";
import { usePageMeta } from "../../hooks/usePageMeta";
import { formatDate } from "../../utils/format";

/** Leitura de um artigo do blog, com compartilhamento e sugestões de leitura. */
const BlogPostPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts, isLoading } = useBlog();
  const [copied, setCopied] = useState(false);
  const post = posts.find((p) => p.id === id);

  usePageMeta(post ? `${post.title} | Blog Promoção 3D` : "Blog | Promoção 3D", post?.subtitle);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  if (isLoading) {
    return (
      <PageShell className="article">
        <div className="container article__inner" aria-busy="true">
          <span className="skeleton skeleton--line skeleton--tiny" />
          <span className="skeleton skeleton--title" />
          <span className="skeleton skeleton--line" />
          <span className="skeleton article__cover-skeleton" />
        </div>
      </PageShell>
    );
  }

  if (!post) {
    return (
      <PageShell className="article">
        <div className="container article__inner empty-state">
          <h1 className="page-title">Artigo não encontrado.</h1>
          <p>Ele pode ter sido removido ou o endereço está incorreto.</p>
          <Link to="/blog" className="btn btn--primary">
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            Voltar ao blog
          </Link>
        </div>
      </PageShell>
    );
  }

  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <PageShell className="article">
      <article className="container article__inner">
        <nav className="breadcrumb" aria-label="Você está em">
          <Link to="/blog">Blog</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{post.category}</span>
        </nav>

        <header className="article__head">
          <h1 className="article__title">{post.title}</h1>
          <p className="article__subtitle">{post.subtitle}</p>
          <div className="article__byline">
            <span className="avatar avatar--lg" aria-hidden="true">
              {post.author.charAt(0).toUpperCase()}
            </span>
            <span>
              <strong>{post.author}</strong>
              <small>
                {post.createdAt && <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>} ·{" "}
                {post.readTime} min de leitura
              </small>
            </span>
          </div>
        </header>

        <figure className="article__cover">
          <img src={post.coverImage} alt={post.title} />
        </figure>

        <div className="article__content">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <footer className="article__share">
          <span>Compartilhar</span>
          <a
            className="icon-btn icon-btn--lg"
            href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${window.location.href}`)}`}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Compartilhar no WhatsApp"
          >
            <WhatsappLogo size={20} aria-hidden="true" />
          </a>
          <button
            type="button"
            className="icon-btn icon-btn--lg"
            onClick={() => void copyLink()}
            aria-label="Copiar link do artigo"
          >
            {copied ? (
              <Check size={20} weight="bold" aria-hidden="true" />
            ) : (
              <LinkSimple size={20} aria-hidden="true" />
            )}
          </button>
          <span className="article__copied" aria-live="polite">
            {copied ? "Link copiado" : ""}
          </span>
        </footer>
      </article>

      {related.length > 0 && (
        <section className="container related" aria-labelledby="related-title">
          <h2 className="section-title section-title--sm" id="related-title">
            Continue lendo
          </h2>
          <ul className="related__list">
            {related.map((r) => (
              <li key={r.id}>
                <Link to={`/blog/${r.id}`} className="related__item">
                  <img src={r.coverImage} alt="" loading="lazy" />
                  <span>
                    <small>{r.category}</small>
                    <strong>{r.title}</strong>
                    <small>{r.readTime} min</small>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </PageShell>
  );
};

export default BlogPostPage;
