import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "../../styles/AuthForm.module.css";
import axios from "axios";
import { apiDomain } from "../../constants";

const RequestResetEmailSchema = Yup.object().shape({
  email: Yup.string().email("Невірний email").required("Обов'язкове поле"),
});

export default function RequestResetEmailPage() {
  const handleSubmit = (values: { email: string }) => {
    try {
      axios.post(`${apiDomain}auth/request-reset-email`, {
        email: values.email,
      });
      toast.success(
        "Інструкції для відновлення паролю надіслано на вашу пошту!"
      );
    } catch (error) {
      toast.error(`Помилка: ${error}`);
    }
  };

  return (
    <div className={`container py-5 ${css.authContainer}`}>
      <h2 className={css.pageTitle}>Відновлення паролю</h2>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={RequestResetEmailSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={css.form}>
            <div className="mb-3">
              <label htmlFor="email" className={css.label}>
                Email
              </label>
              <Field name="email" type="email" className={css.input} />
              <ErrorMessage
                name="email"
                component="div"
                className={css.error}
              />
            </div>
            <button type="submit" className={css.submitButton}>
              Відновити пароль
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
