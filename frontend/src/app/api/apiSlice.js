import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";


export const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token || Cookies.get("jwt");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: [
    'Annonce',
    'AnnonceLaine',
    'Transport',
    'Abattage',
    'Client',
    'Eleveur',
    'Facture',
    'Identification',
    'PartSociale',
    'User',
    'Ristourne',
    'BonLivraison',
    'Label',
    'Nature',
  ],
  keepUnusedDataFor: 60 * 60 * 2, // just enough for the presentation :)
  endpoints: (builder) => ({}),
});
