import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const partSocialeApi = createApi({
  reducerPath: "part_sociale",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      console.log("Header: ", headers);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Fetch all part_sociales
    getPartSociales: builder.query({
      query: () => "/part_sociale",
    }),

    // Fetch a single part_sociale by ID
    getPartSocialeById: builder.query({
      query: (id) => `/part_sociale/${id}`,
    }),

    // Create a new part_sociale
    createPartSociale: builder.mutation({
      query: (part_sociale) => ({
        url: "/part_sociale",
        method: "POST",
        body: part_sociale,
      }),
    }),

    // Update an existing part_sociale
    updatePartSociale: builder.mutation({
      query: ({ id, ...part_sociale }) => ({
        url: `/part_sociale/${id}`,
        method: "PUT",
        body: part_sociale,
      }),
    }),

    // Delete a part_sociale by ID
    deletePartSociale: builder.mutation({
      query: (id) => ({
        url: `/part_sociale/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPartSocialesQuery,
  useGetPartSocialeByIdQuery,
  useCreatePartSocialeMutation,
  useDeletePartSocialeMutation,
  useUpdatePartSocialeMutation,
} = partSocialeApi;
