import AppBar from "../AppBar/AppBar";
import Footer from "../Footer/Footer";

import css from "./Layout.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={css.backgroundBlur}></div>
      <AppBar />
      <div className="container mt-4 mb-4">{children}</div>
      <Footer />
    </>
  );
}
