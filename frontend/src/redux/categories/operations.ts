import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/categories");
            return response.data.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Не вдалося завантажити категорії.");
        }
    }
);