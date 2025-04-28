import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTourById } from "../../redux/tours/operations";
import {
  selectCurrentTour,
  selectIsLoadingTours,
  selectToursError,
} from "../../redux/tours/selectors";
import { AppDispatch } from "../../redux/store";
import TourDetails from "../../components/TourDetails/TourDetails";

export default function TourDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  const tour = useSelector(selectCurrentTour);
  const isLoading = useSelector(selectIsLoadingTours);
  const error = useSelector(selectToursError);

  useEffect(() => {
    if (!id) {
      console.error("ID не передано в URL");
      return;
    }
    dispatch(fetchTourById(id));
  }, [dispatch, id]);

  if (!id) {
    return <p className="text-danger">Помилка: ID туру не передано.</p>;
  }

  if (isLoading) {
    return <p>Завантаження...</p>;
  }

  if (error) {
    return <p className="text-danger">Помилка: {error}</p>;
  }

  if (!tour) {
    return <p>Тур не знайдено.</p>;
  }

  return (
    <div className="container py-5">
      <TourDetails tour={tour} />
    </div>
  );
}
