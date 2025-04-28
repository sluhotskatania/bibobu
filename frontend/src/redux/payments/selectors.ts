import { RootState } from "../store";

export const selectIsLoadingPayments = (state: RootState) =>
    state.payments.isLoading;

export const selectPaymentsError = (state: RootState) => state.payments.error;