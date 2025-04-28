import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTourLikes } from "../../redux/likes/selectors";
import { Tour } from "../../types";
import css from "./TourCard.module.css";

type Props = {
  tour: Tour;
};

export default function TourCard({ tour }: Props) {
  const tourLikes = useSelector(selectTourLikes);

  const likes = tourLikes[tour._id] ?? tour.likes;

  return (
    <div className={`card shadow-sm h-100 ${css.card}`}>
      <img
        src={tour.image}
        className={`card-img-top ${css.cardImage}`}
        alt={tour.title}
      />
      <div className={`card-body ${css.cardBody}`}>
        <h5 className={`card-title ${css.cardTitle}`}>{tour.title}</h5>
        <p className={`card-text text-muted ${css.cardDescription}`}>
          {tour.description}
        </p>
        <p className={`card-text fw-bold ${css.cardPrice}`}>
          Ціна: {tour.price} грн
        </p>
        <p className={`card-text text-muted ${css.cardLikes}`}>
          Лайки: {likes}
        </p>
        <Link to={`/tours/${tour._id}`} className={`btn ${css.cardButton}`}>
          Детальніше
        </Link>
      </div>
    </div>
  );
}
