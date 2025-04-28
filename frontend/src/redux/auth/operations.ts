import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';

axios.defaults.baseURL = 'http://localhost:3000/';

const setAuthHeader = (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('accessToken', token);
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
    localStorage.removeItem('accessToken');
};

type RegisterResponse = {
    user: { name: string; email: string };
    accessToken: string;
};


export const register = createAsyncThunk<
    RegisterResponse,
    { name: string; email: string; password: string },
    { rejectValue: string }
>(
    'auth/register',
    async (credentials, thunkAPI) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            setAuthHeader(accessToken || '');
            const response = await axios.post('/auth/register', credentials);
            setAuthHeader(response.data.accessToken);
            return response.data;
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue('Unknown error');
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (credentials: { email: string; password: string }, thunkAPI) => {
        try {
            const response = await axios.post("/auth/login", credentials);
            const { accessToken, refreshToken, expiresIn } = response.data;

            setAuthHeader(accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            if (typeof expiresIn === "number") {
                localStorage.setItem(
                    "accessTokenExpiry",
                    String(Date.now() + expiresIn * 1000)
                );
            } else {
                console.error("Invalid expiresIn value:", expiresIn);
            }

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Unknown error");
        }
    }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
        await axios.post('/auth/logout', { refreshToken });
        clearAuthHeader();
        localStorage.removeItem('refreshToken');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data?.message) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
        return thunkAPI.rejectWithValue('Unknown error');
    }
});

export const refreshToken = createAsyncThunk(
    "auth/refreshToken",
    async (_, thunkAPI) => {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            return thunkAPI.rejectWithValue("Refresh token is missing");
        }

        try {
            const response = await axios.post("/auth/refresh", { refreshToken });
            const { accessToken, refreshToken: newRefreshToken, expiresIn } = response.data;

            setAuthHeader(accessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            if (typeof expiresIn === "number") {
                localStorage.setItem(
                    "accessTokenExpiry",
                    String(Date.now() + expiresIn * 1000)
                );
            } else {
                console.error("Invalid expiresIn value:", expiresIn);
            }

            return response.data;
        } catch (error) {
            clearAuthHeader();
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("accessTokenExpiry");
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Failed to refresh token");
        }
    }
);

export const fetchProfile = createAsyncThunk<User, void, { rejectValue: string }>(
    "auth/fetchProfile",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get("/profile");
            return response.data.data as User;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Не вдалося завантажити профіль");
        }
    }
);

export const updateProfile = createAsyncThunk<User, FormData, { rejectValue: string }>(
    "auth/updateProfile",
    async (profileData, thunkAPI) => {
        try {
            const response = await axios.put("/profile", profileData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return response.data.data as User;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                return thunkAPI.rejectWithValue(error.response.data.message);
            }
            return thunkAPI.rejectWithValue("Не вдалося оновити профіль");
        }
    }
);