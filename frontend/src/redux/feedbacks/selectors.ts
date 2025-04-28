import { RootState } from "../store";

export const selectFeedbacks = (state: RootState) => state.feedbacks.items || [];
export const selectIsLoadingFeedbacks = (state: RootState) => state.feedbacks.isLoading;
export const selectFeedbacksError = (state: RootState) => state.feedbacks.error;