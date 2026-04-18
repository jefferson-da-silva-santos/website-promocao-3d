import { useFormik } from "formik";
import * as Yup from "yup";
import P3D from "../../assets/image/P3D.jpg";
import logo from "../../assets/image/logo.png";

type FormValues = {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
};

// Definição do Schema de Validação com Yup (mantido o mesmo)
const ContatoSchema = Yup.object().shape({
  nome: Yup.string()
    .min(2, "Nome muito curto!")
    .max(50, "Nome muito longo!")
    .required("O nome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  assunto: Yup.string().required("O assunto é obrigatório"),
  mensagem: Yup.string().required("A mensagem é obrigatória"),
});

const Contato = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      nome: "",
      email: "",
      assunto: "",
      mensagem: "",
    },
    validationSchema: ContatoSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  // Função auxiliar para determinar se o campo tem erro e foi tocado
  const isInvalid = (field: keyof FormValues) =>
    formik.errors[field] && formik.touched[field];

  return (
    <div className="contato" id="contato">
      <section className="contato__content" data-aos="fade-up">
        <div className="contato__content__section--primary">
          <div className="group">
            <img src={logo} alt="Logo" />
            <span className="contato__content__section--primary__suptitle">
              Contato
            </span>
          </div>
          <h2 className="contato__content__section--primary__title">
            Você pode nos mandar um email
          </h2>

          <form className="form" onSubmit={formik.handleSubmit}>
            {/* Campo Nome */}
            <input
              placeholder="Insira seu nome e sobrenome"
              type="text"
              name="nome"
              id="nome"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nome}
              // Aplica a classe 'input-error' se for inválido e tocado
              className={isInvalid("nome") ? "input-error" : ""}
            />
            {/* Mensagem de erro REMOVIDA */}

            {/* Campo Email */}
            <input
              placeholder="Insira seu email"
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              // Aplica a classe 'input-error' se for inválido e tocado
              className={isInvalid("email") ? "input-error" : ""}
            />
            {/* Mensagem de erro REMOVIDA */}

            {/* Campo Assunto */}
            <input
              placeholder="Insira o assunto da mensagem"
              type="text"
              name="assunto"
              id="assunto"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.assunto}
              // Aplica a classe 'input-error' se for inválido e tocado
              className={isInvalid("assunto") ? "input-error" : ""}
            />
            {/* Mensagem de erro REMOVIDA */}

            {/* Campo Mensagem (Textarea) */}
            <textarea
              placeholder="Sua mensagem"
              name="mensagem"
              id="mensagem"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mensagem}
              // Aplica a classe 'input-error' se for inválido e tocado
              className={isInvalid("mensagem") ? "input-error" : ""}
            ></textarea>
            {/* Mensagem de erro REMOVIDA */}

            {/* Botão de Envio */}
            <input
              type="submit"
              value="Enviar"
              // Opcional: Desabilita o botão se o formulário for inválido
              disabled={!formik.isValid}
            />
          </form>
        </div>
        <div className="contato__content__section--secundary">
          <img
            src={P3D}
            alt="Imagem 3D"
            className="contato__content__section--secundary__img"
          />
          <div className="contato__content__section--secundary__group">
            <a
              href=""
              className="contato__content__section--secundary__group__button"
            >
              <i className="bx bxl-instagram"></i>
            </a>
            <a
              href=""
              className="contato__content__section--secundary__group__button"
            >
              <i className="bx bxl-twitter"></i>
            </a>
            <a
              href=""
              className="contato__content__section--secundary__group__button"
            >
              <i className="bx bxl-whatsapp"></i>{" "}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
