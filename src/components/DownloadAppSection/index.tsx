// Página de download do app Memória e Vida (jogo da memória educativo da Promoção 3D).

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { FC } from "react";
import { createPortal } from "react-dom";
import {
  Buildings,
  ChartBar,
  CheckCircle,
  DownloadSimple,
  Drop,
  FirstAidKit,
  GearSix,
  HandHeart,
  House,
  Info,
  LockKey,
  Medal,
  ShieldCheck,
  ShieldWarning,
  Stack,
  Trophy,
  WifiSlash,
  X,
  Cards,
  GameController,
  BookOpenText,
  DeviceMobile,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import PageShell from "../layout/PageShell";
import { APP_SCREENS } from "./appScreens";
import { useBodyLock, useKeyboard, usePrefersReducedMotion } from "../../hooks/useUiEffects";
import { usePageMeta } from "../../hooks/usePageMeta";

interface Props {
  readonly downloadUrl?: string;
}

type Tone = "warning" | "safe" | "info" | "neutral";

const WARNINGS: ReadonlyArray<{ icon: Icon; title: string; text: string; tone: Tone }> = [
  {
    icon: ShieldWarning,
    title: "Aviso de segurança do Android",
    text: "Ao instalar, o Android pode exibir “App de fonte desconhecida”. Isso é normal para APKs distribuídos fora da Play Store.",
    tone: "warning",
  },
  {
    icon: ShieldCheck,
    title: "App seguro e testado",
    text: "Desenvolvido por pesquisadores da UPE e testado extensivamente. Não contém vírus, malware ou código malicioso.",
    tone: "safe",
  },
  {
    icon: Buildings,
    title: "Política pública educativa",
    text: "Integra a Promoção 3D (Lei 18.359/2023), política pública do Estado de Pernambuco para educação em saúde.",
    tone: "info",
  },
  {
    icon: GearSix,
    title: "Como instalar",
    text: "Abra o .apk após baixar. Se solicitado: Configurações, Segurança, “Instalar de fontes desconhecidas”.",
    tone: "neutral",
  },
];

/** Descrição de cada tela do carrossel. */
const SCREEN_INFO: Record<string, { icon: Icon; desc: string; tone: "sangue" | "orgaos" | "leite" | "ink" }> = {
  Login: { icon: LockKey, desc: "Cadastro rápido com nome e senha, sem e-mail ou dados sensíveis.", tone: "ink" },
  Home: { icon: House, desc: "Escolha entre os três temas e veja seu placar na tela inicial.", tone: "ink" },
  "Doação de Sangue": {
    icon: Drop,
    desc: "24 cards sobre tipos sanguíneos, mitos e requisitos para doação.",
    tone: "sangue",
  },
  "Vitória!": { icon: Trophy, desc: "Tela de parabéns com pontuação, tempo e avaliação em estrelas.", tone: "ink" },
  "Doação de Órgãos": {
    icon: FirstAidKit,
    desc: "Aprenda sobre órgãos, tecidos e mitos sobre transplantes.",
    tone: "orgaos",
  },
  "Doação de Leite": {
    icon: HandHeart,
    desc: "Benefícios do leite materno, Bancos de Leite e amamentação segura.",
    tone: "leite",
  },
  Placar: { icon: ChartBar, desc: "Ranking geral e histórico pessoal por tema e pontuação.", tone: "ink" },
  Privacidade: { icon: ShieldCheck, desc: "Política de privacidade e exclusão de conta direto pelo app.", tone: "ink" },
};

const STATS: ReadonlyArray<{ icon: Icon; value: string; label: string }> = [
  { icon: Stack, value: "3", label: "temas" },
  { icon: Cards, value: "72", label: "cards" },
  { icon: Trophy, value: "Ranking", label: "e histórico" },
  { icon: WifiSlash, value: "Offline", label: "sem internet" },
];

const FEATURES: ReadonlyArray<{ icon: Icon; text: string }> = [
  { icon: GameController, text: "3 jogos temáticos com 24 cards cada" },
  { icon: Trophy, text: "Ranking e histórico de pontuações" },
  { icon: BookOpenText, text: "Conteúdo educativo validado pela UPE" },
  { icon: WifiSlash, text: "Funciona offline, sem internet" },
];

const AUTOPLAY_MS = 3400;

// ─── Modal de confirmação ────────────────────────────────────────────────────

interface DownloadModalProps {
  readonly onClose: () => void;
  readonly onConfirm: () => void;
  readonly downloading: boolean;
}

const DownloadModal: FC<DownloadModalProps> = ({ onClose, onConfirm, downloading }) => {
  const titleId = useId();
  const confirmRef = useRef<HTMLButtonElement | null>(null);

  useBodyLock(true);
  useKeyboard({ Escape: onClose });

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    confirmRef.current?.focus();
    return () => previous?.focus();
  }, []);

  return createPortal(
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="modal__scrim" aria-label="Fechar" tabIndex={-1} onClick={onClose} />
      <div className="modal__panel">
        <header className="modal__head">
          <img src="/iconApp.png" alt="" width={48} height={48} />
          <div>
            <h2 id={titleId}>Baixar Memória e Vida</h2>
            <p>Leia as informações antes de instalar.</p>
          </div>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar">
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <ul className="modal__body">
          {WARNINGS.map(({ icon: IconCmp, title, text, tone }) => (
            <li key={title} className={`warning warning--${tone}`}>
              <IconCmp size={22} weight="fill" aria-hidden="true" />
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="modal__meta">
          <span>
            <DeviceMobile size={14} aria-hidden="true" /> Android 6.0+
          </span>
          <span>~25 MB</span>
          <span>Versão 1.0</span>
          <span>Offline</span>
        </p>

        <footer className="modal__foot">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancelar
          </button>
          <button
            ref={confirmRef}
            type="button"
            className="btn btn--primary"
            onClick={onConfirm}
            disabled={downloading}
          >
            {downloading ? (
              <>
                <span className="spinner" aria-hidden="true" />
                Iniciando download
              </>
            ) : (
              <>
                <DownloadSimple size={18} weight="bold" aria-hidden="true" />
                Confirmar e baixar
              </>
            )}
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  );
};

// ─── Página ──────────────────────────────────────────────────────────────────

const DownloadAppSection: FC<Props> = ({ downloadUrl = "/download/app" }) => {
  usePageMeta(
    "App Memória e Vida | Promoção 3D",
    "Baixe o Memória e Vida, jogo da memória educativo da Promoção 3D sobre doação de sangue, órgãos e leite humano. Android, gratuito e offline.",
  );

  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const total = APP_SCREENS.length;

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);

  useEffect(() => {
    if (reduced || paused || modalOpen) return;
    const timer = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [reduced, paused, modalOpen, next]);

  const handleDownload = () => {
    setDownloading(true);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "MemoriaEVida.apk";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => setDownloading(false), 3000);
  };

  const screen = APP_SCREENS[active];
  const info = SCREEN_INFO[screen.label] ?? { icon: DeviceMobile, desc: screen.desc, tone: "ink" as const };
  const InfoIcon = info.icon;

  return (
    <PageShell className="app-page">
      <section className="app-hero" aria-labelledby="app-title">
        <div className="hero__grid-bg" aria-hidden="true" />
        <div className="container app-hero__grid">
          <div className="app-hero__copy">
            <p className="eyebrow">Disponível para Android</p>
            <div className="app-hero__brand">
              <img src="/iconApp.png" alt="" width={64} height={64} />
              <h1 className="page-title" id="app-title">
                Memória <em>e Vida</em>
              </h1>
            </div>
            <p className="lead">
              Um jogo da memória educativo que ensina sobre doação de sangue, órgãos e leite humano. Feito para
              professores, estudantes e ações escolares em Pernambuco.
            </p>

            <ul className="app-hero__features">
              {FEATURES.map(({ icon: IconCmp, text }) => (
                <li key={text}>
                  <IconCmp size={20} aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>

            <div className="app-hero__actions">
              <button type="button" className="btn btn--primary btn--lg" onClick={() => setModalOpen(true)}>
                <DownloadSimple size={20} weight="bold" aria-hidden="true" />
                Baixar APK
              </button>
              <a className="btn btn--ghost btn--lg" href="/privacy" target="_blank" rel="noreferrer noopener">
                <ShieldCheck size={20} aria-hidden="true" />
                Privacidade
              </a>
            </div>

            <p className="app-hero__law">
              <Info size={16} aria-hidden="true" />
              Criado no âmbito da Lei 18.359/2023, a Promoção 3D de Pernambuco.
            </p>
          </div>

          <div
            className="app-hero__device"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="phone">
              <div className="phone__notch" aria-hidden="true" />
              <div className="phone__screen">
                <img key={active} src={screen.src} alt={`Tela do app: ${screen.label}`} draggable={false} />
              </div>
            </div>

            <div className={`screen-card screen-card--${info.tone}`} aria-live="polite">
              <span className="screen-card__icon" aria-hidden="true">
                <InfoIcon size={22} weight="fill" />
              </span>
              <div>
                <small>Tela atual</small>
                <strong>{screen.label}</strong>
                <p>{info.desc}</p>
              </div>
            </div>

            <div className="screen-dots" role="group" aria-label="Telas do aplicativo">
              {APP_SCREENS.map((s, i) => (
                <button
                  key={s.label}
                  type="button"
                  aria-pressed={i === active}
                  aria-label={s.label}
                  title={s.label}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section app-details" aria-labelledby="install-title">
        <div className="container app-details__grid">
          <dl className="figures figures--app" data-aos="fade-up">
            {STATS.map(({ icon: IconCmp, value, label }) => (
              <div key={label}>
                <dt>
                  <IconCmp size={16} aria-hidden="true" /> {label}
                </dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="install" data-aos="fade-up" data-aos-delay="80">
            <h2 className="section-title section-title--sm" id="install-title">
              Instale em quatro passos.
            </h2>
            <ol className="install__steps">
              <li>
                Toque em <strong>Baixar APK</strong>.
              </li>
              <li>Abra o arquivo no Android.</li>
              <li>Permita a instalação de fonte desconhecida, se o sistema pedir.</li>
              <li>Escolha um tema e comece a jogar.</li>
            </ol>
            <button type="button" className="btn btn--primary" onClick={() => setModalOpen(true)}>
              <DownloadSimple size={18} weight="bold" aria-hidden="true" />
              Baixar agora
            </button>
          </div>

          <p className="upe-badge" data-aos="fade-up" data-aos-delay="120">
            <Medal size={22} weight="fill" aria-hidden="true" />
            <span>
              <strong>Universidade de Pernambuco</strong>
              Projeto acadêmico validado pelo PPGE/UPE
            </span>
            <CheckCircle size={20} weight="fill" aria-hidden="true" />
          </p>
        </div>
      </section>

      {modalOpen && (
        <DownloadModal onClose={() => setModalOpen(false)} onConfirm={handleDownload} downloading={downloading} />
      )}
    </PageShell>
  );
};

export default DownloadAppSection;
