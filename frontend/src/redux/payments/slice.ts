import { createSlice } from "@reduxjs/toolkit";
import { generatePaymentForm } from "./operations";

type PaymentsState = {
    isLoading: boolean;
    error: string | null;
};

const initialState: PaymentsState = {
    isLoading: false,
    error: null,
};

const paymentsSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(generatePaymentForm.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(generatePaymentForm.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(generatePaymentForm.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Не вдалося створити платіжну форму.";
            });
    },
});

export const paymentsReducer = paymentsSlice.reducer;