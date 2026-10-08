import { Suspense, lazy } from "react";
import type { FC } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

const ExpeditionMap = lazy(() => import("../Expedicao/ExpeditionMap"));

/** Chamada da home para a página da expedição, com o mapa do percurso já desenhado. */
const ExpedicaoTeaser: FC = () => (
  <section className="section teaser" id="expedicao" aria-labelledby="teaser-title">
    <div className="container">
      <Link to="/expedicao" className="teaser__card" data-aos="fade-up">
        <div className="teaser__map">
          <Suspense fallback={<div className="pe-map pe-map--skeleton" aria-hidden="true" />}>
            <ExpeditionMap preview activeIndex={15} />
          </Suspense>
        </div>
        <div className="teaser__copy">
          <h2 className="section-title" id="teaser-title">
            16 regionais, do litoral ao <em>Sertão.</em>
          </h2>
          <p>
            Acompanhe a expedição da pesquisa por escolas técnicas, quilombolas e indígenas de Pernambuco, com fotos e a
            história de cada parada.
          </p>
          <span className="btn btn--primary">
            Explorar a expedição
            <ArrowRight size={18} weight="bold" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </div>
  </section>
);

export default ExpedicaoTeaser;
