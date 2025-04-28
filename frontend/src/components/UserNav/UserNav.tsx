import { Link } from "react-router-dom";
import css from "./UserNav.module.css";

export default function UserNav() {
  return (
    <div className={css.userNav}>
      <Link to="/profile" className={`btn btn-danger ${css.logoutButton}`}>
        Профіль
      </Link>
    </div>
  );
}
