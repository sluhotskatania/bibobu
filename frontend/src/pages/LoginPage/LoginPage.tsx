import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";
import css from "../../styles/AuthForm.module.css";
import { Link } from "react-router-dom";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Невірний email").required("Обов'язкове поле"),
  password: Yup.string().required("Обов'язкове поле"),
});

export default function LoginPage() {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success("Логін успішний!");
    } catch (error) {
      toast.error(`Помилка логіну: ${error}`);
    }
  };

  return (
    <div className={`container py-5 ${css.authContainer}`}>
      <h2 className={css.pageTitle}>Логін</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
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
              Увійти
            </button>

            <Link to="/request-reset-email" className="link text-center mt-3">
              Забули пароль?
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
}
