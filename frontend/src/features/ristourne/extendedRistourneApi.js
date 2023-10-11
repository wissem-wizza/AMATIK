import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';


const ristournesAdapter = createEntityAdapter({
    selectId: (ristourne) => ristourne._id,
    sortComparer: (a, b) => (new Date(b.DATE_ANNONCE) - new Date(a.DATE_ANNONCE))
})

const initialState = ristournesAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getRistournes: builder.query({
            query: () => '/ristourne',
            transformResponse: responseData => {
                return ristournesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'Ristourne', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Ristourne', id }))
            ] : []
        }),
        getRistournesByEleveur: builder.query({
            query: (id) => `/ristourne/eleveur/${id}`,
            transformResponse: responseData => {
                return ristournesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'Ristourne', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Ristourne', id }))
            ] : []
        }),
        getRistourneById: builder.query({
            query: (id) => `/ristourne/${id}`,
            transformResponse: (responseData) => {
                return ristournesAdapter.upsertOne(initialState, responseData);
            },
            providesTags: (result, error, arg) => result ? [
                ...result.ids.map((id) => ({ type: "Ristourne", id })),
            ] : [],
        }),
    })
})

export const {
    useGetRistournesQuery,
    useGetRistournesByEleveurQuery,
    useGetRistourneByIdQuery,
} = extendedApiSlice

// export const selectRistourneData = extendedApiSlice.endpoints.getRistournes.select()
const selectRistourneResult = extendedApiSlice.endpoints.getRistournes.select();


const selectRistournesData = createSelector(
    selectRistourneResult,
    (ristournesResult) => ristournesResult.data // normalized state object with ids & entities
);

export const {
    selectAll: selectAllRistournes,
    selectById: selectRistourneById,
    selectIds: selectRistourneIds,
} = ristournesAdapter.getSelectors(
    (state) => selectRistournesData(state) ?? initialState
);

const selectRistourneByEleveurResult = (eleveur_id) =>
    extendedApiSlice.endpoints.getRistournesByEleveur.select(eleveur_id);
const selectRistournesByEleveurData = (eleveur_id) =>
    createSelector(
        selectRistourneByEleveurResult(eleveur_id),
        (ristournesResult) => ristournesResult.data // normalized state object with ids & entities
    );
export const {
    selectAll: selectAllRistournesByEleveur,
    selectById: selectSingleEleveurRistourneById,
} = ristournesAdapter.getSelectors(
    (state) => {
        return selectRistournesByEleveurData(state.auth.user.eleveur_id)(state) ?? initialState
    }
);