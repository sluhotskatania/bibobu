import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark text-light py-5 mt-2">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Про нас</h5>
            <p>
              GorganyTour — це ваш надійний партнер у світі подорожей. Ми
              організовуємо незабутні тури для кожного.
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Контакти</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <FaPhoneAlt className="me-2" /> Телефон: +380 123 456 789
              </li>
              <li className="mb-2">
                <FaEnvelope className="me-2" /> Email: info@gorganytour.com
              </li>
              <li>
                <FaMapMarkerAlt className="me-2" /> Адреса: вул. Подорожей, 10,
                Київ
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Соціальні мережі</h5>
            <ul className="list-unstyled d-flex">
              <li className="me-3">
                <a
                  href="#"
                  className="text-light text-decoration-none d-flex align-items-center"
                >
                  <FaFacebook className="me-2" /> Facebook
                </a>
              </li>
              <li className="me-3">
                <a
                  href="#"
                  className="text-light text-decoration-none d-flex align-items-center"
                >
                  <FaInstagram className="me-2" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-light text-decoration-none d-flex align-items-center"
                >
                  <FaTwitter className="me-2" /> Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="mb-0">&copy; 2025 GorganyTour. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
}
