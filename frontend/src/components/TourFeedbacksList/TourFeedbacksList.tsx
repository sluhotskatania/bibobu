import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedbacksByTour } from "../../redux/feedbacks/operations";
import { fetchUsers } from "../../redux/users/operations";
import { selectFeedbacks } from "../../redux/feedbacks/selectors";
import { selectUsers } from "../../redux/users/selectors";
import { AppDispatch } from "../../redux/store";
import css from "./TourFeedbacksList.module.css";
import { apiDomain } from "../../constants";

type Props = {
  tourId: string;
};

export default function TourFeedbacksList({ tourId }: Props) {
  const dispatch: AppDispatch = useDispatch();
  const feedbacks = useSelector(selectFeedbacks);
  const users = useSelector(selectUsers);

  useEffect(() => {
    if (tourId) {
      dispatch(fetchFeedbacksByTour(tourId));
      dispatch(fetchUsers());
    }
  }, [dispatch, tourId]);

  const feedbacksWithUsers = feedbacks.map((feedback) => {
    const user = users.find((user) => user._id === feedback.userId);
    return {
      ...feedback,
      user,
    };
  });

  if (feedbacksWithUsers.length === 0) {
    return <p>На цей тур ще немає відгуків.</p>;
  }

  return (
    <div className={css.feedbacksList}>
      <h3 className="mb-3">Відгуки</h3>
      <ul className="list-group">
        {feedbacksWithUsers.map((feedback) => (
          <li
            key={feedback._id}
            className={`list-group-item ${css.feedbackItem}`}
          >
            <div className="d-flex align-items-center mb-2">
              <img
                src={
                  apiDomain + feedback.user?.photo ||
                  `${apiDomain}uploads/profiles/default-profile.png`
                }
                alt={feedback.user?.name || "Користувач"}
                className={css.userPhoto}
              />
              <strong className="ms-2">
                {feedback.user?.name || "Анонім"}
              </strong>
            </div>
            <p>{feedback.text}</p>
            <p>
              <strong>Оцінка:</strong> {feedback.rating}/5
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
