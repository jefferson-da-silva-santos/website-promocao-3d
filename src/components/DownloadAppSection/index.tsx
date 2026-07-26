// src/components/DownloadAppSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
//  Seção de download do app Memória e Vida
//  Layout: 3 colunas — texto | celular | painel lateral direito
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef, useCallback } from "react";
import { APP_SCREENS } from "./appScreens";

interface Props {
  downloadUrl?: string;
}

const WARNINGS = [
  {
    icon: "bx bx-shield-alt-2",
    title: "Aviso de segurança do Android",
    text: 'Ao instalar, o Android pode exibir "App de fonte desconhecida". Isso é normal para APKs distribuídos fora da Play Store.',
    color: "warning",
  },
  {
    icon: "bx bx-check-shield",
    title: "App seguro e testado",
    text: "Desenvolvido por pesquisadores da UPE, testado extensivamente. Não contém vírus, malware ou código malicioso.",
    color: "safe",
  },
  {
    icon: "bx bx-buildings",
    title: "Política pública educativa",
    text: "Integra a Promoção 3D (Lei 18.359/2023), política pública do Estado de Pernambuco para educação em saúde.",
    color: "info",
  },
  {
    icon: "bx bx-cog",
    title: "Como instalar",
    text: 'Abra o .apk após baixar. Se solicitado: Configurações → Segurança → "Instalar de fontes desconhecidas".',
    color: "neutral",
  },
];

// Cards exibidos no painel direito — descrição de cada tela do carrossel
const SCREEN_INFO: Record<string, { emoji: string; desc: string; color: string }> = {
  "Login":           { emoji: "🔐", desc: "Cadastro rápido com nome e senha. Sem e-mail ou dados sensíveis.", color: "teal" },
  "Home":            { emoji: "🏠", desc: "Escolha entre os 3 temas e veja seu placar na tela inicial.", color: "blue" },
  "Doação de Sangue":{ emoji: "🩸", desc: "24 cards sobre tipos sanguíneos, mitos e requisitos para doação.", color: "red" },
  "Vitória!":        { emoji: "🏆", desc: "Tela de parabéns com pontuação, tempo e avaliação em estrelas.", color: "amber" },
  "Doação de Órgãos":{ emoji: "💚", desc: "Aprenda sobre órgãos, tecidos e mitos sobre transplantes.", color: "green" },
  "Doação de Leite": { emoji: "🍼", desc: "Benefícios do leite materno, Bancos de Leite e amamentação segura.", color: "orange" },
  "Placar":          { emoji: "📊", desc: "Ranking global e histórico pessoal por tema e pontuação.", color: "purple" },
  "Privacidade":     { emoji: "🛡️", desc: "Acesso à política de privacidade e exclusão de conta pelo app.", color: "teal" },
};

// Stats fixas mostradas no painel
const STATS = [
  { icon: "bx bx-layer",    value: "3",    label: "Temas" },
  { icon: "bx bx-card",     value: "72",   label: "Cards" },
  { icon: "bx bx-trophy",   value: "∞",    label: "Partidas" },
  { icon: "bx bx-wifi-off", value: "100%", label: "Offline" },
];

const DownloadAppSection: React.FC<Props> = ({
  downloadUrl = "/download/app",
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = APP_SCREENS.length;

  const nextSlide = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveIdx((i) => (i + 1) % total);
      setIsAnimating(false);
    }, 350);
  }, [total]);

  const goTo = (idx: number) => {
    if (idx === activeIdx) return;
    setIsAnimating(true);
    setTimeout(() => { setActiveIdx(idx); setIsAnimating(false); }, 350);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 3200);
    return () => clearInterval(intervalRef.current!);
  }, [nextSlide]);

  useEffect(() => {
    if (modalOpen) clearInterval(intervalRef.current!);
    else intervalRef.current = setInterval(nextSlide, 3200);
    return () => clearInterval(intervalRef.current!);
  }, [modalOpen, nextSlide]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setModalOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleDownload = () => {
    setDownloading(true);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "MemoriaEVida.apk";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => setDownloading(false), 3000);
  };

  const current = APP_SCREENS[activeIdx];
  const screenInfo = SCREEN_INFO[current.label] ?? { emoji: "📱", desc: current.desc, color: "teal" };

  return (
    <>
      {/* ════════════════════════════════════════════════════
          SEÇÃO PRINCIPAL
      ════════════════════════════════════════════════════ */}
      <section className="app-download" id="download-app">

        <div className="app-download__bg" aria-hidden="true">
          <div className="app-download__orb app-download__orb--1" />
          <div className="app-download__orb app-download__orb--2" />
          <div className="app-download__orb app-download__orb--3" />
          <div className="app-download__grid" />
        </div>

        <div className="app-download__inner">

          {/* ─── Coluna esquerda: texto ─── */}
          <div className="app-download__left">
            <div className="app-download__badge">
              <span className="app-download__badge-dot" />
              <span>Disponível para Android</span>
            </div>

            <div className="app-download__brand">
              <img src="/iconApp.png" alt="Ícone Memória e Vida" className="app-download__icon" />
              <div>
                <h2 className="app-download__title">Memória<em> e Vida</em></h2>
                <p className="app-download__tagname">Promoção 3D · UPE</p>
              </div>
            </div>

            <p className="app-download__desc">
              Um <strong>jogo da memória educativo</strong> que ensina sobre doação de sangue,
              órgãos e leite humano de forma divertida e interativa. Ideal para professores,
              alunos e ações escolares em todo o Estado de Pernambuco.
            </p>

            <div className="app-download__pills">
              <span className="app-download__pill app-download__pill--red">🩸 Doação de Sangue</span>
              <span className="app-download__pill app-download__pill--green">💚 Doação de Órgãos</span>
              <span className="app-download__pill app-download__pill--amber">🍼 Leite Humano</span>
            </div>

            <ul className="app-download__features">
              {[
                ["bx bx-joystick",  "3 jogos temáticos com 24 cards cada"],
                ["bx bx-trophy",    "Ranking e histórico de pontuações"],
                ["bx bx-book-open", "Conteúdo educativo validado pela UPE"],
                ["bx bx-wifi-off",  "Funciona offline — sem internet"],
              ].map(([icon, text]) => (
                <li key={text} className="app-download__feature">
                  <i className={`${icon} app-download__feature-icon`} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            <div className="app-download__actions">
              <button className="app-download__btn-primary" onClick={() => setModalOpen(true)}>
                <i className="bx bx-download" />
                Baixar APK
              </button>
              <button className="app-download__btn-ghost" onClick={() => window.open("/privacy", "_blank")}>
                <i className="bx bx-shield" />
                Privacidade
              </button>
            </div>

            <p className="app-download__law-note">
              <i className="bx bx-info-circle" />
              Criado no âmbito da <strong>Lei 18.359/2023 — Promoção 3D</strong>, política pública de Pernambuco.
            </p>
          </div>

          {/* ─── Coluna central: celular ─── */}
          <div className="app-download__center">
            <div className="app-download__phone-wrap">
              <div className="app-download__phone-glow" aria-hidden="true" />

              <div className="app-download__phone">
                <div className="app-download__phone-notch" aria-hidden="true">
                  <div className="app-download__phone-camera" />
                </div>
                <div className="app-download__phone-screen">
                  <img
                    key={activeIdx}
                    src={current.src}
                    alt={current.label}
                    className={`app-download__screen-img${isAnimating ? " app-download__screen-img--out" : ""}`}
                    draggable={false}
                  />
                </div>
                <div className="app-download__phone-home" aria-hidden="true">
                  <div className="app-download__phone-bar" />
                </div>
              </div>

              <div className="app-download__screen-label">
                <i className="bx bx-mobile-alt" />
                <span>{current.label}</span>
              </div>

              <div className="app-download__dots" role="tablist" aria-label="Telas do aplicativo">
                {APP_SCREENS.map((s, i) => (
                  <button
                    key={i}
                    className={`app-download__dot${i === activeIdx ? " app-download__dot--active" : ""}`}
                    onClick={() => goTo(i)}
                    role="tab"
                    aria-selected={i === activeIdx}
                    aria-label={s.label}
                    title={s.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ─── Coluna direita: painel ─── */}
          <div className="app-download__right">

            {/* Card de tela atual */}
            <div className={`app-download__info-card app-download__info-card--${screenInfo.color}`}>
              <div className="app-download__info-card-top">
                <span className="app-download__info-card-emoji">{screenInfo.emoji}</span>
                <div>
                  <p className="app-download__info-card-screen">Tela atual</p>
                  <strong className="app-download__info-card-name">{current.label}</strong>
                </div>
              </div>
              <p className="app-download__info-card-desc">{screenInfo.desc}</p>
              <div className="app-download__info-card-progress">
                {APP_SCREENS.map((_, i) => (
                  <button
                    key={i}
                    className={`app-download__info-card-pip${i === activeIdx ? " app-download__info-card-pip--active" : ""}`}
                    onClick={() => goTo(i)}
                    aria-label={APP_SCREENS[i].label}
                  />
                ))}
              </div>
            </div>

            {/* Grid de stats */}
            <div className="app-download__stats">
              {STATS.map((s) => (
                <div key={s.label} className="app-download__stat">
                  <i className={`${s.icon} app-download__stat-icon`} />
                  <strong className="app-download__stat-value">{s.value}</strong>
                  <span className="app-download__stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Card de instalação */}
            <div className="app-download__install-card">
              <div className="app-download__install-card-header">
                <i className="bx bx-download" />
                <span>Instalação</span>
              </div>
              <ol className="app-download__install-steps">
                <li><span className="app-download__install-num">1</span>Clique em <strong>Baixar APK</strong></li>
                <li><span className="app-download__install-num">2</span>Abra o arquivo no Android</li>
                <li><span className="app-download__install-num">3</span>Permita fonte desconhecida se pedido</li>
                <li><span className="app-download__install-num">4</span>Aproveite o jogo!</li>
              </ol>
              <button className="app-download__install-btn" onClick={() => setModalOpen(true)}>
                <i className="bx bx-download" />
                Baixar agora
              </button>
            </div>

            {/* Badge UPE */}
            <div className="app-download__upe-badge">
              <i className="bx bx-medal" />
              <div>
                <strong>Universidade de Pernambuco</strong>
                <span>Projeto acadêmico validado · PPGE/UPE</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          MODAL
      ════════════════════════════════════════════════════ */}
      {modalOpen && (
        <div
          className="app-modal-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="app-modal-title"
        >
          <div className="app-modal">
            <div className="app-modal__header">
              <img src="/iconApp.png" alt="Ícone" className="app-modal__icon" />
              <div>
                <h3 id="app-modal-title" className="app-modal__title">Baixar Memória e Vida</h3>
                <p className="app-modal__subtitle">Leia as informações antes de instalar</p>
              </div>
              <button className="app-modal__close" onClick={() => setModalOpen(false)} aria-label="Fechar">
                <i className="bx bx-x" />
              </button>
            </div>

            <div className="app-modal__body">
              {WARNINGS.map((w, i) => (
                <div key={i} className={`app-modal__warning app-modal__warning--${w.color}`}>
                  <i className={`${w.icon} app-modal__warning-icon`} />
                  <div>
                    <strong className="app-modal__warning-title">{w.title}</strong>
                    <p className="app-modal__warning-text">{w.text}</p>
                  </div>
                </div>
              ))}
              <div className="app-modal__meta">
                <span><i className="bx bx-mobile-alt" /> Android 6.0+</span>
                <span><i className="bx bx-package" /> ~25 MB</span>
                <span><i className="bx bx-code-alt" /> Versão 1.0</span>
                <span><i className="bx bx-wifi-off" /> Offline</span>
              </div>
            </div>

            <div className="app-modal__footer">
              <button className="app-modal__btn-cancel" onClick={() => setModalOpen(false)}>Cancelar</button>
              <button
                className={`app-modal__btn-download${downloading ? " app-modal__btn-download--loading" : ""}`}
                onClick={handleDownload}
                disabled={downloading}
              >
                {downloading ? (
                  <><span className="app-modal__spinner" />Iniciando download…</>
                ) : (
                  <><i className="bx bx-download" />Confirmar e Baixar APK</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadAppSection;