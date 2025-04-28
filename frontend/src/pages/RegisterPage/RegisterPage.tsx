import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
import toast from "react-hot-toast";
import css from "../../styles/AuthForm.module.css";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, "Занадто коротке!").required("Обов'язкове поле"),
  email: Yup.string().email("Невірний email").required("Обов'язкове поле"),
  password: Yup.string()
    .min(6, "Пароль має містити мінімум 6 символів")
    .required("Обов'язкове поле"),
});

export default function RegisterPage() {
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await dispatch(register(values)).unwrap();
      toast.success("Реєстрація успішна!");
    } catch (error) {
      toast.error(`Помилка реєстрації: ${error}`);
    }
  };

  return (
    <div className={`container py-5 ${css.authContainer}`}>
      <h2 className={css.pageTitle}>Реєстрація</h2>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className={css.form}>
            <div className="mb-3">
              <label htmlFor="name" className={css.label}>
                Ім'я
              </label>
              <Field name="name" type="text" className={css.input} />
              <ErrorMessage name="name" component="div" className={css.error} />
            </div>
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
              Зареєструватися
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
