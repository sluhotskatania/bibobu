import { createSlice } from "@reduxjs/toolkit";
import { toggleLike } from "./operations";

type LikesState = {
    likedTours: string[];
    tourLikes: Record<string, number>;
    isLoading: boolean;
    error: string | null;
};

const initialState: LikesState = {
    likedTours: [],
    tourLikes: {},
    isLoading: false,
    error: null,
};

const likesSlice = createSlice({
    name: "likes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleLike.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(toggleLike.fulfilled, (state, action) => {
                const { tourId, isLiked, likes } = action.payload;
                state.isLoading = false;

                if (isLiked) {
                    state.likedTours.push(tourId);
                } else {
                    state.likedTours = state.likedTours.filter((id) => id !== tourId);
                }

                state.tourLikes[tourId] = likes;
            })
            .addCase(toggleLike.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Не вдалося змінити статус лайку.";
            });
    },
});

export const likesReducer = likesSlice.reducer;