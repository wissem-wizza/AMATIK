import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';


const annoncesLaineAdapter = createEntityAdapter({
    selectId: (annonce) => annonce._id,
    sortComparer: (a, b) => b.NUM_ENREGIST - a.NUM_ENREGIST
})

const initialState = annoncesLaineAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAnnoncesLaine: builder.query({
            query: () => '/annonce_laine',
            transformResponse: responseData => {
                return annoncesLaineAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'AnnonceLaine', id: "LIST" },
                ...result.ids.map(id => ({ type: 'AnnonceLaine', id }))
            ] : []
        }),
        getAnnoncesLaineByEleveur: builder.query({
            query: (id) => `/annonce_laine/eleveur/${id}`,
            transformResponse: responseData => {
                return annoncesLaineAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'AnnonceLaine', id: "LIST" },
                ...result.ids.map(id => ({ type: 'AnnonceLaine', id }))
            ] : []
        }),
        getAnnonceLaineById: builder.query({
            query: (id) => `/annonce/${id}`, // NOT /annonce_laine
            transformResponse: (responseData) => {
                return annoncesLaineAdapter.upsertOne(initialState, responseData);
            },
            providesTags: (result, error, arg) => result ? [
                ...result.ids.map((id) => ({ type: "AnnonceLaine", id })),
            ] : [],
        }),
        createAnnonceLaine: builder.mutation({
            query: (annonce) => ({
                url: `/annonce`,
                method: 'POST',
                body: annonce
            }),
            async onQueryStarted(
                annonce,
                { dispatch, queryFulfilled }
            ) {
                try {
                    const res = await queryFulfilled;
                    // this should be before "try" block (so we can undo() it in "catch" block)
                    // I was forced to include it here to have access to _id value
                    dispatch(
                        extendedApiSlice.util.updateQueryData(
                            "getAnnoncesLaineByEleveur",
                            annonce.eleveur_id,
                            (draft) => {
                                // draft.ids.push(res.data._id)
                                // draft.entities[res.data._id] = {...annonce, _id: res.data._id}
                                annoncesLaineAdapter.addOne(draft, res.data)
                            }
                        )
                    );
                } catch(err) {
                    console.log("error", err)
                    // patchResult.undo();
                }
            },
        }),
        updateAnnonceLaine: builder.mutation({
            query: ({ id, ...annonce }) => ({
                url: `/annonce/${id}`,
                method: 'PATCH',
                body: annonce
            }),
            async onQueryStarted(
                annonce,
                { dispatch, queryFulfilled }
            ) {
                try {
                    const res = await queryFulfilled;
                    dispatch(
                        extendedApiSlice.util.updateQueryData(
                            "getAnnoncesLaine", // what if I got "annonce" from "getAnnonceLaineById"?
                            undefined,
                            (draft) => {
                                // draft.entities[res.data._id] = res.data
                                annoncesLaineAdapter.upsertOne(draft, res.data)
                            }
                        )
                    );
                } catch(err) {
                    console.log("error", err)
                    // patchResult.undo();
                }
            },
            // arg = { "id": "650ab0a1a4500c6ca1e90904", "EtatAnnonce": "Rejeté" }
            invalidatesTags: (result, error, arg) => [
                { type: 'AnnonceLaine', id: arg.id }
            ]
        }),
        getAnnonceLaineSelectFields: builder.query({
            query: () => "/annonce_laine/select",
        }),
    })
})

export const {
    useGetAnnoncesLaineQuery,
    useGetAnnoncesLaineByEleveurQuery,
    useGetAnnonceLaineByIdQuery,
    useCreateAnnonceLaineMutation,
    useUpdateAnnonceLaineMutation,
    useGetAnnonceLaineSelectFieldsQuery,
} = extendedApiSlice


const selectAnnonceLaineResult = extendedApiSlice.endpoints.getAnnoncesLaine.select();


const selectAnnoncesLaineData = createSelector(
    selectAnnonceLaineResult,
    (annoncesResult) => annoncesResult.data // normalized state object with ids & entities
);

export const {
    selectAll: selectAllAnnoncesLaine,
    selectById: selectAnnonceLaineById,
    selectIds: selectAnnonceLaineIds,
} = annoncesLaineAdapter.getSelectors(
    (state) => selectAnnoncesLaineData(state) ?? initialState
);

const selectAnnonceLaineByEleveurResult = (eleveur_id) =>
    extendedApiSlice.endpoints.getAnnoncesLaineByEleveur.select(eleveur_id);
const selectAnnoncesLaineByEleveurData = (eleveur_id) =>
    createSelector(
        selectAnnonceLaineByEleveurResult(eleveur_id),
        (annoncesResult) => annoncesResult.data // normalized state object with ids & entities
    );
export const {
    selectAll: selectAllAnnoncesLaineByEleveur,
    selectById: selectSingleEleveurAnnonceLaineById,
} = annoncesLaineAdapter.getSelectors(
    (state) => selectAnnoncesLaineByEleveurData(state.auth.user.eleveur_id)(state) ?? initialState
);

const selectLaineOptionsResult = extendedApiSlice.endpoints.getAnnonceLaineSelectFields.select();

const selectLaineOptionsData = createSelector(
    selectLaineOptionsResult,
    (optionsResult) => optionsResult.data
);

export const {
    selectAll: selectAllLaineOptions,
} = annoncesLaineAdapter.getSelectors(
    (state) => selectLaineOptionsData(state) ?? initialState
);