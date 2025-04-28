import css from "./AboutGallery.module.css";

export default function AboutGallery() {
  const images = [
    "/gallery/1.jpg",
    "/gallery/2.jpg",
    "/gallery/3.jpg",
    "/gallery/4.jpg",
    "/gallery/5.jpg",
    "/gallery/6.jpg",
  ];

  return (
    <section className={css.gallerySection}>
      <h2 className={`text-center mb-4 ${css.galleryTitle}`}>Наша галерея</h2>
      <div className="row g-4">
        {images.map((image, index) => (
          <div className="col-md-4" key={index}>
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className={`img-fluid rounded shadow-sm ${css.galleryImage}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
