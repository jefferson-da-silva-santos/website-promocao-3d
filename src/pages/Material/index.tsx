import logo from "../../assets/image/logo.png";
import chat from "../../assets/image/chat.png";

const Material = () => {
  return (
     <div className="material" id="material">
        <section className="material__content">
          <div className="material__content__section--primary">
            <div className="group">
              <img src={logo} alt="" className="img" />
              <span className="material__content__section--primary__suptitle"
                >Material</span
              >
            </div>
            <h2 className="material__content__section--primary__title">
              Você já conhece o Chatbot da Promoção 3D?
            </h2>
            <p className="material__content__section--primary__text">
              A Promoção 3D foi revitalizada com uma abordagem inovadora e agora
              incorpora um Assistente de Inteligência Artificial (I.A), treinado
              especificamente para responder, conscientizar, incentivar e educar
              as pessoas sobre a importância das Transfusões, Transplantes e
              Doações, fundamentais para salvar vidas e promover a saúde
              pública. Disponibilizado em plataforma digital, esse assistente
              foi alimentado com informações detalhadas sobre os aspectos
              essenciais da Política Pública - Promoção 3D, atuando como um
              recurso valioso para informar e engajar o público conscientizando,
              incentivando e educando para salvar vidas.
            </p>
          </div>
          <div className="material__content__section--secundary">
            <img src={chat} alt="" />
            <a
              href="https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d"
              target="_blank"
              className="btn"
              >Converse com nosso Chatbot
            </a>
            <a href="" className="link"
              >Clique para ver a matéria completa sobre a promoção 3D
              <i className="bx bx-box-arrow-up-right"></i
            ></a>
            <a href="" className="link"
              >Clique para baixar o trabalho do Doutorando em Educação Eliabi
              Pereira <i className='bx bxs-chevrons-left'></i></a>
            <a href="" className="link"
              >Mais um link de teste <i className='bx bxs-chevrons-right'></i></a>
          </div>
        </section>
      </div>
  )
}

export default Material