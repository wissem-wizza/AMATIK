import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";


export const parametresDiversApi = createApi({
    reducerPath: "parametres_divers",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:4000/api/",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token || Cookies.get("jwt");
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // Fetch a single parametres_divers by ID
        getParametresDiversById: builder.query({
            query: (id) => `/parametres_divers/${id}`,
        }),
        // Create a new record
        createParametresDivers: builder.mutation({
            query: (parametres_divers) => ({
            url: "/parametres_divers",
            method: "POST",
            body: parametres_divers,
            }),
        }),
    }),
    keepUnusedDataFor: 0, // no duplicate ids should be passed, got new one with each request 
});

export const {
    useGetParametresDiversByIdQuery,
    useCreateParametresDiversMutation,
} = parametresDiversApi;
