import { Link } from "react-router-dom";
import clsx from "clsx";
import css from "./AuthNav.module.css";

export default function AuthNav() {
  return (
    <div className={clsx(css.flexContainer, "d-flex align-items-center")}>
      <Link
        to="/login"
        className={clsx(css.loginButton, "btn btn-outline-primary me-2")}
      >
        Увійти
      </Link>
      <Link
        to="/register"
        className={clsx(css.registerButton, "btn btn-primary")}
      >
        Зареєструватися
      </Link>
    </div>
  );
}
