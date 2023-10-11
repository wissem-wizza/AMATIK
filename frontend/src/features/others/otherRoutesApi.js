import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';


const labelsAdapter = createEntityAdapter({
    selectId: (label) => label._id,
})

const naturesAdapter = createEntityAdapter({
    selectId: (nature) => nature._id,
})

const initialState = labelsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getLabels: builder.query({
            query: () => `/other/label`,
            transformResponse: responseData => {
                return labelsAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'Label', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Label', id }))
            ] : []
        }),
        getNatures: builder.query({
            query: () => "/other/nature",
            transformResponse: responseData => {
                return naturesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'Nature', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Nature', id }))
            ] : []
        }),
    })
})

export const {
    useGetLabelsQuery,
    useGetNaturesQuery,
} = extendedApiSlice

const selectLabelResult = extendedApiSlice.endpoints.getLabels.select();

const selectLabelsData = createSelector(
    selectLabelResult,
    (labelsResult) => labelsResult.data
);

export const {
    selectAll: selectAllLabels,
    selectById: selectLabelById,
    selectIds: selectLabelIds,
} = labelsAdapter.getSelectors(
    (state) => selectLabelsData(state) ?? initialState
);

const selectNatureResult = extendedApiSlice.endpoints.getNatures.select();

const selectNaturesData = createSelector(
    selectNatureResult,
    (naturesResult) => naturesResult.data
);

export const {
    selectAll: selectAllNatures,
    selectById: selectNatureById,
    selectIds: selectNatureIds,
} = naturesAdapter.getSelectors(
    (state) => selectNaturesData(state) ?? initialState
);