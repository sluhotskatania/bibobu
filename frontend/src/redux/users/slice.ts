import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./operations";
import { User } from "../../types";

type UsersState = {
    items: User[];
    isLoading: boolean;
    error: string | null;
};

const initialState: UsersState = {
    items: [],
    isLoading: false,
    error: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const usersReducer = usersSlice.reducer;