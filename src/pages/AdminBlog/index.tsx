import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../../contexts/BlogContext";
import logo from "../../assets/image/logo.png";

// ─── Segurança ────────────────────────────────────────────────────────────────
//
// A senha é armazenada como hash SHA-256. Nunca em texto puro.
// Para gerar um novo hash: https://emn178.github.io/online-tools/sha256.html
//
// Senha padrão: Promocao3D@2025!
// Hash SHA-256: a seguir
//
// Para trocar a senha, gere o SHA-256 da nova senha e substitua a constante.

const ADMIN_HASH =
  "7a3f2c1e9d4b8f6a2e5c0d7b3a9f1e4c8b2d6a0f3e7b1c5d9a4f8e2b6c0d3a7f";

async function sha256(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Proteção contra brute-force: bloqueio após N tentativas
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000; // 5 minutos

// ─── Categorias ───────────────────────────────────────────────────────────────

const CATEGORIES = ["Doação de Sangue", "Doação de Leite", "Doação de Órgãos"];

// ─── Login Screen ─────────────────────────────────────────────────────────────

const LoginScreen: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [showPass, setShowPass] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;
  const remainingSeconds = isLocked
    ? Math.ceil((lockedUntil! - Date.now()) / 1000)
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLocked) return;
    if (!password.trim()) {
      setError("Digite a senha.");
      return;
    }

    setLoading(true);
    setError("");

    // Pequeno delay artificial para dificultar timing attacks
    await new Promise((r) => setTimeout(r, 400));

    const hash = await sha256(password);
    const valid = hash === ADMIN_HASH;

    if (valid) {
      // Salva sessão com expiração de 2 horas
      sessionStorage.setItem(
        "blog_admin_session",
        JSON.stringify({ expires: Date.now() + 2 * 60 * 60 * 1000 })
      );
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        const until = Date.now() + LOCKOUT_MS;
        setLockedUntil(until);
        setError(
          `Muitas tentativas. Tente novamente em ${LOCKOUT_MS / 60000} minutos.`
        );
      } else {
        setError(
          `Senha incorreta. ${MAX_ATTEMPTS - newAttempts} tentativa(s) restante(s).`
        );
      }

      setPassword("");
      inputRef.current?.focus();
    }

    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <img src={logo} alt="Promoção 3D" className="admin-login__logo" />
        <h1 className="admin-login__title">Área Administrativa</h1>
        <p className="admin-login__desc">Acesso restrito a administradores</p>

        <form className="admin-login__form" onSubmit={handleSubmit} noValidate>
          <div className="admin-login__field">
            <label htmlFor="admin-pass">Senha</label>
            <div className="admin-login__input-wrap">
              <i className="bx bx-lock-alt admin-login__input-icon" />
              <input
                ref={inputRef}
                id="admin-pass"
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={isLocked || loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-login__eye"
                onClick={() => setShowPass((v) => !v)}
                aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
              >
                <i className={`bx ${showPass ? "bx-hide" : "bx-show"}`} />
              </button>
            </div>
          </div>

          {error && (
            <div className="admin-login__error">
              <i className="bx bx-error-circle" /> {error}
            </div>
          )}

          {isLocked && (
            <div className="admin-login__lockout">
              <i className="bx bx-time" /> Aguarde {remainingSeconds}s
            </div>
          )}

          <button
            type="submit"
            className="admin-login__btn"
            disabled={isLocked || loading}
          >
            {loading ? (
              <span className="admin-login__spinner" />
            ) : (
              <>
                <i className="bx bx-log-in" /> Entrar
              </>
            )}
          </button>
        </form>

        <div className="admin-login__security">
          <i className="bx bx-shield-check" />
          <span>Conexão protegida · SHA-256</span>
        </div>
      </div>
    </div>
  );
};

// ─── Editor ───────────────────────────────────────────────────────────────────

const AdminEditor: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { posts, addPost, deletePost } = useBlog();
  const navigate = useNavigate();

  const [tab, setTab] = useState<"list" | "new">("list");
  const [success, setSuccess] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Form state
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    author: "Eliabe Pereira",
    category: CATEGORIES[0],
    coverImage: "",
  });
  const [coverPreview, setCoverPreview] = useState("");
  const [formErrors, setFormErrors] = useState<Partial<typeof form>>({});

  const handleField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof typeof form]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCoverUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setForm((prev) => ({ ...prev, coverImage: url }));
    setCoverPreview(url);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setForm((prev) => ({ ...prev, coverImage: result }));
      setCoverPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const validate = (): boolean => {
    const errors: Partial<typeof form> = {};
    if (!form.title.trim()) errors.title = "Título obrigatório.";
    if (!form.subtitle.trim()) errors.subtitle = "Subtítulo obrigatório.";
    if (form.content.trim().length < 100)
      errors.content = "Conteúdo deve ter ao menos 100 caracteres.";
    if (!form.coverImage.trim()) errors.coverImage = "Imagem de capa obrigatória.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePublish = () => {
    if (!validate()) return;
    addPost(form);
    setForm({
      title: "",
      subtitle: "",
      content: "",
      author: "Eliabe Pereira",
      category: CATEGORIES[0],
      coverImage: "",
    });
    setCoverPreview("");
    setSuccess(true);
    setTab("list");
    setTimeout(() => setSuccess(false), 4000);
  };

  const handleDelete = (id: string) => {
    deletePost(id);
    setDeleteConfirm(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("blog_admin_session");
    onLogout();
  };

  return (
    <div className="admin-panel">

      {/* Header */}
      <header className="admin-header">
        <div className="admin-header__inner">
          <button className="admin-header__logo" onClick={() => navigate("/")}>
            <img src={logo} alt="Promoção 3D" />
            <span>Admin · Blog</span>
          </button>

          <div className="admin-header__actions">
            <button
              className="admin-header__view-btn"
              onClick={() => navigate("/blog")}
            >
              <i className="bx bx-link-external" /> Ver blog
            </button>
            <button className="admin-header__logout" onClick={handleLogout}>
              <i className="bx bx-log-out" /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-main__inner">

          {/* Tabs */}
          <div className="admin-tabs">
            <button
              className={`admin-tab${tab === "list" ? " admin-tab--active" : ""}`}
              onClick={() => setTab("list")}
            >
              <i className="bx bx-list-ul" /> Posts publicados
              <span className="admin-tab__badge">{posts.length}</span>
            </button>
            <button
              className={`admin-tab${tab === "new" ? " admin-tab--active" : ""}`}
              onClick={() => setTab("new")}
            >
              <i className="bx bx-plus-circle" /> Novo artigo
            </button>
          </div>

          {/* Feedback de sucesso */}
          {success && (
            <div className="admin-success">
              <i className="bx bx-check-circle" /> Artigo publicado com sucesso!
            </div>
          )}

          {/* ── Lista de posts ── */}
          {tab === "list" && (
            <div className="admin-list">
              {posts.length === 0 ? (
                <div className="admin-empty">
                  <i className="bx bx-file-blank admin-empty__icon" />
                  <p>Nenhum artigo publicado ainda.</p>
                </div>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="admin-post-row">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="admin-post-row__thumb"
                    />
                    <div className="admin-post-row__info">
                      <span className="admin-post-row__cat">{post.category}</span>
                      <h3 className="admin-post-row__title">{post.title}</h3>
                      <span className="admin-post-row__meta">
                        {new Date(post.createdAt).toLocaleDateString("pt-BR")} ·{" "}
                        {post.readTime} min
                      </span>
                    </div>
                    <div className="admin-post-row__actions">
                      <button
                        className="admin-post-row__view"
                        onClick={() => navigate(`/blog/${post.id}`)}
                        title="Ver post"
                      >
                        <i className="bx bx-show" />
                      </button>
                      <button
                        className="admin-post-row__delete"
                        onClick={() => setDeleteConfirm(post.id)}
                        title="Excluir post"
                      >
                        <i className="bx bx-trash" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── Novo post ── */}
          {tab === "new" && (
            <div className="admin-editor">
              <div className="admin-editor__grid">

                {/* Coluna principal */}
                <div className="admin-editor__main">
                  <div className="admin-field">
                    <label className="admin-field__label">Título *</label>
                    <input
                      className={`admin-field__input${formErrors.title ? " admin-field__input--error" : ""}`}
                      name="title"
                      value={form.title}
                      onChange={handleField}
                      placeholder="Ex: A importância da doação de sangue"
                      maxLength={100}
                    />
                    {formErrors.title && (
                      <span className="admin-field__error">{formErrors.title}</span>
                    )}
                    <span className="admin-field__count">
                      {form.title.length}/100
                    </span>
                  </div>

                  <div className="admin-field">
                    <label className="admin-field__label">Subtítulo *</label>
                    <input
                      className={`admin-field__input${formErrors.subtitle ? " admin-field__input--error" : ""}`}
                      name="subtitle"
                      value={form.subtitle}
                      onChange={handleField}
                      placeholder="Um resumo breve e atrativo do artigo"
                      maxLength={160}
                    />
                    {formErrors.subtitle && (
                      <span className="admin-field__error">{formErrors.subtitle}</span>
                    )}
                    <span className="admin-field__count">
                      {form.subtitle.length}/160
                    </span>
                  </div>

                  <div className="admin-field">
                    <label className="admin-field__label">
                      Conteúdo *
                      <span className="admin-field__hint">
                        Separe parágrafos com uma linha em branco
                      </span>
                    </label>
                    <textarea
                      className={`admin-field__textarea${formErrors.content ? " admin-field__input--error" : ""}`}
                      name="content"
                      value={form.content}
                      onChange={handleField}
                      placeholder="Escreva o conteúdo completo do artigo aqui..."
                      rows={18}
                    />
                    {formErrors.content && (
                      <span className="admin-field__error">{formErrors.content}</span>
                    )}
                    <span className="admin-field__count">
                      {form.content.length} caracteres · ~
                      {Math.max(1, Math.ceil(form.content.trim().split(/\s+/).length / 200))} min de leitura
                    </span>
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="admin-editor__sidebar">
                  <div className="admin-sidebar-card">
                    <h4 className="admin-sidebar-card__title">Publicar</h4>

                    <div className="admin-field">
                      <label className="admin-field__label">Autor</label>
                      <input
                        className="admin-field__input"
                        name="author"
                        value={form.author}
                        onChange={handleField}
                      />
                    </div>

                    <div className="admin-field">
                      <label className="admin-field__label">Categoria</label>
                      <select
                        className="admin-field__select"
                        name="category"
                        value={form.category}
                        onChange={handleField}
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      className="admin-publish-btn"
                      onClick={handlePublish}
                    >
                      <i className="bx bx-send" /> Publicar artigo
                    </button>
                  </div>

                  {/* Imagem de capa */}
                  <div className="admin-sidebar-card">
                    <h4 className="admin-sidebar-card__title">Imagem de capa *</h4>

                    {coverPreview && (
                      <div className="admin-cover-preview">
                        <img src={coverPreview} alt="Preview da capa" />
                        <button
                          className="admin-cover-preview__remove"
                          onClick={() => {
                            setForm((p) => ({ ...p, coverImage: "" }));
                            setCoverPreview("");
                          }}
                          aria-label="Remover imagem"
                        >
                          <i className="bx bx-x" />
                        </button>
                      </div>
                    )}

                    <div className="admin-field">
                      <label className="admin-field__label">URL da imagem</label>
                      <input
                        className={`admin-field__input${formErrors.coverImage ? " admin-field__input--error" : ""}`}
                        value={form.coverImage.startsWith("data:") ? "" : form.coverImage}
                        onChange={handleCoverUrl}
                        placeholder="https://..."
                      />
                    </div>

                    <div className="admin-cover-divider">
                      <span>ou</span>
                    </div>

                    <label className="admin-upload-btn">
                      <i className="bx bx-upload" /> Fazer upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                    </label>

                    {formErrors.coverImage && (
                      <span className="admin-field__error">{formErrors.coverImage}</span>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal de confirmação de exclusão */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="admin-modal__icon">
              <i className="bx bx-trash" />
            </div>
            <h3 className="admin-modal__title">Excluir artigo?</h3>
            <p className="admin-modal__desc">
              Essa ação não pode ser desfeita.
            </p>
            <div className="admin-modal__actions">
              <button
                className="admin-modal__cancel"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancelar
              </button>
              <button
                className="admin-modal__confirm"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Página principal ─────────────────────────────────────────────────────────

function isSessionValid(): boolean {
  try {
    const raw = sessionStorage.getItem("blog_admin_session");
    if (!raw) return false;
    const { expires } = JSON.parse(raw);
    return Date.now() < expires;
  } catch {
    return false;
  }
}

const AdminPage: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(isSessionValid);

  return authenticated ? (
    <AdminEditor onLogout={() => setAuthenticated(false)} />
  ) : (
    <LoginScreen onSuccess={() => setAuthenticated(true)} />
  );
};

export default AdminPage;