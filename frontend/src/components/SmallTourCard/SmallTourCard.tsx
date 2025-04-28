import { Link } from "react-router-dom";
import { Tour } from "../../types";
import css from "./SmallTourCard.module.css";

type Props = {
  tour: Tour;
};

export default function SmallTourCard({ tour }: Props) {
  return (
    <Link to={`/tours/${tour._id}`} className={css.card}>
      <img
        src={tour.image || "/placeholder.jpg"}
        alt={tour.title}
        className={css.image}
      />
      <div className={css.info}>
        <h5 className={css.title}>{tour.title}</h5>
        <p className={css.price}>{tour.price} грн</p>
      </div>
    </Link>
  );
}
