import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import type { BlogPost } from "../../contexts/BlogContext";
import logo from "../../assets/image/logo.png";
import Footer from "../../components/Footer";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const CATEGORIES = ["Todos", "Doação de Sangue", "Doação de Leite", "Doação de Órgãos"];

// ─── Sub-componentes ──────────────────────────────────────────────────────────

const PostCard: React.FC<{ post: BlogPost; featured?: boolean }> = ({
  post,
  featured = false,
}) => {
  const navigate = useNavigate();

  return (
    <article
      className={`blog-card${featured ? " blog-card--featured" : ""}`}
      onClick={() => navigate(`/blog/${post.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && navigate(`/blog/${post.id}`)}
    >
      <div className="blog-card__cover">
        <img src={post.coverImage} alt={post.title} loading="lazy" />
        <span className="blog-card__category">{post.category}</span>
      </div>

      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span className="blog-card__date">{post.createdAt && formatDate(post.createdAt)}</span>
          <span className="blog-card__dot">·</span>
          <span className="blog-card__read">{post.readTime} min de leitura</span>
        </div>

        <h2 className="blog-card__title">{post.title}</h2>
        <p className="blog-card__subtitle">{post.subtitle}</p>

        <div className="blog-card__author">
          <div className="blog-card__author-avatar">
            {post.author.charAt(0).toUpperCase()}
          </div>
          <span className="blog-card__author-name">{post.author}</span>
        </div>
      </div>
    </article>
  );
};

// ─── Página ───────────────────────────────────────────────────────────────────

const BlogPage: React.FC = () => {
  const { posts } = useBlog();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "Todos" || p.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="blog-page">

      {/* ── NavBar ── */}
      <nav className="blog-nav">
        <div className="blog-nav__inner">
          <button className="blog-nav__logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Promoção 3D" />
            <span>Promoção 3D</span>
          </button>

          <div className="blog-nav__links">
            <button onClick={() => navigate("/")}>Início</button>
            <button className="active">Blog</button>
          </div>
        </div>
      </nav>

      {/* ── Hero do blog ── */}
      <header className="blog-hero">
        <div className="blog-hero__inner">
          <p className="blog-hero__eyebrow">Artigos & Reflexões</p>
          <h1 className="blog-hero__title">Blog da Promoção 3D</h1>
          <p className="blog-hero__desc">
            Textos escritos por <strong>Eliabe Pereira</strong> sobre doação de
            sangue, leite materno, órgãos e políticas públicas de saúde.
          </p>

          {/* Search */}
          <div className="blog-search">
            <i className="bx bx-search blog-search__icon" />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search__input"
            />
            {searchQuery && (
              <button
                className="blog-search__clear"
                onClick={() => setSearchQuery("")}
                aria-label="Limpar busca"
              >
                <i className="bx bx-x" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Filtros de categoria ── */}
      <div className="blog-filters">
        <div className="blog-filters__inner">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`blog-filter-btn${activeCategory === cat ? " blog-filter-btn--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Conteúdo ── */}
      <main className="blog-main">
        <div className="blog-main__inner">

          {filtered.length === 0 ? (
            <div className="blog-empty">
              <i className="bx bx-search-alt blog-empty__icon" />
              <p>Nenhum artigo encontrado para "<strong>{searchQuery}</strong>"</p>
            </div>
          ) : (
            <>
              {/* Post em destaque */}
              {featured && (
                <section className="blog-featured">
                  <PostCard post={featured} featured />
                </section>
              )}

              {/* Grid dos demais posts */}
              {rest.length > 0 && (
                <section className="blog-grid">
                  <h3 className="blog-grid__label">Mais artigos</h3>
                  <div className="blog-grid__cards">
                    {rest.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      {/* ── Footer ── */}
     <Footer />
    </div>
  );
};

export default BlogPage;