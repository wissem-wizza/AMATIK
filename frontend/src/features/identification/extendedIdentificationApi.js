import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';

const identificationsAdapter = createEntityAdapter({
    selectId: (identification) => identification._id,
    sortComparer: (a, b) => new Date(b.DATE_TOURNEE) - new Date(a.DATE_TOURNEE),
});

const initialState = identificationsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getIdentifications: builder.query({
            query: () => '/identification',
            transformResponse: responseData => {
                return identificationsAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'Identification', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Identification', id }))
            ] : [],
            invalidatesTags: (result, error, arg) => [
                { type: 'Identification', id: "LIST" }
            ]
        }),
        getTotalCheptel: builder.query({
            query: () => "/identification/cheptel",
        }),
        getIdentificationsByRelatedTransport: builder.query({
            query: (id) => `/identification/transport/${id}`,
            transformResponse: (responseData) => { // WRONG !!! should use draft instead
                return identificationsAdapter.upsertMany(initialState, responseData);
            },
            providesTags: (result, error, arg) => result ? [
                ...result.ids.map((id) => ({ type: "Identification", id })),
            ] : [],
            invalidatesTags: (result, error, arg) => [
                { type: 'Identification', id: "LIST" }
            ]
        }),
        getIdentificationsATransporter: builder.query({
            query: () => `/identification/a_transporter`,
            transformResponse: (responseData) => {
                return identificationsAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'Identification', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Identification', id }))
            ] : [],
            invalidatesTags: (result, error, arg) => [
                { type: 'Identification', id: "LIST" }
            ]
        }),
        createIdentification: builder.mutation({
            query: (identification) => ({
                url: `/identification`,
                method: 'POST',
                body: identification
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Identification', id: "LIST" }
            ]
            // async onQueryStarted(
            //     identification,
            //     { dispatch, queryFulfilled }
            // ) {
            //     try {
            //         const res = await queryFulfilled;
            //         dispatch(
            //             extendedApiSlice.util.updateQueryData(
            //                 "getIdentificationsATransporter", // instead of getIdentifications
            //                 undefined,
            //                 (draft) => {
            //                     identificationsAdapter.addOne(draft, res.data)
            //                 }
            //             )
            //         );
            //     } catch(err) {
            //         console.log("error", err)
            //         // patchResult.undo();
            //     }
            // },
        }),
        updateIdentification: builder.mutation({
            query: ({ id, ...identification }) => ({
                url: `/identification/${id}`,
                method: 'PATCH',
                body: identification
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Identification', id: "LIST" }
            ],
            // async onQueryStarted(
            //     identification,
            //     { dispatch, queryFulfilled }
            // ) {
            //     try {
            //         const res = await queryFulfilled;
            //         dispatch(
            //             extendedApiSlice.util.updateQueryData(
            //                 "getIdentificationsATransporter",
            //                 undefined,
            //                 (draft) => {
            //                     // draft.entities[res.data._id] = res.data
            //                     identificationsAdapter.upsertOne(draft, res.data)
            //                 }
            //             )
            //         );
            //     } catch(err) {
            //         console.log("error", err)
            //         // patchResult.undo();
            //     }
            // }
        }),
        updateManyIdentifications: builder.mutation({
            query: ({ ids, modification }) => ({
                url: '/identification/many',
                method: 'PATCH',
                body: { ids, modification }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Identification', id: "LIST" },
                ...(arg.ids.map(id => ({ type: 'Identification', id })))
            ],
            // async onQueryStarted(
            //     _,
            //     { dispatch, queryFulfilled }
            // ) {
            //     try {
            //         const res = await queryFulfilled;
            //         console.log("update many id°", res.data)
            //         dispatch(
            //             extendedApiSlice.util.updateQueryData(
            //                 "getIdentificationsATransporter",
            //                 undefined,
            //                 (draft) => {
            //                     identificationsAdapter.upsertMany(draft, res.data);
            //                 }
            //             )
            //         );
            //     } catch (err) {
            //         console.log("Error updating identifications:", err);
            //     }
            // },
        }),
    })
})

export const {
    useGetIdentificationsQuery,
    useGetIdentificationsATransporterQuery,
    useGetIdentificationsByRelatedTransportQuery,
    useGetTotalCheptelQuery,
    useCreateIdentificationMutation,
    useUpdateIdentificationMutation,
    useUpdateManyIdentificationsMutation,
} = extendedApiSlice

// instead of extendedApiSlice.endpoints.getIdentifications.select();
const selectIdentificationResult =
    extendedApiSlice.endpoints.getIdentificationsATransporter.select();

const selectIdentificationsData = createSelector(
    selectIdentificationResult,
    (identificationsResult) => identificationsResult.data // normalized state object with ids & entities
);

export const {
    selectAll: selectAllIdentifications,
    selectById: selectIdentificationById,
    selectIds: selectIdentificationIds,
} = identificationsAdapter.getSelectors(
    (state) => selectIdentificationsData(state) ?? initialState
);

const selectIdentificationByTransportResult = (id) =>
    extendedApiSlice.endpoints.getIdentificationsByRelatedTransport.select(id);

const selectIdentificationsByTransportData = (id) => createSelector(
    selectIdentificationByTransportResult(id),
    (identificationsResult) => identificationsResult.data // normalized state object with ids & entities
);

export const createSelectorsOfIdentificationsByTransport = (id) => identificationsAdapter.getSelectors(
    (state) => selectIdentificationsByTransportData(id)(state) ?? initialState
);