import { useId, useState } from "react";
import type { FC, ReactNode } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  CheckCircle,
  InstagramLogo,
  PaperPlaneTilt,
  WarningCircle,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
const P3D = "/media/P3D.jpg";
import { SITE, SOCIAL_LINKS } from "../../data/site";
import type { SocialLink } from "../../data/site";

interface FormValues {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

type Status = "idle" | "sent" | "unavailable";

const SCHEMA = Yup.object({
  nome: Yup.string()
    .trim()
    .min(2, "Nome muito curto.")
    .max(50, "Use no máximo 50 caracteres.")
    .required("Informe seu nome."),
  email: Yup.string().trim().email("Digite um e-mail válido, como nome@escola.com.").required("Informe seu e-mail."),
  assunto: Yup.string().trim().required("Informe o assunto."),
  mensagem: Yup.string().trim().min(10, "Escreva pelo menos 10 caracteres.").required("Escreva sua mensagem."),
});

const SOCIAL_ICON: Record<SocialLink["label"], Icon> = {
  Instagram: InstagramLogo,
  WhatsApp: WhatsappLogo,
  YouTube: YoutubeLogo,
};

// ─── Campo com rótulo acima e erro abaixo ────────────────────────────────────

interface ControlA11y {
  readonly id: string;
  readonly name: string;
  readonly "aria-invalid": boolean;
  readonly "aria-describedby"?: string;
}

interface FieldProps {
  readonly label: string;
  readonly name: keyof FormValues;
  readonly error?: string;
  readonly hint?: string;
  /** Render prop: recebe os atributos de acessibilidade já ligados ao rótulo e às mensagens. */
  readonly children: (a11y: ControlA11y) => ReactNode;
}

const Field: FC<FieldProps> = ({ label, name, error, hint, children }) => {
  const id = useId();
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {children({ id, name, "aria-invalid": Boolean(error), "aria-describedby": describedBy })}
      {hint && !error && (
        <small id={`${id}-hint`} className="field__hint">
          {hint}
        </small>
      )}
      {error && (
        <small id={`${id}-error`} className="field__error">
          <WarningCircle size={14} weight="fill" aria-hidden="true" />
          {error}
        </small>
      )}
    </div>
  );
};

// ─── Seção ───────────────────────────────────────────────────────────────────

/**
 * Contato: formulário validado em tempo real. O envio abre o e-mail do visitante
 * já preenchido, sem depender de servidor próprio.
 */
const Contato: FC = () => {
  const [status, setStatus] = useState<Status>("idle");

  const formik = useFormik<FormValues>({
    initialValues: { nome: "", email: "", assunto: "", mensagem: "" },
    validationSchema: SCHEMA,
    onSubmit: (values, { resetForm }) => {
      if (!SITE.contactEmail) {
        setStatus("unavailable");
        return;
      }
      const body = `${values.mensagem}\n\n${values.nome} <${values.email}>`;
      window.location.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(values.assunto)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      resetForm();
    },
  });

  const errorOf = (field: keyof FormValues): string | undefined =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : undefined;

  return (
    <section className="section contact" id="contato" aria-labelledby="contato-title">
      <div className="container contact__grid">
        <div className="contact__aside" data-aos="fade-up">
          <h2 className="section-title" id="contato-title">
            Leve a Promoção 3D para <em>a sua escola.</em>
          </h2>
          <p className="lead">Professores, gestores e estudantes podem escrever para a equipe da pesquisa.</p>
          <figure className="contact__photo">
            <img src={P3D} alt="Material de divulgação da Promoção 3D" loading="lazy" />
          </figure>
          <ul className="contact__social" aria-label="Redes sociais">
            {SOCIAL_LINKS.map(({ label, href }) => {
              const IconCmp = SOCIAL_ICON[label];
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="icon-btn icon-btn--lg"
                      aria-label={label}
                    >
                      <IconCmp size={22} aria-hidden="true" />
                    </a>
                  ) : (
                    <span
                      className="icon-btn icon-btn--lg is-disabled"
                      aria-label={`${label} (em breve)`}
                      title="Perfil oficial em breve"
                    >
                      <IconCmp size={22} aria-hidden="true" />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <form
          className="contact__form"
          onSubmit={formik.handleSubmit}
          noValidate
          data-aos="fade-up"
          data-aos-delay="80"
        >
          <div className="contact__row">
            <Field label="Nome" name="nome" error={errorOf("nome")}>
              {(a11y) => <input {...a11y} {...formik.getFieldProps("nome")} autoComplete="name" />}
            </Field>
            <Field label="E-mail" name="email" error={errorOf("email")}>
              {(a11y) => (
                <input
                  {...a11y}
                  {...formik.getFieldProps("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                />
              )}
            </Field>
          </div>
          <Field
            label="Assunto"
            name="assunto"
            hint="Ex.: palestra na escola, material didático, parceria com município."
            error={errorOf("assunto")}
          >
            {(a11y) => <input {...a11y} {...formik.getFieldProps("assunto")} />}
          </Field>
          <Field label="Mensagem" name="mensagem" error={errorOf("mensagem")}>
            {(a11y) => <textarea {...a11y} {...formik.getFieldProps("mensagem")} rows={5} />}
          </Field>

          <div className="contact__submit">
            <button type="submit" className="btn btn--primary btn--lg" disabled={formik.isSubmitting}>
              Enviar mensagem
              <PaperPlaneTilt size={18} weight="bold" aria-hidden="true" />
            </button>
            <div aria-live="polite" className="contact__status">
              {status === "sent" && (
                <p className="notice notice--success">
                  <CheckCircle size={18} weight="fill" aria-hidden="true" />
                  Abrimos seu aplicativo de e-mail com a mensagem pronta para enviar.
                </p>
              )}
              {status === "unavailable" && (
                <p className="notice notice--warning">
                  <WarningCircle size={18} weight="fill" aria-hidden="true" />O envio por e-mail ainda não está
                  disponível. Fale com a equipe pelo assistente da Promoção 3D.
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contato;
