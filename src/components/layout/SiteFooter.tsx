import type { FC } from "react";
import { Link } from "react-router-dom";
import { ChatCircleDots, InstagramLogo, WhatsappLogo, YoutubeLogo } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import BrandMark from "../ui/BrandMark";
import SmartLink from "../ui/SmartLink";
import { LEGAL_MILESTONES, PRIMARY_NAV, RESEARCHERS, SECONDARY_NAV, SITE, SOCIAL_LINKS } from "../../data/site";
import type { SocialLink } from "../../data/site";

const SOCIAL_ICON: Record<SocialLink["label"], Icon> = {
  Instagram: InstagramLogo,
  WhatsApp: WhatsappLogo,
  YouTube: YoutubeLogo,
};

/** Rodapé institucional: lema, navegação, marcos legais, pesquisadores e créditos. */
const SiteFooter: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__motto container">
        <BrandMark size={56} />
        <p>
          Informar para conscientizar, conscientizar para sensibilizar e <em>sensibilizar para salvar vidas.</em>
        </p>
      </div>

      <div className="site-footer__grid container">
        <div className="site-footer__about">
          <Link to="/" className="site-footer__brand">
            Promoção <strong>3D</strong>
          </Link>
          <p>{SITE.tagline}</p>
          <a className="btn btn--outline btn--sm" href={SITE.chatbotUrl} target="_blank" rel="noreferrer noopener">
            <ChatCircleDots size={18} aria-hidden="true" />
            Conversar com o assistente
          </a>
          <ul className="site-footer__social" aria-label="Redes sociais">
            {SOCIAL_LINKS.map(({ label, href }) => {
              const IconCmp = SOCIAL_ICON[label];
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer noopener" aria-label={label} className="icon-btn">
                      <IconCmp size={20} aria-hidden="true" />
                    </a>
                  ) : (
                    <span
                      className="icon-btn is-disabled"
                      aria-label={`${label} (em breve)`}
                      title="Perfil oficial em breve"
                    >
                      <IconCmp size={20} aria-hidden="true" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="site-footer__col" aria-label="Rodapé">
          <h2 className="site-footer__title">Explore</h2>
          <ul>
            {[...PRIMARY_NAV, ...SECONDARY_NAV].map((item) => (
              <li key={item.href}>
                <SmartLink href={item.href}>{item.label}</SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-footer__col">
          <h2 className="site-footer__title">Marcos legais</h2>
          <ul className="site-footer__laws">
            {LEGAL_MILESTONES.map((law) => (
              <li key={law.code}>
                <strong>{law.code}</strong>
                <span>{law.title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__title">Pesquisa</h2>
          <ul className="site-footer__people">
            {RESEARCHERS.map((r) => (
              <li key={r.name}>
                <span className="avatar" aria-hidden="true">
                  {r.initials}
                </span>
                <span>
                  <strong>{r.name}</strong>
                  <small>{r.role}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer__bar container">
        <p>© {year} Promoção 3D. Universidade de Pernambuco.</p>
        <div className="site-footer__bar-links">
          <Link to="/admin">Área restrita</Link>
          <a href={SITE.developerUrl} target="_blank" rel="noreferrer noopener" className="site-footer__dev">
            Desenvolvido por <strong>Jefferson Santos</strong>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
