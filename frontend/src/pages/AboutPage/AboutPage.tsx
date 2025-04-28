import AboutDescription from "../../components/AboutDescription/AboutDescription";
import AboutGallery from "../../components/AboutGallery/AboutGallery";
import css from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <div className={`container py-5 ${css.aboutPage}`}>
      <h1 className={`mb-4 text-center ${css.pageTitle}`}>Про нас</h1>
      <AboutDescription />
      <AboutGallery />
    </div>
  );
}
