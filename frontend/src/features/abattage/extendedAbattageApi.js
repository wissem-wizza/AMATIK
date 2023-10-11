import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';


const abattagesAdapter = createEntityAdapter({
    selectId: (abattage) => abattage._id,
})

const initialState = abattagesAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAbattages: builder.query({
            query: () => `/abattage`,
            transformResponse: responseData => {
                return abattagesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'Abattage', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Abattage', id }))
            ] : []
        }),
        getAbattageById: builder.query({
            query: (id) => `/abattage/${id}`,
            transformResponse: (responseData) => {
                return abattagesAdapter.upsertOne(initialState, responseData);
            },
            providesTags: (result, error, arg) => result ? [
                ...result.ids.map((id) => ({ type: "Abattage", id })),
            ] : [],
        }),
    })
})

export const {
    useGetAbattagesQuery,
    useGetAbattageByIdQuery,
} = extendedApiSlice

const selectAbattageResult = extendedApiSlice.endpoints.getAbattages.select();

const selectAbattagesData = createSelector(
    selectAbattageResult,
    (abattagesResult) => abattagesResult.data
);

export const {
    selectAll: selectAllAbattages,
    selectById: selectAbattageById,
    selectIds: selectAbattageIds,
} = abattagesAdapter.getSelectors(
    (state) => selectAbattagesData(state) ?? initialState
);