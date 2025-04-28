import { createSlice } from "@reduxjs/toolkit";
import { login, register, logout, refreshToken, fetchProfile, updateProfile } from "./operations";
import { User } from "../../types";

type AuthState = {
    user: User | null;
    accessToken: string | null;
    isLoggedIn: boolean;
    isRefreshing: boolean;
    isLoading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isLoggedIn: false,
    isRefreshing: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Реєстрація
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user as User;
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            // Логін
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user as User;
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
            })
            // Логаут
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.isLoggedIn = false;
            })
            // Оновлення токена
            .addCase(refreshToken.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshToken.rejected, (state) => {
                state.isRefreshing = false;
            })
            // Завантаження профілю
            .addCase(fetchProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Не вдалося завантажити профіль";
            })
            // Оновлення профілю
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Не вдалося оновити профіль";
            });
    },
});

export const authReducer = authSlice.reducer;