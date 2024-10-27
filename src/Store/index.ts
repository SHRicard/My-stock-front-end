import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSilice";
import themeReducer from "./Slices/themeSlice";
import updateReducer from "./Slices/updateSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    update: updateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
