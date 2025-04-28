import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types";

export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    "users/fetchAll",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/users");
            return response.data.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unknown error");
        }
    }
);