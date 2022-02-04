import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from 'config/config';

export const questionApi = createApi({
  reducerPath: 'questionApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
  tagTypes: ['questions'],
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => '/questions',
      providesTags: ['questions'],
    }),
    postQuestion: builder.mutation({
      query: (data) => ({
        url: '/questions',
        method: 'POST',
        body: { data },
      }),
      invalidatesTags: ['questions'],
    }),
    editQuestion: builder.mutation({
      query: (data, id) => {
        // TODO: Da stavim umesto {} > () kada zavrsim.
        console.log(data, id, 'ID 👀');
        return {
          url: `/questions/${id}`,
          method: 'PUT',
          body: { data },
        };
      },
      invalidatesTags: ['questions'],
    }),
    deleteQuestions: builder.mutation({
      query: (id) => ({ url: `/questions/${id}`, method: 'DELETE' }),
      invalidatesTags: ['questions'],
    }),
  }),
});

export const { usePostQuestionMutation, useGetQuestionsQuery, useDeleteQuestionsMutation } =
  questionApi;
