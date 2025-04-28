import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Feedback } from '../../types';

export const addFeedback = createAsyncThunk<
    Feedback,
    { tourId: string; text: string; rating: number },
    { rejectValue: string }
>('feedbacks/add', async (feedbackData, thunkAPI) => {
    try {
        const response = await axios.post('/feedbacks', feedbackData);
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue('Unknown error');
    }
});

export const fetchFeedbacksByTour = createAsyncThunk<
    Feedback[],
    string,
    { rejectValue: string }
>("feedbacks/fetchByTour", async (tourId, thunkAPI) => {
    try {
        const response = await axios.get(`/feedbacks/tour/${tourId}`);
        return response.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue("Unknown error");
    }
});

export const fetchFeedbacksByTourId = createAsyncThunk<
    Feedback[],
    string,
    { rejectValue: string }
>("feedbacks/fetchByTourId", async (tourId, thunkAPI) => {
    if (!tourId) {
        return thunkAPI.rejectWithValue("ID туру не передано");
    }

    try {
        const response = await axios.get(`/feedbacks/tour/${tourId}`);
        return response.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue("Unknown error");
    }
});

export const fetchFeedbacksByUser = createAsyncThunk<
    Feedback[],
    string,
    { rejectValue: string }
>("feedbacks/fetchByUser", async (userId, thunkAPI) => {
    try {
        const response = await axios.get(`/feedbacks/user/${userId}`);
        return response.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue("Unknown error");
    }
});

export const deleteFeedback = createAsyncThunk<
    string,
    string,
    { rejectValue: string }
>("feedbacks/delete", async (feedbackId, thunkAPI) => {
    try {
        await axios.delete(`/feedbacks/${feedbackId}`);
        return feedbackId; // Повертаємо ID видаленого відгуку
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue("Unknown error");
    }
});