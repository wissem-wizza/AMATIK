import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
  reducerPath: "client",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
  endpoints: (builder) => ({
    // Fetch all clients
    getClients: builder.query({
      query: () => "/client",
    }),

    // Fetch all clients
    getCiviliteClients: builder.query({
      query: () => "/client/civilite",
    }),

    // Fetch a single client by ID
    getClientById: builder.query({
      query: (id) => `/client/${id}`,
    }),

    // Create a new client
    createClient: builder.mutation({
      query: (client) => ({
        url: "/client",
        method: "POST",
        body: client,
      }),
    }),

    // Update an existing client
    updateClient: builder.mutation({
      query: ({ id, ...client }) => ({
        url: `/client/${id}`,
        method: "PUT",
        body: client,
      }),
    }),

    // Delete a client by ID
    deleteClient: builder.mutation({
      query: (id) => ({
        url: `/client/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetCiviliteClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,
} = clientApi;
