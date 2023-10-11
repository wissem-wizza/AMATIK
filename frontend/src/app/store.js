import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { apiSlice } from "./api/apiSlice";
import { parametresDiversApi } from "../features/parametres_divers/parametreDiversApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    //'name' in the slice : the imported slice name
    [apiSlice.reducerPath]: apiSlice.reducer,
    [parametresDiversApi.reducerPath]: parametresDiversApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(parametresDiversApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
