import clsx from "clsx";
import css from "./Gallery.module.css";

export default function Gallery() {
  return (
    <section className={clsx("gallery py-5 bg-light", css.gallery)}>
      <div className="container">
        <h2 className="display-6 fw-bold text-center mb-4">Наша Галерея</h2>
        <div
          id="galleryCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className={clsx("carousel-inner", css.carouselInner)}>
            <div className={clsx("carousel-item active", css.carouselItem)}>
              <img
                src="/gallery/1.jpg"
                className="d-block w-100"
                alt="Image 1"
              />
            </div>
            <div className={clsx("carousel-item", css.carouselItem)}>
              <img
                src="/gallery/2.jpg"
                className="d-block w-100"
                alt="Image 2"
              />
            </div>
            <div className={clsx("carousel-item", css.carouselItem)}>
              <img
                src="/gallery/3.jpg"
                className="d-block w-100"
                alt="Image 3"
              />
            </div>
            <div className={clsx("carousel-item", css.carouselItem)}>
              <img
                src="/gallery/4.jpg"
                className="d-block w-100"
                alt="Image 4"
              />
            </div>
          </div>
          <button
            className={clsx("carousel-control-prev", css.carouselControl)}
            type="button"
            data-bs-target="#galleryCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className={clsx("carousel-control-next", css.carouselControl)}
            type="button"
            data-bs-target="#galleryCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
  );
}
