import { apiSlice } from '../redux/apiSlice'

const ROOM_URL = '/rooms'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create Room
        roomCreate: builder.mutation({
            query: (data) => ({
                url: `${ROOM_URL}/create`,
                method: 'POST',
                body: data,
            }),
        }),
        // Read Room
        roomRead: builder.mutation({
            query: (data) => ({
                url: `${ROOM_URL}/read/${data?._id}`,
                method: 'GET',
            }),
        }),

        // Add User to the Room
        roomUserJoin: builder.mutation({
            query: (data) => ({
                url: `${ROOM_URL}/user/join/${data.roomId}`,
                method: 'GET',
            }),
        }),

        // saveGameData: builder.mutation({
        //     query: (data) => ({
        //         url: `${ROOM_URL}/data/save`,
        //         method: 'POST',
        //         body: data,
        //     }),
        // }),

        // getGameData: builder.mutation({
        //     query: (roomId) => ({
        //         url: `${ROOM_URL}/data/get/${roomId}`,
        //         method: 'GET',
        //     }),
        // }),
    }),
})

export const {
    useRoomCreateMutation,
    useRoomReadMutation,

    useRoomUserJoinMutation,
    useSaveGameDataMutation,
    useGetGameDataMutation,
} = authApiSlice
