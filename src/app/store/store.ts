import { configureStore } from "@reduxjs/toolkit";
import { authreducer } from "./slice";

const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
