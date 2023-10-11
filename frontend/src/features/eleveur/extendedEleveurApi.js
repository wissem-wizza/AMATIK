import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';

const eleveursAdapter = createEntityAdapter({
  selectId: (eleveur) => eleveur._id,
  sortComparer: (a, b) => {
    const parsedA = parseInt(a.CHEPTEL);
    const parsedB = parseInt(b.CHEPTEL);

    if (isNaN(parsedA) && isNaN(parsedB)) {
      return b - a;
    } else if (isNaN(parsedA)) {
      return 1;
    } else if (isNaN(parsedB)) {
      return -1;
    }
    return parsedB - parsedA;
  },
});

const initialState = eleveursAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEleveurs: builder.query({
      query: (fields) => `/eleveur${fields ? "?fields=" + fields : ""}`,
      transformResponse: (responseData) => {
        return eleveursAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              { type: "Eleveur", id: "LIST" },
              ...result.ids.map((id) => ({ type: "Eleveur", id })),
            ]
          : [],
    }),
    getEleveursName: builder.query({
      query: () => "/eleveur/name",
    }),
    getTotalEleveurs: builder.query({
      query: () => "/eleveur/total",
    }),
    getEleveurById: builder.query({
      query: (id) => `/eleveur/${id}`,
      transformResponse: (responseData) => {
        return eleveursAdapter.upsertOne(initialState, responseData);
      },
      providesTags: (result, error, arg) =>
        result ? [...result.ids.map((id) => ({ type: "Eleveur", id }))] : [],
    }),
    createEleveur: builder.mutation({
      query: (eleveur) => ({
        url: `/eleveur`,
        method: "POST",
        body: eleveur,
      }),
      async onQueryStarted(eleveur, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getEleveurs",
              undefined,
              (draft) => {
                eleveursAdapter.addOne(draft, res.data)
              }
            )
          );
        } catch {
          // patchResult.undo();
        }
      },
    }),
    updateEleveur: builder.mutation({
      query: ({ id, ...eleveur }) => ({
        url: `/eleveur/${id}`,
        method: "PATCH",
        body: eleveur,
      }),
      async onQueryStarted(eleveur, { dispatch, queryFulfilled }) {
        try {
          const res = await queryFulfilled;
          dispatch(
            extendedApiSlice.util.updateQueryData(
              "getEleveurs",
              undefined,
              (draft) => {
                // draft.entities[res.data._id] = res.data
                eleveursAdapter.upsertOne(draft, res.data)
              }
            )
          );
          dispatch( // needed when we back to edit eleveur AGAIN
            extendedApiSlice.util.updateQueryData(
              "getEleveurById",
              eleveur.id,
              (draft) => {
                eleveursAdapter.upsertOne(draft, res.data)
              }
            )
          );
        } catch (err) {
          console.log("error", err);
          // patchResult.undo();
        }
      },
      invalidatesTags: (result, error, arg) => [
        { type: "Eleveur", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetEleveursQuery,
  useGetEleveursNameQuery,
  useGetTotalEleveursQuery,
  useGetEleveurByIdQuery,
  useCreateEleveurMutation,
  useUpdateEleveurMutation,
} = extendedApiSlice;

// select() argument should be a variable that change value with the request?
const selectEleveurResult = extendedApiSlice.endpoints.getEleveurs.select();
const selectEleveurExcerptResult =
  extendedApiSlice.endpoints.getEleveurs.select("NOM,CLE,email");

const selectEleveursData = createSelector(
  selectEleveurResult,
  (eleveursResult) => eleveursResult.data
);
const selectEleveursExcerptData = createSelector(
  selectEleveurExcerptResult,
  (eleveursResult) => eleveursResult.data
);

export const {
  selectAll: selectAllEleveurs,
  selectById: selectEleveurById,
  selectIds: selectEleveurIds,
} = eleveursAdapter.getSelectors(
  (state) => selectEleveursData(state) ?? initialState
);
export const { selectAll: selectAllEleveursExcerpt } =
  eleveursAdapter.getSelectors(
    (state) => selectEleveursExcerptData(state) ?? initialState
  );
