import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import logo from "../../assets/image/logo.png";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { posts } = useBlog();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="blog-page">
        <div className="blog-not-found">
          <h2>Artigo não encontrado.</h2>
          <button className="blog-back-btn" onClick={() => navigate("/blog")}>
            ← Voltar ao blog
          </button>
        </div>
      </div>
    );
  }

  // Outros posts para sugestão
  const related = posts.filter((p) => p.id !== post.id).slice(0, 3);

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
            <button onClick={() => navigate("/blog")}>Blog</button>
          </div>
        </div>
      </nav>

      {/* ── Artigo ── */}
      <main className="blog-post">

        {/* Breadcrumb */}
        <div className="blog-post__breadcrumb">
          <button onClick={() => navigate("/blog")}>Blog</button>
          <span>/</span>
          <span>{post.category}</span>
        </div>

        {/* Header do post */}
        <header className="blog-post__header">
          <span className="blog-post__category">{post.category}</span>
          <h1 className="blog-post__title">{post.title}</h1>
          <p className="blog-post__subtitle">{post.subtitle}</p>

          <div className="blog-post__info">
            <div className="blog-post__author">
              <div className="blog-post__author-avatar">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="blog-post__author-name">{post.author}</span>
                <span className="blog-post__author-role">Doutorando em Educação · UPE</span>
              </div>
            </div>

            <div className="blog-post__meta">
              <span>{formatDate(post.createdAt)}</span>
              <span className="blog-post__dot">·</span>
              <span>{post.readTime} min de leitura</span>
            </div>
          </div>
        </header>

        {/* Cover */}
        <div className="blog-post__cover">
          <img src={post.coverImage} alt={post.title} />
        </div>

        {/* Conteúdo */}
        <div className="blog-post__content">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Tags de partilha */}
        <div className="blog-post__share">
          <span>Compartilhar:</span>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`}
            target="_blank"
            rel="noreferrer"
            className="blog-post__share-btn blog-post__share-btn--whatsapp"
            aria-label="Compartilhar no WhatsApp"
          >
            <i className="bx bxl-whatsapp" />
          </a>
          <button
            className="blog-post__share-btn"
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            aria-label="Copiar link"
          >
            <i className="bx bx-link" />
          </button>
        </div>

        {/* Voltar */}
        <button className="blog-back-btn" onClick={() => navigate("/blog")}>
          ← Voltar ao blog
        </button>

        {/* Posts relacionados */}
        {related.length > 0 && (
          <section className="blog-post__related">
            <h3 className="blog-post__related-title">Continue lendo</h3>
            <div className="blog-post__related-grid">
              {related.map((r) => (
                <button
                  key={r.id}
                  className="blog-related-card"
                  onClick={() => {
                    navigate(`/blog/${r.id}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <img src={r.coverImage} alt={r.title} />
                  <div className="blog-related-card__body">
                    <span className="blog-related-card__cat">{r.category}</span>
                    <p className="blog-related-card__title">{r.title}</p>
                    <span className="blog-related-card__read">{r.readTime} min</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="blog-footer">
        <span>© {new Date().getFullYear()} Promoção 3D — Todos os direitos reservados</span>
      </footer>
    </div>
  );
};

export default BlogPostPage;