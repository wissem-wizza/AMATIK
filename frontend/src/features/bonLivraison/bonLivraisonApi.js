import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';


const bonLivraisonsAdapter = createEntityAdapter({
    selectId: (bon) => bon._id,
})

const initialState = bonLivraisonsAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBonLivraisons: builder.query({
            query: () => `/bon_livraison`,
            transformResponse: responseData => {
                return bonLivraisonsAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'BonLivraison', id: "LIST" },
                ...result.ids.map(id => ({ type: 'BonLivraison', id }))
            ] : []
        }),
        getBonLivraisonById: builder.query({
            query: (id) => `/bon_livraison/${id}`,
            transformResponse: (responseData) => {
                return bonLivraisonsAdapter.upsertOne(initialState, responseData);
            },
            providesTags: (result, error, arg) => result ? [
                ...result.ids.map((id) => ({ type: "BonLivraison", id })),
            ] : [],
        }),
        getBonLivraisonSelectFields: builder.query({
            query: () => "/bon_livraison/select",
        }),
    })
})

export const {
    useGetBonLivraisonsQuery,
    useGetBonLivraisonByIdQuery,
    useGetBonLivraisonSelectFieldsQuery,
} = extendedApiSlice

const selectBonLivraisonResult = extendedApiSlice.endpoints.getBonLivraisons.select();

const selectBonLivraisonsData = createSelector(
    selectBonLivraisonResult,
    (bonLivraisonsResult) => bonLivraisonsResult.data
);

export const {
    selectAll: selectAllBonLivraisons,
    selectById: selectBonLivraisonById,
    selectIds: selectBonLivraisonIds,
} = bonLivraisonsAdapter.getSelectors(
    (state) => selectBonLivraisonsData(state) ?? initialState
);