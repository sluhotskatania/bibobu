import { RootState } from "../store";

export const selectCategories = (state: RootState) => state.categories.items;

export const selectIsLoadingCategories = (state: RootState) =>
    state.categories.isLoading;

export const selectCategoriesError = (state: RootState) =>
    state.categories.error;