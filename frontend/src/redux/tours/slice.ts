import { createSlice } from "@reduxjs/toolkit";
import { fetchTours, fetchTourById } from "./operations";
import { Tour } from "../../types";

const initialState: {
    items: Tour[];
    currentTour: Tour | null;
    isLoading: boolean;
    error: string | null;
} = {
    items: [],
    currentTour: null,
    isLoading: false,
    error: null,
};

const toursSlice = createSlice({
    name: "tours",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTours.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTours.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchTours.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) ?? null;
            })
            .addCase(fetchTourById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchTourById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentTour = action.payload;
            })
            .addCase(fetchTourById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = (action.payload as string) ?? null;
            });
    },
});

export const toursReducer = toursSlice.reducer;