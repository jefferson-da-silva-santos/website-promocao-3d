import type { AnchorHTMLAttributes, FC, MouseEvent, ReactNode, Ref } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../../utils/scroll";

interface SmartLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** `#secao` (âncora da home), `/rota` (interna) ou `https://` (externa). */
  readonly href: string;
  readonly children: ReactNode;
  readonly onNavigate?: () => void;
  readonly ref?: Ref<HTMLAnchorElement>;
}

/**
 * Link único para âncoras, rotas e URLs externas.
 * Mantém `href` real (rastreável por buscadores) e intercepta o clique para rolar sem recarregar.
 */
const SmartLink: FC<SmartLinkProps> = ({ href, children, onNavigate, onClick, ...rest }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  if (href.startsWith("#")) {
    const isHome = pathname === "/";
    const handle = (event: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(event);
      event.preventDefault();
      onNavigate?.();
      if (isHome) {
        window.history.replaceState(null, "", href);
        scrollToSection(href.slice(1));
      } else {
        navigate(`/${href}`);
      }
    };
    return (
      <a href={isHome ? href : `/${href}`} onClick={handle} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link
      to={href}
      onClick={(event) => {
        onClick?.(event);
        onNavigate?.();
      }}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default SmartLink;
