import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';


const facturesAdapter = createEntityAdapter({
    selectId: (facture) => facture._id,
})

const initialState = facturesAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFactures: builder.query({
            query: () => `/facture`,
            transformResponse: responseData => {
                return facturesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'Facture', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Facture', id }))
            ] : []
        }),
        getFactureById: builder.query({
            query: (id) => `/facture/${id}`,
            transformResponse: (responseData) => {
                return facturesAdapter.upsertOne(initialState, responseData);
            },
            providesTags: (result, error, arg) => result ? [
                ...result.ids.map((id) => ({ type: "Facture", id })),
            ] : [],
        }),
        getFactureSelectFields: builder.query({
            query: () => "/facture/select",
        }),
    })
})

export const {
    useGetFacturesQuery,
    useGetFactureByIdQuery,
    useGetFactureSelectFieldsQuery,
} = extendedApiSlice

const selectFactureResult = extendedApiSlice.endpoints.getFactures.select();

const selectFacturesData = createSelector(
    selectFactureResult,
    (facturesResult) => facturesResult.data
);

export const {
    selectAll: selectAllFactures,
    selectById: selectFactureById,
    selectIds: selectFactureIds,
} = facturesAdapter.getSelectors(
    (state) => selectFacturesData(state) ?? initialState
);