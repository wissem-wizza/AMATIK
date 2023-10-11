import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';


const partSocialesAdapter = createEntityAdapter({
    selectId: (partSociale) => partSociale._id,
})

const initialState = partSocialesAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPartSociales: builder.query({
            query: () => `/part_sociale`,
            transformResponse: responseData => {
                return partSocialesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'PartSociale', id: "LIST" },
                ...result.ids.map(id => ({ type: 'PartSociale', id }))
            ] : []
        }),
        getPartSocialesByEleveur: builder.query({
            query: (id) => `/part_sociale/eleveur/${id}`,
            transformResponse: responseData => {
                return partSocialesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'PartSociale', id: "LIST" },
                ...result.ids.map(id => ({ type: 'PartSociale', id }))
            ] : []
        }),
        getPartSocialeById: builder.query({
            query: (id) => `/part_sociale/${id}`,
            transformResponse: (responseData) => {
                return partSocialesAdapter.upsertOne(initialState, responseData);
            },
            providesTags: (result, error, arg) => result ? [
                ...result.ids.map((id) => ({ type: "PartSociale", id })),
            ] : [],
        }),
    })
})

export const {
    useGetPartSocialesQuery,
    useGetPartSocialeByIdQuery,
    useGetPartSocialesByEleveurQuery,
} = extendedApiSlice

const selectPartSocialeResult = extendedApiSlice.endpoints.getPartSociales.select();

const selectPartSocialesData = createSelector(
    selectPartSocialeResult,
    (partSocialesResult) => partSocialesResult.data
);

export const {
    selectAll: selectAllPartSociales,
    selectById: selectPartSocialeById,
    selectIds: selectPartSocialeIds,
} = partSocialesAdapter.getSelectors(
    (state) => selectPartSocialesData(state) ?? initialState
);

const selectPartSocialeByEleveurResult = (eleveur_id) =>
    extendedApiSlice.endpoints.getPartSocialesByEleveur.select(eleveur_id);
const selectPartSocialesByEleveurData = (eleveur_id) =>
    createSelector(
        selectPartSocialeByEleveurResult(eleveur_id),
        (partSocialesResult) => partSocialesResult.data // normalized state object with ids & entities
    );
export const {
    selectAll: selectAllPartSocialesByEleveur,
    selectById: selectSingleEleveurPartSocialeById,
} = partSocialesAdapter.getSelectors(
    (state) => {
        return selectPartSocialesByEleveurData(state.auth.user.eleveur_id)(state) ?? initialState
    }
);