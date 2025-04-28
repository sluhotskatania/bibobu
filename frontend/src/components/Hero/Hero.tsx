import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.heroSection}>
      <div className={`container text-center ${css.container}`}>
        <h1 className="display-4 fw-bold">Відкрийте світ з GorganyTour</h1>
        <p className="lead text-muted">
          Плануйте свої подорожі з нами та створюйте незабутні спогади.
        </p>
        <a href="/tours" className={`${css.button} btn btn-lg mt-3`}>
          Переглянути тури
        </a>
      </div>
    </section>
  );
}
