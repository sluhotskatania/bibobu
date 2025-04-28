import { RootState } from "../store";

export const selectLikedTours = (state: RootState) => state.likes.likedTours;
export const selectTourLikes = (state: RootState) => state.likes.tourLikes;
export const selectIsLoadingLikes = (state: RootState) => state.likes.isLoading;
export const selectLikesError = (state: RootState) => state.likes.error;