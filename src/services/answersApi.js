import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from 'config/config';

export const answersApi = createApi({
  reducerPath: 'answersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
  tagTypes: ['answers'],
  endpoints: (builder) => ({
    getAnswers: builder.query({
      query: () => '/answers',
      providesTags: ['answers'],
    }),
    postAnswer: builder.mutation({
      query: (data) => ({
        url: '/answers',
        method: 'POST',
        body: { data },
      }),
      invalidatesTags: ['answers'],
    }),
  }),
});

export const { useGetAnswersQuery, usePostAnswerMutation } = answersApi;
