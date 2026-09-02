import { useFormik } from "formik";
import * as Yup from "yup";
import P3D from "../../assets/image/P3D.jpg";
import SectionHeader from "../../components/SectionHeader";
import { c, dots, frame, inner, section } from "../../theme";

type FormValues = { nome: string; email: string; assunto: string; mensagem: string };

const ContatoSchema = Yup.object().shape({
  nome: Yup.string().min(2, "Nome muito curto!").max(50, "Nome muito longo!").required("O nome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
  assunto: Yup.string().required("O assunto é obrigatório"),
  mensagem: Yup.string().required("A mensagem é obrigatória"),
});

const field = (invalid?: boolean): React.CSSProperties => ({
  width: "100%",
  padding: "14px 16px",
  fontSize: 15,
  color: c.ink,
  background: c.white,
  border: `2px solid ${invalid ? c.red : c.ink}`,
  borderRadius: 12,
  outline: "none",
  fontFamily: "inherit",
});

const SOCIAL = [
  { icon: "bxl-instagram", label: "Instagram", hover: c.red },
  { icon: "bxl-twitter", label: "Twitter / X", hover: c.yellow },
  { icon: "bxl-whatsapp", label: "WhatsApp", hover: c.green },
];

const Contato = () => {
  const formik = useFormik<FormValues>({
    initialValues: { nome: "", email: "", assunto: "", mensagem: "" },
    validationSchema: ContatoSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  const isInvalid = (f: keyof FormValues) => Boolean(formik.errors[f] && formik.touched[f]);

  return (
    <div className="contato" id="contato" style={section}>
      <div aria-hidden style={dots} />
      <section style={inner}>
        <article className="p3d-grid-2" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 0.95fr)", gap: 48, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, minWidth: 0 }}>
            <SectionHeader label="Contato" title="Você pode nos mandar um email" />
            <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input placeholder="Insira seu nome e sobrenome" type="text" name="nome" id="nome" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nome} style={field(isInvalid("nome"))} />
              <input placeholder="Insira seu email" type="email" name="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} style={field(isInvalid("email"))} />
              <input placeholder="Insira o assunto da mensagem" type="text" name="assunto" id="assunto" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.assunto} style={field(isInvalid("assunto"))} />
              <textarea placeholder="Sua mensagem" name="mensagem" id="mensagem" rows={5} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mensagem} style={{ ...field(isInvalid("mensagem")), resize: "vertical" }} />
              <input
                type="submit"
                value="Enviar"
                disabled={!formik.isValid}
                style={{ alignSelf: "flex-start", padding: "14px 30px", fontSize: 15, fontWeight: 700, color: "#fff", background: c.red, border: `2px solid ${c.ink}`, borderRadius: 999, boxShadow: `4px 4px 0 ${c.ink}`, cursor: "pointer" }}
              />
            </form>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>
            <div style={{ ...frame(c.green), aspectRatio: "4 / 3" }}>
              <img src={P3D} alt="Promoção 3D" style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: 20, background: c.ink, border: `3px solid ${c.ink}`, borderRadius: 18 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9C2B4" }}>Acompanhe nas redes</span>
              <div style={{ display: "flex", gap: 10 }}>
                {SOCIAL.map((s) => (
                  <a key={s.label} href="#contato" aria-label={s.label} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 12, background: c.paper, color: c.ink, border: `2px solid ${c.paper}`, textDecoration: "none" }}>
                    <i className={`bx ${s.icon}`} style={{ fontSize: 22 }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Contato;
