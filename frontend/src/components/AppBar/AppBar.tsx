import AppNavigation from "../AppNavigation/AppNavigation";
import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav/UserNav";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

export default function AppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className="bg-light py-3 border-bottom">
      <div className="container d-flex justify-content-between align-items-center flex-wrap">
        <div className="d-flex align-items-center">
          <img
            src="/logo.png"
            alt="GorganyTour Logo"
            className="me-2"
            style={{ height: "40px" }}
          />
          <h1 className="h5 mb-0">GorganyTour</h1>
        </div>
        <nav className="d-flex align-items-center navbar">
          <AppNavigation />
          {isLoggedIn ? <UserNav /> : <AuthNav />}
        </nav>
      </div>
    </header>
  );
}
