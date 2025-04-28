import css from "./Features.module.css";

export default function Features() {
  return (
    <section className={css.featuresSection}>
      <div className="container text-center">
        <h2 className={css.title}>Чому обирають нас?</h2>
        <div className="row w-full">
          <div className="col-md-4 mt-2 mb-2">
            <div className={css.card}>
              <div className={css.cardBody}>
                <h5 className={css.cardTitle}>Найкращі маршрути</h5>
                <p className={css.cardText}>
                  Ми пропонуємо унікальні маршрути, які відкриють для вас
                  незабутні краєвиди.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2 mb-2">
            <div className={css.card}>
              <div className={css.cardBody}>
                <h5 className={css.cardTitle}>Досвідчені гіди</h5>
                <p className={css.cardText}>
                  Наші гіди — це професіонали, які забезпечать вашу безпеку та
                  комфорт.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2 mb-2">
            <div className={css.card}>
              <div className={css.cardBody}>
                <h5 className={css.cardTitle}>Доступні ціни</h5>
                <p className={css.cardText}>
                  Ми пропонуємо найкраще співвідношення ціни та якості для
                  кожного клієнта.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
