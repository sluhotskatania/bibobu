import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Tour } from "../../types";

export const fetchTours = createAsyncThunk("tours/fetchTours", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/tours");
        return response.data.data;
    } catch (error) {
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('An unknown error occurred');
    }
});

export const fetchTourById = createAsyncThunk<
    Tour,
    string,
    { rejectValue: string }
>("tours/fetchById", async (id, thunkAPI) => {
    try {
        const response = await axios.get(`/tours/${id}`);
        return response.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue("Unknown error");
    }
});