import { apiSlice } from '../redux/apiSlice'

const AUTH_URL = '/auth'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create User
        userConnect: builder.mutation({
            query: (nickname) => ({
                url: `${AUTH_URL}/connect/${nickname}`,
                method: 'GET',
            }),
        }),

        // Read User
        userRead: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/read/${data?._id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useUserConnectMutation, useUserReadMutation } = authApiSlice
