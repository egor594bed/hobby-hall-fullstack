import { configureStore } from "@reduxjs/toolkit";
import toastsSlice from "./slices/toasts";
import basketSlice from "./slices/basket";
import authSlice from "./slices/auth";

export const store = configureStore({
  reducer: {
    toastsSlice,
    basketSlice,
    authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
