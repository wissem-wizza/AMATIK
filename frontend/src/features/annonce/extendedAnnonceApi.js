import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { current } from "immer";

const annoncesAdapter = createEntityAdapter({
  selectId: (annonce) => annonce._id,
  sortComparer: (a, b) => b.NUM_ENREGIST - a.NUM_ENREGIST,
});

const initialState = annoncesAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAnnonces: builder.query({
            query: () => '/annonce',
            transformResponse: responseData => {
                return annoncesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'Annonce', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Annonce', id }))
            ] : []
        }),
        getAnnoncesByEleveur: builder.query({
            query: (id) => `/annonce/eleveur/${id}`,
            transformResponse: responseData => {
                return annoncesAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'Annonce', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Annonce', id }))
            ] : []
        }),
        getAnnonceById: builder.query({
            query: (id) => `/annonce/${id}`,
            transformResponse: (responseData) => {
                return annoncesAdapter.upsertOne(initialState, responseData);
            },
            providesTags: (result, error, arg) => result ? [
                ...result.ids.map((id) => ({ type: "Annonce", id })),
            ] : [],
        }),
        getAnnonceSelectFields: builder.query({
            query: () => "/annonce/select",
        }),
        createAnnonce: builder.mutation({
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
                            "getAnnoncesByEleveur", // only the eleveur can create annonce
                            res.data.eleveur_id,
                            (draft) => {
                                // draft.ids.push(res.data._id)
                                // draft.entities[res.data._id] = {...annonce, _id: res.data._id}
                                annoncesAdapter.addOne(draft, res.data)
                            }
                        )
                    );
                } catch(err) {
                    console.log("error", err)
                    // patchResult.undo();
                }
            },
        }),
        updateAnnonce: builder.mutation({
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
                    dispatch( // needed when supervisor validate annonce
                        extendedApiSlice.util.updateQueryData(
                            "getAnnonces",
                            undefined,
                            (draft) => {
                                // draft.entities[res.data._id] = res.data
                                annoncesAdapter.upsertOne(draft, res.data)
                            }
                        )
                    );
                    dispatch( // needed when eleveur update HIS annonce
                        extendedApiSlice.util.updateQueryData(
                            "getAnnoncesByEleveur",
                            annonce.eleveur_id,
                            (draft) => {
                                console.log("in", current(draft), "data", res.data)
                                annoncesAdapter.upsertOne(draft, res.data)
                            }
                        )
                    );
                    dispatch( // needed when eleveur back to edit his annonce AGAIN
                        extendedApiSlice.util.updateQueryData(
                            "getAnnonceById",
                            annonce.id,
                            (draft) => {
                                annoncesAdapter.upsertOne(draft, res.data)
                            }
                        )
                    );
                } catch(err) {
                    console.log("error", err)
                    // patchResult.undo();
                }
            },
            // arg = { "id": "650ab0a1a4500c6ca1e90904", "EtatAnnonce": "Rejeté" }
            // invalidatesTags: (result, error, arg) => [
            //     { type: 'Annonce', id: arg.id }
            // ]
        }),
        deleteAnnonce: builder.mutation({
            query: (id) => ({
                url: `/annonce/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(
                annonce_id,
                { dispatch, queryFulfilled }
            ) {
                try {
                    const res = await queryFulfilled;
                    dispatch( // needed when eleveur update HIS annonce
                        extendedApiSlice.util.updateQueryData(
                            "getAnnoncesByEleveur",
                            res.data.eleveur_id,
                            (draft) => {
                                annoncesAdapter.removeOne(draft, res.data._id)
                            }
                        )
                    );
                    dispatch( // needed when eleveur back to edit his annonce AGAIN
                        extendedApiSlice.util.updateQueryData(
                            "getAnnonceById",
                            annonce_id,
                            (draft) => {
                                annoncesAdapter.removeOne(draft, res.data)
                            }
                        )
                    );
                } catch(err) {
                    console.log("error", err)
                    // patchResult.undo();
                }
            },
        }),
        getAnnonceStatistics: builder.query({
            query: () => "/annonce/statistics",
        }),
        getAnnonceEtat: builder.query({
            query: () => "/annonce/etat",
        })
    })
})

export const {
    useGetAnnoncesQuery,
    useGetAnnoncesByEleveurQuery,
    useGetAnnonceByIdQuery,
    useGetAnnonceSelectFieldsQuery,
    useCreateAnnonceMutation,
    useUpdateAnnonceMutation,
    useDeleteAnnonceMutation,
    useGetAnnonceStatisticsQuery,
    useGetAnnonceEtatQuery,
} = extendedApiSlice


// selectors for getAnnonces query
const selectAnnonceResult = extendedApiSlice.endpoints.getAnnonces.select();
const selectAnnoncesData = createSelector(
  selectAnnonceResult,
  (annoncesResult) => annoncesResult.data // normalized state object with ids & entities
);
export const {
  selectAll: selectAllAnnonces,
  selectById: selectAnnonceFromListById,
  selectIds: selectAnnonceIds,
} = annoncesAdapter.getSelectors(
  (state) => selectAnnoncesData(state) ?? initialState
);

// selectors for getAnnoncesByEleveur query
const selectAnnonceByEleveurResult = (eleveur_id) =>
  extendedApiSlice.endpoints.getAnnoncesByEleveur.select(eleveur_id);
const selectAnnoncesByEleveurData = (eleveur_id) =>
  createSelector(
    selectAnnonceByEleveurResult(eleveur_id),
    (annoncesResult) => annoncesResult.data // normalized state object with ids & entities
  );
export const {
  selectAll: selectAllAnnoncesByEleveur,
  selectById: selectSingleEleveurAnnonceById,
} = annoncesAdapter.getSelectors((state) => {
  return (
    selectAnnoncesByEleveurData(state.auth.user.eleveur_id)(state) ??
    initialState
  );
});

// selectors for getAnnoncesByEleveur query
const selectAnnonceByIdResult = (annonce_id) =>
  extendedApiSlice.endpoints.getAnnoncesByEleveur.select(annonce_id);
const selectAnnonceByIdData = (annonce_id) =>
  createSelector(
    selectAnnonceByIdResult(annonce_id),
    (annoncesResult) => annoncesResult.data // normalized state object with ids & entities
  );
export const { selectById: selectAnnonceById } = annoncesAdapter.getSelectors(
  (state) => {
    // stupidest code in the galaxy ..useState or params instead ??
    const str = Object.keys(state.api.subscriptions).find((key) =>
      key.includes("getAnnonceById")
    );
    const pattern = /getAnnonceById\("([a-fA-F0-9]+)"\)/;
    const match = str.match(pattern);
    return selectAnnonceByIdData(match[1])(state) ?? initialState;
  }
);
