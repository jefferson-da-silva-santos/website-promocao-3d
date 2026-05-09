// src/pages/AdminBlog.tsx
// ─────────────────────────────────────────────────────────────────────────────
//  Painel Admin do Blog — Promoção 3D
//  Auth: POST /api/admin/login (SHA-256) → token → AdminContext
//  Blog CRUD: /api/blog (leitura pública, escrita com x-admin-token)
//  Estilo: classes .admin-* e .blog-* existentes no SCSS do projeto
// ─────────────────────────────────────────────────────────────────────────────

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../contexts/AdminContext";
import { useBlog } from "../../contexts/BlogContext";
import type { CreatePostInput } from "../../contexts/BlogContext";
import logo from "../../assets/image/logo.png";

// ─── Categorias ───────────────────────────────────────────────────────────────

const CATEGORIES = ["Doação de Sangue", "Doação de Leite", "Doação de Órgãos"];

// ─────────────────────────────────────────────────────────────────────────────
//  LOGIN SCREEN
// ─────────────────────────────────────────────────────────────────────────────

const LoginScreen: React.FC = () => {
  const { login, loginError, clearLoginError, isAuthenticated } = useAdmin();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const MAX_ATTEMPTS = 5;
  const LOCKOUT_MS = 5 * 60 * 1000;

  const isLocked = lockedUntil !== null && Date.now() < lockedUntil;
  const remaining = isLocked ? Math.ceil((lockedUntil! - Date.now()) / 1000) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLocked || !password.trim()) return;

    clearLoginError();
    setLoading(true);
    // delay anti-timing
    await new Promise(r => setTimeout(r, 350));

    try {
      await login(password);
    } catch {
      const next = attempts + 1;
      setAttempts(next);
      if (next >= MAX_ATTEMPTS) {
        setLockedUntil(Date.now() + LOCKOUT_MS);
      }
      setPassword("");
      inputRef.current?.focus();
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return null;

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
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                disabled={isLocked || loading}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="admin-login__eye"
                onClick={() => setShowPass(v => !v)}
                aria-label={showPass ? "Ocultar" : "Mostrar"}
              >
                <i className={`bx ${showPass ? "bx-hide" : "bx-show"}`} />
              </button>
            </div>
          </div>

          {loginError && !isLocked && (
            <div className="admin-login__error">
              <i className="bx bx-error-circle" />
              {loginError}
              {attempts > 0 && ` (${MAX_ATTEMPTS - attempts} tentativa(s) restante(s))`}
            </div>
          )}

          {isLocked && (
            <div className="admin-login__lockout">
              <i className="bx bx-time" /> Bloqueado. Aguarde {remaining}s
            </div>
          )}

          <button
            type="submit"
            className="admin-login__btn"
            disabled={isLocked || loading}
          >
            {loading ? <span className="admin-login__spinner" /> : <><i className="bx bx-log-in" /> Entrar</>}
          </button>
        </form>

        <div className="admin-login__security">
          <i className="bx bx-shield-check" />
          <span>Autenticação via API · SHA-256</span>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  EDITOR
// ─────────────────────────────────────────────────────────────────────────────

const AdminEditor: React.FC = () => {
  const { logout, token } = useAdmin();
  const { posts, addPost, updatePost, deletePost } = useBlog();
  const navigate = useNavigate();

  const [tab, setTab] = useState<"list" | "new" | "edit">("list");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState("");

  const emptyForm = {
    title: "", subtitle: "", content: "",
    author: "Eliabe Pereira", category: CATEGORIES[0],
    cover_image: "", published: true,
  };

  const [form, setForm] = useState(emptyForm);
  const [formErrors, setFormErrors] = useState<Partial<typeof form>>({});

  const setField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm(prev => ({ ...prev, [name]: val }));
    if (formErrors[name as keyof typeof form]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCoverUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setForm(prev => ({ ...prev, cover_image: url }));
    setCoverPreview(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const result = ev.target?.result as string;
      setForm(prev => ({ ...prev, cover_image: result }));
      setCoverPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const openEdit = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    setForm({
      title: post.title,
      subtitle: post.subtitle,
      content: post.content,
      author: post.author,
      category: post.category,
      cover_image: post.cover_image,
      published: post.published,
    });
    setCoverPreview(post.cover_image);
    setEditingId(id);
    setTab("edit");
  };

  const validate = (): boolean => {
    const errors: Partial<typeof form> = {};
    if (!form.title.trim()) errors.title = "Título obrigatório.";
    if (!form.subtitle.trim()) errors.subtitle = "Subtítulo obrigatório.";
    if (form.content.trim().length < 100) errors.content = "Conteúdo: mínimo 100 caracteres.";
    if (!form.cover_image.trim()) errors.cover_image = "Imagem obrigatória.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePublish = async () => {
    if (!validate() || !token) return;
    setSubmitting(true); setApiError(null);
    try {
      const input: CreatePostInput = { ...form };
      if (tab === "edit" && editingId) {
        await updatePost(token, editingId, input);
        setSuccess("Artigo atualizado!");
      } else {
        await addPost(token, input);
        setSuccess("Artigo publicado!");
      }
      setForm(emptyForm); setCoverPreview(""); setEditingId(null);
      setTab("list");
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setApiError(err?.response?.data?.error ?? "Erro ao salvar o artigo.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deletePost(token, id);
      setSuccess("Artigo removido.");
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setApiError("Erro ao remover.");
    }
    setDeleteConfirm(null);
  };

  const handleLogout = async () => {
    await logout();
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("pt-BR");

  const readEst = (text: string) =>
    Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));

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
            <button className="admin-header__view-btn" onClick={() => navigate("/blog")}>
              <i className="bx bx-link-external" /> Ver blog
            </button>
            <button className="admin-header__view-btn" onClick={() => navigate("/admin-dash")}>
              <i className="bx bx-grid-alt" /> Dashboard
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
            {[
              { key: "list", icon: "bx-list-ul", label: `Posts publicados`, badge: posts.length },
              { key: "new", icon: "bx-plus-circle", label: "Novo artigo" },
            ].map(t => (
              <button
                key={t.key}
                className={`admin-tab${tab === t.key || (tab === "edit" && t.key === "new") ? " admin-tab--active" : ""}`}
                onClick={() => { setTab(t.key as any); setEditingId(null); setForm(emptyForm); setCoverPreview(""); }}
              >
                <i className={`bx ${t.icon}`} />
                {t.label}
                {t.badge != null && <span className="admin-tab__badge">{t.badge}</span>}
              </button>
            ))}
          </div>

          {/* Feedback */}
          {success && (
            <div className="admin-success">
              <i className="bx bx-check-circle" /> {success}
            </div>
          )}
          {apiError && (
            <div className="admin-login__error" style={{ marginBottom: '1rem' }}>
              <i className="bx bx-error-circle" /> {apiError}
            </div>
          )}

          {/* ── Lista ── */}
          {tab === "list" && (
            <div className="admin-list">
              {posts.length === 0 ? (
                <div className="admin-empty">
                  <i className="bx bx-file-blank admin-empty__icon" />
                  <p>Nenhum artigo publicado ainda.</p>
                </div>
              ) : posts.map(post => (
                <div key={post.id} className="admin-post-row">
                  <img src={post.cover_image} alt={post.title} className="admin-post-row__thumb" />
                  <div className="admin-post-row__info">
                    <span className="admin-post-row__cat">{post.category}</span>
                    <h3 className="admin-post-row__title">{post.title}</h3>
                    <span className="admin-post-row__meta">
                      {fmtDate(post.created_at)} · {post.read_time} min
                      {!post.published && <span style={{ color: '#d97706', marginLeft: '.5rem' }}>· Rascunho</span>}
                    </span>
                  </div>
                  <div className="admin-post-row__actions">
                    <button className="admin-post-row__view" onClick={() => navigate(`/blog/${post.id}`)} title="Ver"><i className="bx bx-show" /></button>
                    <button className="admin-post-row__view" onClick={() => openEdit(post.id)} title="Editar" style={{ color: '#d97706', borderColor: '#d97706' }}><i className="bx bx-edit" /></button>
                    <button className="admin-post-row__delete" onClick={() => setDeleteConfirm(post.id)} title="Excluir"><i className="bx bx-trash" /></button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Editor (novo ou edição) ── */}
          {(tab === "new" || tab === "edit") && (
            <div className="admin-editor">
              {tab === "edit" && (
                <p style={{ fontSize: '.82rem', color: '#9ca3af', marginBottom: '1rem' }}>
                  <i className="bx bx-edit" /> Editando artigo existente
                </p>
              )}
              <div className="admin-editor__grid">
                {/* Coluna principal */}
                <div className="admin-editor__main">
                  {/* Título */}
                  <div className="admin-field">
                    <label className="admin-field__label">Título *</label>
                    <input className={`admin-field__input${formErrors.title ? " admin-field__input--error" : ""}`}
                      name="title" value={form.title} onChange={setField}
                      placeholder="Ex: A importância da doação de sangue" maxLength={120} />
                    {formErrors.title && <span className="admin-field__error">{formErrors.title}</span>}
                    <span className="admin-field__count">{form.title.length}/120</span>
                  </div>

                  {/* Subtítulo */}
                  <div className="admin-field">
                    <label className="admin-field__label">Subtítulo *</label>
                    <input className={`admin-field__input${formErrors.subtitle ? " admin-field__input--error" : ""}`}
                      name="subtitle" value={form.subtitle} onChange={setField}
                      placeholder="Um resumo breve e atrativo" maxLength={180} />
                    {formErrors.subtitle && <span className="admin-field__error">{formErrors.subtitle}</span>}
                    <span className="admin-field__count">{form.subtitle.length}/180</span>
                  </div>

                  {/* Conteúdo */}
                  <div className="admin-field">
                    <label className="admin-field__label">
                      Conteúdo *
                      <span className="admin-field__hint">Separe parágrafos com linha em branco</span>
                    </label>
                    <textarea className={`admin-field__textarea${formErrors.content ? " admin-field__input--error" : ""}`}
                      name="content" value={form.content} onChange={setField}
                      placeholder="Escreva o artigo aqui..." rows={18} />
                    {formErrors.content && <span className="admin-field__error">{formErrors.content}</span>}
                    <span className="admin-field__count">
                      {form.content.length} caracteres · ~{readEst(form.content)} min de leitura
                    </span>
                  </div>
                </div>

                {/* Sidebar */}
                <aside className="admin-editor__sidebar">
                  {/* Publicar */}
                  <div className="admin-sidebar-card">
                    <h4 className="admin-sidebar-card__title">Publicar</h4>

                    <div className="admin-field">
                      <label className="admin-field__label">Autor</label>
                      <input className="admin-field__input" name="author" value={form.author} onChange={setField} />
                    </div>

                    <div className="admin-field">
                      <label className="admin-field__label">Categoria</label>
                      <select className="admin-field__select" name="category" value={form.category} onChange={setField}>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div className="admin-field" style={{ flexDirection: 'row', alignItems: 'center', gap: '.75rem' }}>
                      <input type="checkbox" id="pub-check" name="published"
                        checked={form.published as unknown as boolean}
                        onChange={e => setForm(p => ({ ...p, published: e.target.checked }))}
                        style={{ width: 16, height: 16, cursor: 'pointer' }} />
                      <label htmlFor="pub-check" className="admin-field__label" style={{ marginBottom: 0, cursor: 'pointer' }}>
                        Publicar imediatamente
                      </label>
                    </div>

                    {apiError && (
                      <div className="admin-login__error" style={{ fontSize: '.78rem' }}>
                        <i className="bx bx-error-circle" /> {apiError}
                      </div>
                    )}

                    <button className="admin-publish-btn" onClick={handlePublish} disabled={submitting}>
                      {submitting
                        ? <><span className="admin-login__spinner" style={{ marginRight: '.5rem' }} /> Salvando…</>
                        : <><i className={`bx ${tab === "edit" ? "bx-save" : "bx-send"}`} /> {tab === "edit" ? "Salvar alterações" : "Publicar artigo"}</>}
                    </button>
                  </div>

                  {/* Capa */}
                  <div className="admin-sidebar-card">
                    <h4 className="admin-sidebar-card__title">Imagem de capa *</h4>
                    {coverPreview && (
                      <div className="admin-cover-preview">
                        <img src={coverPreview} alt="Preview" />
                        <button className="admin-cover-preview__remove"
                          onClick={() => { setForm(p => ({ ...p, cover_image: '' })); setCoverPreview(''); }}
                          aria-label="Remover"><i className="bx bx-x" /></button>
                      </div>
                    )}
                    <div className="admin-field">
                      <label className="admin-field__label">URL da imagem</label>
                      <input
                        className={`admin-field__input${formErrors.cover_image ? " admin-field__input--error" : ""}`}
                        value={form.cover_image.startsWith('data:') ? '' : form.cover_image}
                        onChange={handleCoverUrl}
                        placeholder="https://..." />
                    </div>
                    <div className="admin-cover-divider"><span>ou</span></div>
                    <label className="admin-upload-btn">
                      <i className="bx bx-upload" /> Fazer upload
                      <input type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
                    </label>
                    {formErrors.cover_image && (
                      <span className="admin-field__error">{formErrors.cover_image}</span>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modal exclusão */}
      {deleteConfirm && (
        <div className="admin-modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal__icon"><i className="bx bx-trash" /></div>
            <h3 className="admin-modal__title">Excluir artigo?</h3>
            <p className="admin-modal__desc">Essa ação não pode ser desfeita.</p>
            <div className="admin-modal__actions">
              <button className="admin-modal__cancel" onClick={() => setDeleteConfirm(null)}>Cancelar</button>
              <button className="admin-modal__confirm" onClick={() => handleDelete(deleteConfirm)}>Sim, excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
//  PÁGINA PRINCIPAL (guard)
// ─────────────────────────────────────────────────────────────────────────────

const AdminPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="admin-login__spinner" style={{ width: 32, height: 32 }} />
      </div>
    );
  }

  return isAuthenticated ? <AdminEditor /> : <LoginScreen />;
};

export default AdminPage;