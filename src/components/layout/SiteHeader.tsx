import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import BrandMark from "../ui/BrandMark";
import SmartLink from "../ui/SmartLink";
import { PRIMARY_NAV, SECONDARY_NAV } from "../../data/site";
import { useBodyLock, useKeyboard, useScrollSpy, useScrolledPast } from "../../hooks/useUiEffects";

/** Todas as seções da home entram no scrollspy, para o destaque não "grudar" em seções fora do menu. */
const SPY_IDS = [
  "hero",
  "sobre",
  "informacoes",
  "desvendando",
  "trilha",
  "jogo-da-vida",
  "expedicao",
  "material",
  "contato",
];

/**
 * Header fixo do site. Fica transparente no topo e ganha vidro fosco ao rolar.
 * Na home, destaca a seção visível (scrollspy); nas rotas, destaca a página atual.
 */
const SiteHeader: FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [sentinelRef, scrolled] = useScrolledPast<HTMLDivElement>();
  const activeSection = useScrollSpy(SPY_IDS, isHome);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  useBodyLock(open);
  useKeyboard({ Escape: () => setOpen(false) }, open);

  // Fecha o menu ao trocar de rota.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (open) firstLinkRef.current?.focus();
    else if (document.activeElement?.closest(".mobile-menu")) toggleRef.current?.focus();
  }, [open]);

  const isActive = (href: string): boolean =>
    href.startsWith("#") ? isHome && activeSection === href.slice(1) : pathname.startsWith(href);

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />

      <header className={`site-header${scrolled || !isHome ? " is-solid" : ""}${open ? " is-open" : ""}`}>
        <div className="site-header__inner">
          <Link to="/" className="site-header__brand" aria-label="Promoção 3D, página inicial">
            <BrandMark size={30} />
            <span className="site-header__wordmark">
              Promoção <strong>3D</strong>
            </span>
          </Link>

          <nav className="site-header__nav" aria-label="Principal">
            <ul>
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <SmartLink
                    href={item.href}
                    className="site-header__link"
                    aria-current={isActive(item.href) ? (item.href.startsWith("#") ? "true" : "page") : undefined}
                  >
                    {item.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <Link to="/agente" className="btn btn--primary btn--sm site-header__cta">
              Agente IA
              <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="icon-btn site-header__toggle"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <div id={menuId} className={`mobile-menu${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Menu móvel" className="mobile-menu__panel">
          <ul className="mobile-menu__primary">
            {PRIMARY_NAV.map((item, index) => (
              <li key={item.href} style={{ "--i": index } as CSSProperties}>
                <SmartLink
                  href={item.href}
                  ref={index === 0 ? firstLinkRef : undefined}
                  onNavigate={() => setOpen(false)}
                >
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>
          <ul className="mobile-menu__secondary">
            {SECONDARY_NAV.map((item) => (
              <li key={item.href}>
                <SmartLink href={item.href} onNavigate={() => setOpen(false)}>
                  {item.label}
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="mobile-menu__scrim"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          tabIndex={-1}
        />
      </div>
    </>
  );
};

export default SiteHeader;
