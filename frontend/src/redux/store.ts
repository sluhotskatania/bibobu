import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth/slice";
import { toursReducer } from "./tours/slice";
import { feedbacksReducer } from "./feedbacks/slice";
import { likesReducer } from "./likes/slice";
import { categoriesReducer } from "./categories/slice";
import { paymentsReducer } from "./payments/slice";
import { usersReducer } from "./users/slice";

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["accessToken"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        tours: toursReducer,
        feedbacks: feedbacksReducer,
        likes: likesReducer,
        categories: categoriesReducer,
        payments: paymentsReducer,
        users: usersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;