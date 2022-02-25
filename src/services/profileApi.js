import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from 'config/config';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/api` }),
  tagTypes: ['profiles'],
  endpoints: (builder) => ({
    getProfiles: builder.query({
      query: () => '/profiles',
      providesTags: ['profiles'],
    }),
    getProfile: builder.query({
      query: (id) => `/profiles/${id}`,
      providesTags: ['profiles'],
    }),
    getProfileImg: builder.query({
      query: (id) => `/upload/files/${id}`,
      providesTags: ['profiles'],
    }),
    postProfile: builder.mutation({
      query: (data) => ({
        url: '/profiles',
        method: 'POST',
        body: { data },
      }),
      invalidatesTags: ['profiles'],
    }),
    editProfile: builder.mutation({
      query: ({ profileId: id, profileData: data }) => ({
        url: `/profiles/${id}`,
        method: 'PUT',
        body: { data },
      }),
      invalidatesTags: ['profiles'],
    }),
    deleteProfile: builder.mutation({
      query: (id) => ({ url: `/profiles/${id}`, method: 'DELETE' }),
      invalidatesTags: ['profiles'],
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useGetProfileQuery,
  useGetProfileImgQuery,
  usePostProfileMutation,
  useDeleteProfileMutation,
  useEditProfileMutation,
} = profileApi;
