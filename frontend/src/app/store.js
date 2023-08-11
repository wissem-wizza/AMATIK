import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
// import userReducer from "../features/annonce/userSlice";
// import annonceReducer from "../features/annonce/annonceSlice";
// import especeReducer from "../features/especes/especeSlice";
import authReducer from "../features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { eleveurApi } from "../features/eleveur/eleveurApi";
import { factureApi } from "../features/facture/factureApi";
import { clientApi } from "../features/client/clientApi";
import { annonceApi } from "../features/annonce/annonceApi";

export const store = configureStore({
  reducer: {
    //'name' in the slice : the imported slice name
    [apiSlice.reducerPath]: apiSlice.reducer,
    [eleveurApi.reducerPath]: eleveurApi.reducer,
    [annonceApi.reducerPath]: annonceApi.reducer,
    [factureApi.reducerPath]: factureApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    auth: authReducer,
    // annonce: annonceReducer,
    // especes: especeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(eleveurApi.middleware)
      .concat(clientApi.middleware)
      .concat(annonceApi.middleware)
      .concat(factureApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
