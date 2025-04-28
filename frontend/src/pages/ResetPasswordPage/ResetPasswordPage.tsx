import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "../../styles/AuthForm.module.css";
import axios from "axios";
import { apiDomain } from "../../constants";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().min(3).max(50).required("Обов'язкове поле"),
});

export default function ResetPasswordPage() {
  const handleSubmit = (values: { password: string }) => {
    try {
      axios.post(`${apiDomain}auth/reset-password`, {
        token: window.location.search.split("=")[1],
        password: values.password,
      });
      toast.success("Пароль успішно змінено! Можете повернутися до логіну");
    } catch (error) {
      toast.error(`Помилка: ${error}`);
    }
  };

  return (
    <div className={`container py-5 ${css.authContainer}`}>
      <h2 className={css.pageTitle}>Введіть новий пароль</h2>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={ResetPasswordSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={css.form}>
            <div className="mb-3">
              <label htmlFor="password" className={css.label}>
                Пароль
              </label>
              <Field name="password" type="password" className={css.input} />
              <ErrorMessage
                name="password"
                component="div"
                className={css.error}
              />
            </div>
            <button type="submit" className={css.submitButton}>
              Встановити новий пароль
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
