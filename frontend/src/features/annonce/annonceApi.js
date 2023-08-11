import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const annonceApi = createApi({
  reducerPath: "annonce",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/api/" }),
  endpoints: (builder) => ({
    // Fetch all annonces
    getAnnonces: builder.query({
      query: ({ DATE_D, DATE_F, CLE, RACE }) => {
        const queryParams = new URLSearchParams({
          DATE_D: DATE_D,
          DATE_F: DATE_F,
          CLE: CLE,
          RACE: RACE,
        });
        console.log("QUERY----------", DATE_D, DATE_F, CLE, RACE);
        return `/annonce?${queryParams.toString()}`;
      },
    }),

    // Fetch a single annonce by ID
    getAnnonceById: builder.query({
      query: (id) => `/annonce/${id}`,
    }),
  }),
});

export const {
  useGetAnnoncesQuery,
  // useGetAnnonceByIdQuery,
  // useCreateAnnonceMutation,
  // useDeleteAnnonceMutation,
  // useUpdateAnnonceMutation,
} = annonceApi;
