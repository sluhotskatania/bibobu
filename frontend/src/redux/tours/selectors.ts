import { RootState } from "../store";

export const selectTours = (state: RootState) => state.tours.items || [];

export const selectCurrentTour = (state: RootState) => state.tours.currentTour;

export const selectIsLoadingTours = (state: RootState) => state.tours.isLoading;

export const selectToursError = (state: RootState) => state.tours.error;