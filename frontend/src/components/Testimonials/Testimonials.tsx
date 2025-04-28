import css from "./Testimonials.module.css";
import { FaUser } from "react-icons/fa6";

export default function Testimonials() {
  return (
    <section className="testimonials py-5">
      <div className="container">
        <h2 className="display-6 fw-bold text-center mb-4">
          Відгуки наших клієнтів
        </h2>
        <div className="row">
          <div className="col-md-4 mt-2 mb-2">
            <div className={`card border-0 shadow-sm h-100 ${css.card}`}>
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className={`${css.iconWrapper} me-3`}>
                    <FaUser className="bi bi-person-circle" />
                  </div>
                  <div>
                    <h5 className="mb-0">Олена</h5>
                    <small className="text-muted">Київ</small>
                  </div>
                </div>
                <blockquote className="blockquote mb-4">
                  <p>
                    "Це був найкращий тур у моєму житті! Все було організовано
                    на найвищому рівні."
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2 mb-2">
            <div className={`card border-0 shadow-sm h-100 ${css.card}`}>
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className={`${css.iconWrapper} me-3`}>
                    <FaUser className="bi bi-person-circle" />
                  </div>
                  <div>
                    <h5 className="mb-0">Андрій</h5>
                    <small className="text-muted">Львів</small>
                  </div>
                </div>
                <blockquote className="blockquote mb-4">
                  <p>
                    "Дякую за незабутні враження! Обов'язково повернуся ще раз."
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
          <div className="col-md-4 mt-2 mb-2">
            <div className={`card border-0 shadow-sm h-100 ${css.card}`}>
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className={`${css.iconWrapper} me-3`}>
                    <FaUser className="bi bi-person-circle" />
                  </div>
                  <div>
                    <h5 className="mb-0">Марія</h5>
                    <small className="text-muted">Одеса</small>
                  </div>
                </div>
                <blockquote className="blockquote mb-4">
                  <p>
                    "Прекрасна організація та чудові гіди. Рекомендую всім!"
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
