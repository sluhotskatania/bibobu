import { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

export const selectBoughtTours = (state: RootState) => state.auth.user?.boughtTours;
export const selectLikedTours = (state: RootState) => state.auth.user?.likedTours;