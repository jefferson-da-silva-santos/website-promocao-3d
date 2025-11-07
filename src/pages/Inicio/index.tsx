import chat from '../../assets/image/chat.png'

const Inicio = () => {
  return (
    <div className="hero" id="hero">
      <div className="hero__overlay"></div>
      <header className="hero__content">
        <section className="hero__section hero__section--primary">
          <h1 className="hero__title">
            Promoção 3D: Uma Política Pública em prol das Doações, Transfusão e
            Transplantes.
          </h1>
          <p className="hero__text">
            A Política de Conscientização e Incentivo à Doação de Sangue e
            Transfusão; Doação de Órgãos/Tecidos e Transplantes; e Doação de
            Leite Humano e Bancos de Leite Humano, promove esclarecimentos
            sobre: mitos, tabus, superação de medos, respeito às crenças e
            preconceitos buscando fortalecer os direitos humanos e a cidadania
            em prol do coletivo, visando os contextos interétnico e
            interculturais.
          </p>
        </section>

        <section className="hero__section hero__section--video">
          <img src={chat} alt="" />
          <a
            target="_blank"
            href="https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d"
            className="btn"
            >Converse com nosso Chatbot
          </a>
        </section>
      </header>
    </div>
  )
}

export default Inicio