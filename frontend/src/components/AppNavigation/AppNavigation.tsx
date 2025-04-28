import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./AppNavigation.module.css";

export default function AppNavigation() {
  return (
    <nav>
      <ul className={css.nav}>
        <li className={css.navItem}>
          <NavLink
            className={({ isActive }) =>
              clsx(css.navLink, { [css.active]: isActive })
            }
            to="/"
          >
            Головна
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink
            className={({ isActive }) =>
              clsx(css.navLink, { [css.active]: isActive })
            }
            to="/tours"
          >
            Тури
          </NavLink>
        </li>
        <li className={css.navItem}>
          <NavLink
            className={({ isActive }) =>
              clsx(css.navLink, { [css.active]: isActive })
            }
            to="/about"
          >
            Про нас
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
