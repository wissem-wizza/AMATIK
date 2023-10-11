import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';

const transportsAdapter = createEntityAdapter({
    selectId: (transport) => transport._id,
    sortComparer: (a, b) => b.NUM_ORDRE - a.NUM_ORDRE,
});

const initialState = transportsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTransports: builder.query({
            query: () => '/transport',
            transformResponse: responseData => {
                return transportsAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Transport', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Transport', id }))
            ],
        }),
        getTransportById: builder.query({
            query: (id) => `/transport/${id}`,
            transformResponse: (responseData) => {
                return transportsAdapter.upsertOne(initialState, responseData);
            },
            providesTags: (result, error, arg) => result ? [
                ...result.ids.map((id) => ({ type: "Transport", id })),
            ] : [],
        }),
        createTransport: builder.mutation({
            query: (transport) => ({
                url: `/transport`,
                method: 'POST',
                body: transport
            }),
            async onQueryStarted(
                transport, // query argument
                { dispatch, queryFulfilled }
            ) {
                try {
                    const res = await queryFulfilled;

                    dispatch(
                        extendedApiSlice.util.updateQueryData(
                            "getTransports",
                            undefined,
                            (draft) => {
                                transportsAdapter.addOne(draft, res.data)
                            }
                        )
                    );
                } catch (err) {
                    console.log("error", err)
                    // patchResult.undo();
                }
            },
        }),
        updateTransport: builder.mutation({
            query: ({ id, ...transport }) => ({
                url: `/transport/${id}`,
                method: 'PATCH',
                body: transport
            }),
            async onQueryStarted(
                transport,
                { dispatch, queryFulfilled }
            ) {
                try {
                    const res = await queryFulfilled;
                    dispatch( // needed when supervisor validate transport
                        extendedApiSlice.util.updateQueryData(
                            "getTransports",
                            undefined,
                            (draft) => {
                                // draft.entities[res.data._id] = res.data
                                transportsAdapter.upsertOne(draft, res.data)
                            }
                        )
                    );
                    dispatch( // needed when eleveur back to edit his transport AGAIN
                        extendedApiSlice.util.updateQueryData(
                            "getTransportById",
                            transport.id,
                            (draft) => {
                                transportsAdapter.upsertOne(draft, res.data)
                            }
                        )
                    );
                    // dispatch(
                    //     extendedApiSlice.util.updateQueryData(
                    //         "getTransports",
                    //         undefined,
                    //         (draft) => {
                    //             // draft.entities[res.data._id] = res.data
                    //             transportsAdapter.upsertOne(initialState, responseData);
                    //         }
                    //     )
                    // );
                } catch (err) {
                    console.log("error", err)
                    // patchResult.undo();
                }
            },
            // invalidatesTags: (result, error, arg) => [
            //     { type: 'Transport', id: arg.id }
            // ]
        }),
        deleteTransport: builder.mutation({
            query: (id) => ({
                url: `/transport/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(
                transport_id,
                { dispatch, queryFulfilled }
            ) {
                try {
                    const res = await queryFulfilled;
                    dispatch(
                        extendedApiSlice.util.updateQueryData(
                            "getTransports",
                            undefined,
                            (draft) => {
                                transportsAdapter.removeOne(draft, res.data._id)
                            }
                        )
                    );
                    dispatch(
                        extendedApiSlice.util.updateQueryData(
                            "getTransportById",
                            transport_id,
                            (draft) => {
                                transportsAdapter.removeOne(draft, res.data._id)
                            }
                        )
                    );
                } catch (err) {
                    console.log("error", err)
                    // patchResult.undo();
                }
            },
        }),
        getTransportSelectFields: builder.query({
            query: () => "/transport/select",
        }),
        getTransportPlanifie: builder.query({
            query: () => "/transport/planifie",
        }),
    })
})

export const {
    useGetTransportsQuery,
    useGetTransportPlanifieQuery,
    useGetTransportSelectFieldsQuery,
    useCreateTransportMutation,
    useUpdateTransportMutation,
    useDeleteTransportMutation,
} = extendedApiSlice;

const selectTransportResult = extendedApiSlice.endpoints.getTransports.select();

const selectTransportsData = createSelector(
    selectTransportResult,
    (transportsResult) => transportsResult.data
);

export const {
    selectAll: selectAllTransports,
    selectById: selectTransportById,
    selectIds: selectTransportIds,
} = transportsAdapter.getSelectors(
    (state) => selectTransportsData(state) ?? initialState
);
