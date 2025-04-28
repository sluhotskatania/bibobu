import { useSelector } from "react-redux";
import { selectLikedTours } from "../../redux/auth/selectors";
import { selectTours } from "../../redux/tours/selectors";
import SmallTourCard from "../SmallTourCard/SmallTourCard";

export default function LikedToursList() {
  const likedToursIds = useSelector(selectLikedTours);
  const tours = useSelector(selectTours);

  const likedTours = tours.filter((tour) => likedToursIds?.includes(tour._id));

  if (likedTours.length === 0) {
    return <p>У вас немає вподобаних турів.</p>;
  }

  return (
    <div className="row g-3">
      {likedTours.map((tour) => (
        <div className="col-md-4" key={tour._id}>
          <SmallTourCard tour={tour} />
        </div>
      ))}
    </div>
  );
}
