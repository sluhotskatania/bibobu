import css from "./AboutDescription.module.css";

export default function AboutDescription() {
  return (
    <section className={`mb-5 ${css.descriptionSection}`}>
      <p className={css.paragraph}>
        GorganyTour — це провідна турагенція, яка спеціалізується на організації
        незабутніх подорожей у найкрасивіші куточки України. Ми пропонуємо
        унікальні маршрути, які дозволяють нашим клієнтам насолоджуватися
        природою, культурою та пригодами.
      </p>
      <p className={css.paragraph}>
        Наша команда складається з досвідчених гідів, які забезпечують
        комфортний і безпечний відпочинок. Ми прагнемо створювати тури, які
        залишають найкращі спогади та надихають на нові відкриття.
      </p>
      <p className={css.paragraph}>
        Приєднуйтесь до нас, щоб відкрити для себе нові горизонти та створити
        незабутні моменти разом із GorganyTour!
      </p>
    </section>
  );
}
