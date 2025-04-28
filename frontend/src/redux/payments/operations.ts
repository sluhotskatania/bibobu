import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const generatePaymentForm = createAsyncThunk<
    { data: string; signature: string },
    { tourId: string },
    { rejectValue: string }
>("payments/generatePaymentForm", async (payload, thunkAPI) => {
    try {
        const response = await axios.post("/checkout", payload);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue("Не вдалося створити платіжну форму.");
    }
});