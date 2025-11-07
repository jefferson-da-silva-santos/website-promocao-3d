import logo from '../../assets/image/logo.png';
import UPE from '../../assets/image/UPE.jpeg';

const Sobre = () => {
  return (
    <div className="sobre" id="sobre">
        <section className="sobre__content">
          <div
            className="sobre__content__section sobre__content__section--primary"
          >
            <div className="sobre__content__section__group-sup">
              <img src={logo} alt="" />
              <span className="sobre__content__section__suptitle"
                >Sobre o projeto</span
              >
            </div>

            <h2 className="sobre__content__section__title">
              Como surgiu a promoção 3D?
            </h2>
            <p className="sobre__content__section__text">
              A Promoção 3D é resultado de uma pesquisa do Doutorando em
              Educação Eliabi Pereira e seu Orientador: PhD Múcio Banja da
              Universidade de Pernambuco, Campus Mata Norte. Essa Pesquisa foi
              transformado na Lei N° 18.359 de 27 de Outubro de 2023 no Estado
              de Pernambuco, pelo Deputado Estadual Henrique Queiroz Filho, a
              pesquisa também foi apresentada no Congresso Nacional em Brasília
              pelo Deputado Federal Eduardo da Fonte, como Política Pública
              Nacional PL 5.233/2023 e Programa Nacional de Ensino PL110/2024.
            </p>
          </div>

          <div
            className="sobre__content__section sobre__content__section--secudary"
          >
            <img src={UPE} alt="" />
          </div>
        </section>
      </div>
  )
}

export default Sobre