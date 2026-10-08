import type { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";
import PageShell from "../../components/layout/PageShell";
import BrandMark from "../../components/ui/BrandMark";
import { usePageMeta } from "../../hooks/usePageMeta";

/** Página 404 com caminhos de volta para o conteúdo principal. */
const NotFound: FC = () => {
  usePageMeta("Página não encontrada | Promoção 3D");

  return (
    <PageShell className="not-found">
      <section className="container not-found__inner">
        <BrandMark size={72} className="brand-mark--scattered" />
        <h1 className="page-title">Esta página não existe.</h1>
        <p className="lead">
          O endereço pode ter mudado. Volte ao início ou explore a expedição pelas escolas de Pernambuco.
        </p>
        <div className="not-found__actions">
          <Link to="/" className="btn btn--primary">
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            Voltar ao início
          </Link>
          <Link to="/expedicao" className="text-link">
            Ver a expedição
          </Link>
        </div>
      </section>
    </PageShell>
  );
};

export default NotFound;
