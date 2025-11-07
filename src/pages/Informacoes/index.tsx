import logo from '../../assets/image/logo.png';
import iconeInfoTecidos from '../../assets/image/icone-info-tecidos.png'; 
import iconeInfoSangue from '../../assets/image/icone-info-sangue.png';
import iconeInfoLeite from '../../assets/image/icone-info-leite.png';

const Informacoes = () => {
  return (
    <div className="informacoes" id="informacoes">
        <section className="informacoes__content">
          <div className="informacoes__content--primary">
            <div className="group">
              <img src={logo} alt="" />
              <span className="informacoes__content--primary__suptitle">
                Informações
              </span>
            </div>
            <h2 className="informacoes__content--primary__title">
              Informações sobre a doação
            </h2>
          </div>
          <div className="informacoes__content--secundary">
            <article className="informacoes__content--secundary__card card1">
              <div className="img">
                <img
                  src={iconeInfoTecidos}
                  alt=""
                  className="informacoes__content--secundary__card__img"
                />
              </div>
              <div className="text">
                <h3 className="informacoes__content--secundary__card__title">
                  Doação de Orgãos e Tecidos
                </h3>
                <p className="informacoes__content--secundary__card__text text-1">
                  A doação de órgãos salva vidas e requer
                  autorização/compatibilidade pelo SUS.
                </p>
              </div>
            </article>

            <article className="informacoes__content--secundary__card card2">
              <div className="img">
                <img
                  src={iconeInfoSangue}
                  alt=""
                  className="informacoes__content--secundary__card__img"
                />
              </div>
              <div className="text">
                <h3 className="informacoes__content--secundary__card__title">
                  Doação de Sangue
                </h3>
                <p className="informacoes__content--secundary__card__text text-1">
                  A doação de sangue é rápida, segura e pode salvar até quatro
                  vidas.
                </p>
              </div>
            </article>

            <article className="informacoes__content--secundary__card card3">
              <div className="img">
                <img
                  src={iconeInfoLeite}
                  alt=""
                  className="informacoes__content--secundary__card__img"
                />
              </div>
              <div className="text">
                <h3 className="informacoes__content--secundary__card__title">
                  Doação de Leite Materno
                </h3>
                <p className="informacoes__content--secundary__card__text text-1">
                  A doação de leite materno nutre bebês prematuros e pode salvar
                  vidas.
                </p>
              </div>
            </article>
          </div>
        </section>
      </div>
  )
}

export default Informacoes
