import { createSlice } from '@reduxjs/toolkit';
import { addFeedback, fetchFeedbacksByTour, fetchFeedbacksByUser, deleteFeedback } from './operations';
import { Feedback } from '../../types';


type FeedbacksState = {
    items: Feedback[];
    isLoading: boolean;
    error: string | null;
};

const initialState: FeedbacksState = {
    items: [],
    isLoading: false,
    error: null,
};

const feedbacksSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbacksByTour.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFeedbacksByTour.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchFeedbacksByTour.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(addFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items.push(action.payload);
            })
            .addCase(addFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchFeedbacksByUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFeedbacksByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchFeedbacksByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteFeedback.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteFeedback.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter(
                    (feedback) => feedback._id !== action.payload
                );
            })
            .addCase(deleteFeedback.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const feedbacksReducer = feedbacksSlice.reducer;