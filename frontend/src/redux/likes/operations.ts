import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const toggleLike = createAsyncThunk<
    { tourId: string; isLiked: boolean; likes: number },
    string,
    { rejectValue: string }
>("likes/toggle", async (tourId, thunkAPI) => {
    try {
        const response = await axios.post(`/tours/${tourId}/like`);
        return {
            tourId,
            isLiked: response.data.message === "Tour liked",
            likes: response.data.data.likes,
        };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue("Не вдалося змінити статус лайку.");
    }
});