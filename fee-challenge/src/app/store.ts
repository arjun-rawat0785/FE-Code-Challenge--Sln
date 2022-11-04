import { configureStore } from "@reduxjs/toolkit";
import countriesSlice from "./features/countries/countries.slice";

export const store = configureStore({
  reducer: {
    countries: countriesSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// For typescript
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
