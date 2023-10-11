import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
// import { current } from 'immer';


const usersAdapter = createEntityAdapter({
    selectId: (user) => user._id,
})

const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => `/user`,
            transformResponse: responseData => {
                return usersAdapter.setAll(initialState, responseData)
            },
            providesTags: (result, error, arg) => result ? [
                { type: 'User', id: "LIST" },
                ...result.ids.map(id => ({ type: 'User', id }))
            ] : []
        }),
        getUsersName: builder.query({
            query: () => "/user/name",
        }),
        getUserById: builder.query({
            query: (id) => `/user/${id}`,
            transformResponse: (responseData) => {
                return usersAdapter.upsertOne(initialState, responseData);
            },
            providesTags: (result, error, arg) => result ? [
                ...result.ids.map((id) => ({ type: "User", id })),
            ] : [],
        }),
        updateUser: builder.mutation({
            query: ({ id, ...user }) => ({
                url: `/user/${id}`,
                method: 'PATCH',
                body: user
            }),
            async onQueryStarted(
                user,
                { dispatch, queryFulfilled }
            ) {
                try {
                    const res = await queryFulfilled;
                    dispatch(
                        extendedApiSlice.util.updateQueryData(
                            "getUsers",
                            undefined,
                            (draft) => {
                                draft.entities[res.data._id] = res.data
                            }
                        )
                    );
                } catch(err) {
                    console.log("error", err)
                    // patchResult.undo();
                }
            },
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    })
})

export const {
    useGetUsersQuery,
    useGetUsersNameQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
} = extendedApiSlice

const selectUserResult = extendedApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
    selectUserResult,
    (usersResult) => usersResult.data
);

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
} = usersAdapter.getSelectors(
    (state) => selectUsersData(state) ?? initialState
);