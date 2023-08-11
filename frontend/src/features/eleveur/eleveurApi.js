import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eleveurApi = createApi({
  reducerPath: "eleveur",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
  endpoints: (builder) => ({
    // Fetch all eleveurs
    getEleveurs: builder.query({
      query: () => "/eleveur",
    }),

    // Fetch a single eleveur by ID
    getEleveurById: builder.query({
      query: (id) => `/eleveur/${id}`,
    }),

    // Create a new eleveur
    createEleveur: builder.mutation({
      query: (eleveur) => ({
        url: "/eleveur",
        method: "POST",
        body: eleveur,
      }),
    }),

    // Update an existing eleveur
    updateEleveur: builder.mutation({
      query: ({ id, ...eleveur }) => ({
        url: `/eleveur/${id}`,
        method: "PUT",
        body: eleveur,
      }),
    }),

    // Delete a eleveur by ID
    deleteEleveur: builder.mutation({
      query: (id) => ({
        url: `/eleveur/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetEleveursQuery,
  useGetEleveurByIdQuery,
  useCreateEleveurMutation,
  useDeleteEleveurMutation,
  useUpdateEleveurMutation,
} = eleveurApi;
