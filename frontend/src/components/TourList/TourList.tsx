import { Tour } from "../../types";
import TourCard from "../TourCard/TourCard";

type Props = {
  tours: Tour[];
};

export default function TourList({ tours }: Props) {
  return (
    <div className="row g-4">
      {tours.map((tour) => (
        <div className="col-md-4" key={tour._id}>
          <TourCard tour={tour} />
        </div>
      ))}
    </div>
  );
}
