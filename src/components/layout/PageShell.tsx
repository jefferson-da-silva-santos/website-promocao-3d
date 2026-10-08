import type { FC, ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

interface PageShellProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/** Moldura comum a todas as páginas públicas: header, conteúdo principal e rodapé. */
const PageShell: FC<PageShellProps> = ({ children, className }) => (
  <>
    <SiteHeader />
    <main id="conteudo" tabIndex={-1} className={["page", className].filter(Boolean).join(" ")}>
      {children}
    </main>
    <SiteFooter />
  </>
);

export default PageShell;
