import logo from "../../assets/image/logo.png";
import mapa1 from "../../assets/image/mapa mitos doacao de sangue.jpeg";


const Desvendando = () => {
  return (
    <div className="desvendando" id="desvendando">
        <section className="desvendando__content">
          <div
            className="desvendando__content__section desvendando__content__section--primary"
          >
            <div className="group-sup-img">
              <img src={logo} alt="" />
              <span className="desvendando__content__section--primary__suptitle"
                >Desvendando</span
              >
            </div>
            <h2 className="desvendando__content__section--primary__title">
              Mitos e medos que envolvem a promoção 3D
            </h2>
          </div>
          <div
            className="desvendando__content__section desvendando__content__section--secundary"
          >
            <div className="group-image">
              <img
                src={mapa1}
                alt=""
                className="img-mapa"
              />
              <button className="btn-mapa btn-mapa-1 m1"></button>
              <button className="btn-mapa btn-mapa-2 m2"></button>
              <button className="btn-mapa btn-mapa-3 m3"></button>
              <button className="btn-mapa btn-mapa-4 m4"></button>
              <button className="btn-mapa btn-mapa-5 m5"></button>
              <button className="btn-mapa btn-mapa-6 m6"></button>
              <button className="btn-mapa btn-mapa-7 m25"></button>
              <button className="btn-mapa btn-mapa-8 m21"></button>
            </div>
            <div className="group-buttons">
              <button className="group-buttons__btn btn-01 active">
                Mitos Doação de Sangue
              </button>
              <button className="group-buttons__btn btn-02">
                Medos Doação de Sangue
              </button>
              <button className="group-buttons__btn btn-03">
                Mitos Doação de Leite Materno
              </button>
              <button className="group-buttons__btn btn-04">
                Mitos Doação de Orgãos e Tecidos
              </button>
            </div>
          </div>
        </section>
      </div>
  )
}

export default Desvendando