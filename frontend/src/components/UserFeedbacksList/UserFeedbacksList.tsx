import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFeedbacksByUser,
  deleteFeedback,
} from "../../redux/feedbacks/operations";
import {
  selectFeedbacks,
  selectIsLoadingFeedbacks,
  selectFeedbacksError,
} from "../../redux/feedbacks/selectors";
import { selectTours } from "../../redux/tours/selectors";
import { AppDispatch } from "../../redux/store";
import css from "./UserFeedbacksList.module.css";
import toast from "react-hot-toast";

export default function UserFeedbacksList({ userId }: { userId: string }) {
  const dispatch: AppDispatch = useDispatch();
  const feedbacks = useSelector(selectFeedbacks);
  const tours = useSelector(selectTours);
  const isLoading = useSelector(selectIsLoadingFeedbacks);
  const error = useSelector(selectFeedbacksError);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFeedbacksByUser(userId));
    }
  }, [dispatch, userId]);

  const handleDelete = (feedbackId: string) => {
    dispatch(deleteFeedback(feedbackId))
      .unwrap()
      .then(() => toast.success("Відгук успішно видалено"))
      .catch((err) => toast.error(err.message));
  };

  const feedbacksWithTours = Array.isArray(feedbacks)
    ? feedbacks.map((feedback) => {
        const tour = tours.find((tour) => tour._id === feedback.tourId);
        return {
          ...feedback,
          tour,
        };
      })
    : [];

  if (isLoading) return <p>Завантаження відгуків...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (feedbacksWithTours.length === 0) {
    return <p>У вас ще немає відгуків.</p>;
  }

  return (
    <div className={css.feedbacksList}>
      <h2 className="mb-3">Ваші відгуки</h2>
      <ul className="list-group">
        {feedbacksWithTours.map((feedback) => (
          <li
            key={feedback._id}
            className={`list-group-item ${css.feedbackItem}`}
          >
            <h5>{feedback.tour?.title || "Тур не знайдено"}</h5>
            <p>{feedback.text}</p>
            <p>
              <strong>Рейтинг:</strong> {feedback.rating}/5
            </p>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDelete(feedback._id)}
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
