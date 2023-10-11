import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';

const clientsAdapter = createEntityAdapter({
  selectId: (client) => client._id,
  sortComparer: (a, b) => new Date(b.DATE_DERNIERE_FACTURE) - new Date(a.DATE_DERNIERE_FACTURE),
});

const initialState = clientsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => "/client",
      transformResponse: (responseData) => {
        return clientsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Client", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Client", id })),
            ]
          : [],
    }),
    getTotalClients: builder.query({
      query: () => "/client/total",
    }),
    getCiviliteClients: builder.query({
      query: () => "/client/civilite",
      transformResponse: (responseData) => {
        return clientsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Client", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Client", id })),
            ]
          : [],
    }),
    getClientById: builder.query({
      query: (id) => `/client/${id}`,
      transformResponse: (responseData) => {
        return clientsAdapter.upsertOne(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result ? [...result.ids.map((id) => ({ type: "Client", id }))] : [],
    }),
    createClient: builder.mutation({
      query: (client) => ({
        url: `/client`,
        method: "POST",
        body: client,
      }),
      async onQueryStarted(client, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getClients",
              undefined,
              (draft) => {
                clientsAdapter.addOne(draft, res.data)
              }
            )
          );
        } catch {
          // patchResult.undo();
        }
      },
    }),
    updateClient: builder.mutation({
      query: ({ id, ...client }) => ({
        url: `/client/${id}`,
        method: "PATCH",
        body: client,
      }),
      async onQueryStarted(client, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getClients",
              undefined,
              (draft) => {
                // draft.entities[res.data._id] = res.data
                clientsAdapter.upsertOne(draft, res.data)
              }
            )
          );
          dispatch( // needed when we back to edit client AGAIN
            extendedApiSlice.util.updateQueryData(
              "getClientById",
              client.id,
              (draft) => {
                clientsAdapter.upsertOne(draft, res.data)
              }
            )
          );
        } catch (err) {
          console.log("error", err);
          // patchResult.undo();
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Client", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetTotalClientsQuery,
  useGetCiviliteClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
} = extendedApiSlice;

const selectClientResult =
  extendedApiSlice.endpoints.getCiviliteClients.select();

const selectClientsData = createSelector(
  selectClientResult,
  (clientsResult) => clientsResult.data
);

export const {
  selectAll: selectAllClients,
  selectById: selectClientById,
  selectIds: selectClientIds,
} = clientsAdapter.getSelectors(
  (state) => selectClientsData(state) ?? initialState
);
