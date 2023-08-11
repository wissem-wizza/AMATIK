import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const factureApi = createApi({
  reducerPath: "facture",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
  endpoints: (builder) => ({
    // Fetch all factures
    getFactures: builder.query({
      query: () => "/facture",
    }),

    // Fetch a single facture by ID
    getFactureById: builder.query({
      query: (id) => `/facture/${id}`,
    }),
  }),
});

export const {
  useGetFacturesQuery,
  useGetFactureByIdQuery,
  useCreateFactureMutation,
  useDeleteFactureMutation,
  useUpdateFactureMutation,
} = factureApi;
