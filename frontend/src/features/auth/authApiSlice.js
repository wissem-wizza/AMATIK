import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    signup: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: { ...userData },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApiSlice;
