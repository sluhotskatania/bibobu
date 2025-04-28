import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./operations";

type CategoriesState = {
    items: { _id: string; name: string }[];
    isLoading: boolean;
    error: string | null;
};

const initialState: CategoriesState = {
    items: [],
    isLoading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) || "Помилка завантаження категорій.";
            });
    },
});

export const categoriesReducer = categoriesSlice.reducer;