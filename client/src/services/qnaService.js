import { apiSlice } from '../redux/apiSlice'

const QNA_URL = '/qna'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Read Room
        qnaRead: builder.mutation({
            query: () => ({
                url: `${QNA_URL}`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useQnaReadMutation } = authApiSlice
