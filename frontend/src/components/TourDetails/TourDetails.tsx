import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../../redux/likes/operations";
import { addFeedback } from "../../redux/feedbacks/operations";
import { selectLikedTours } from "../../redux/likes/selectors";
import { selectCategories } from "../../redux/categories/selectors";
import { selectTourLikes } from "../../redux/likes/selectors";
import { AppDispatch } from "../../redux/store";
import { Tour } from "../../types";
import {
  selectBoughtTours,
  selectIsLoggedIn,
} from "../../redux/auth/selectors";
import { generatePaymentForm } from "../../redux/payments/operations";
import {
  selectIsLoadingPayments,
  selectPaymentsError,
} from "../../redux/payments/selectors";
import TourFeedbacksList from "../TourFeedbacksList/TourFeedbacksList";

type Props = {
  tour: Tour;
};

export default function TourDetails({ tour }: Props) {
  const dispatch: AppDispatch = useDispatch();

  const likedTours = useSelector(selectLikedTours);
  const categories = useSelector(selectCategories);
  const likes = useSelector(selectTourLikes)[tour._id] ?? tour.likes;
  const isLiked = likedTours.some(
    (id) => id.toString() === tour._id.toString()
  );

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const boughtTours = useSelector(selectBoughtTours);

  const isLoadingPayments = useSelector(selectIsLoadingPayments);
  const paymentsError = useSelector(selectPaymentsError);

  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState<string | null>(null);

  const categoryName =
    categories.find((category) => category._id === tour.category)?.name ||
    "Невідома категорія";

  const handleLike = async () => {
    try {
      await dispatch(toggleLike(tour._id)).unwrap();
    } catch {
      setError("Не вдалося змінити статус лайку.");
    }
  };

  const handleAddFeedback = async () => {
    if (feedbackText.trim()) {
      try {
        await dispatch(
          addFeedback({ tourId: tour._id, text: feedbackText, rating })
        ).unwrap();
        setFeedbackText("");
        setRating(5);
      } catch {
        setError("Не вдалося додати відгук.");
      }
    }
  };

  const handleBuy = async () => {
    try {
      const { data, signature } = await dispatch(
        generatePaymentForm({ tourId: tour._id })
      ).unwrap();

      const form = `
        <form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">
          <input type="hidden" name="data" value="${data}" />
          <input type="hidden" name="signature" value="${signature}" />
          <button type="submit" style="display: none;">Оплатити</button>
        </form>
      `;

      const paymentWindow = window.open("", "_blank");
      paymentWindow?.document.write(form);
      paymentWindow?.document.querySelector("form")?.submit();
    } catch (error) {
      setError(error as string);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <img
          src={tour.image || "/placeholder.jpg"}
          alt={tour.title}
          className="img-fluid rounded"
        />
      </div>
      <div className="col-md-6">
        <h1 className="mb-3">{tour.title}</h1>
        <p className="text-muted">{tour.description}</p>
        <p>
          <strong>Ціна:</strong> {tour.price} грн
        </p>
        <p>
          <strong>Категорія:</strong> {categoryName}
        </p>
        <p>
          <strong>Лайки:</strong> {likes}
        </p>
        <div className="d-flex align-items-center gap-3">
          {isLoggedIn && (
            <button
              className={`btn ${isLiked ? "btn-danger" : "btn-outline-danger"}`}
              onClick={handleLike}
            >
              {isLiked ? "Зняти лайк" : "Лайкнути"}
            </button>
          )}
          {isLoggedIn &&
            ((boughtTours || []).includes(tour._id) ? (
              <span className="badge bg-success">Ви вже придбали цей тур</span>
            ) : (
              <button
                className="btn btn-success"
                onClick={handleBuy}
                disabled={isLoadingPayments}
              >
                {isLoadingPayments ? "Завантаження..." : "Придбати"}
              </button>
            ))}
        </div>
        {paymentsError && <p className="text-danger mt-3">{paymentsError}</p>}
      </div>
      <div className="col-md-12 mt-4">
        <TourFeedbacksList tourId={tour._id} />
        {isLoggedIn && (
          <div className="mt-4">
            <h5>Залишити відгук</h5>
            <textarea
              className="form-control mb-2"
              rows={3}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <select
              className="form-select mb-2"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} з 5
                </option>
              ))}
            </select>
            <button className="btn btn-primary" onClick={handleAddFeedback}>
              Додати відгук
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
}
