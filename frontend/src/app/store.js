import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
// // import userReducer from "../features/annonce/userSlice";
// // import annonceReducer from "../features/annonce/annonceSlice";
// // import especeReducer from "../features/especes/especeSlice";
// import authReducer from "../features/auth/authSlice";

import { setupListeners } from "@reduxjs/toolkit/query";
import { eleveurApi } from "../features/eleveur/eleveurApi";
import { factureApi } from "../features/facture/factureApi";
import { clientApi } from "../features/client/clientApi";
import { partSocialeApi } from "../features/part_sociale/partSocialeApi";
import { annonceApi } from "../features/annonce/annonceApi";
// import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    //'name' in the slice : the imported slice name
    [apiSlice.reducerPath]: apiSlice.reducer,
    [eleveurApi.reducerPath]: eleveurApi.reducer,
    [annonceApi.reducerPath]: annonceApi.reducer,
    [factureApi.reducerPath]: factureApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [partSocialeApi.reducerPath]: partSocialeApi.reducer,
    auth: authReducer,
    // [authApi.reducerPath]: authApi.reducer,
    // auth: authReducer,
    // // annonce: annonceReducer,
    // // especes: especeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(eleveurApi.middleware)
      .concat(clientApi.middleware)
      .concat(partSocialeApi.middleware)
      .concat(annonceApi.middleware)
      .concat(factureApi.middleware),
  // .concat(authApi.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
