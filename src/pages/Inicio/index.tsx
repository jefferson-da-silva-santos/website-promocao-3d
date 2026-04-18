import { useEffect, useRef } from "react";
import chat from "../../assets/image/chat.png";

const FULL_TITLE =
  "Promoção 3D: Uma Política Pública em prol das Doações, Transfusão e Transplantes.";

const Inicio = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    el.textContent = "";
    let i = 0;

    const interval = setInterval(() => {
      if (i < FULL_TITLE.length) {
        el.textContent += FULL_TITLE[i];
        i++;
      } else {
        clearInterval(interval);
        // Remove o cursor piscante após terminar a digitação
        el.classList.add("typing-done");
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero" id="hero">
      <div className="hero__overlay"></div>
      <header className="hero__content">
        <section className="hero__section hero__section--primary" data-aos="fade-right">
          {/* Cursor piscante via CSS enquanto digita */}
          <h1 className="hero__title hero__title--typing" ref={titleRef}></h1>
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

        <section className="hero__section hero__section--video" data-aos="fade-left">
          <img src={chat} alt="" />
          <a
            target="_blank"
            href="https://chatgpt.com/g/g-67791d9bb8008191982ec1f0f492a4d6-promocao-3d"
            className="btn"
          >
            Converse com nosso Chatbot
          </a>
        </section>
      </header>
    </div>
  );
};

export default Inicio;
