import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), 
  endpoints: (builder) => ({
    addnotes: builder.mutation({
      query: (newItems) => ({
        url: '/notes',
        method: 'POST',
        body: newItems,
      }),
    }),
    getNotes: builder.query({
      query: (id) => ({
        url: `notes/${id}`,
        method:"GET"
      }),
    }),
    updateNotes: builder.mutation({
      query: (id) => ({
        url: `notes/${id}`,
        method:"PATCH"
      }),
    }),
    deleteNotes: builder.mutation({
      query: (id) => ({
        url: `notes/${id}`,
        method:"DELETE"
      }),
    }),
  }),
});

export const {
  useAddnotesMutation,
  useGetNotesQuery,
  useUpdateNotesMutation,
  useDeleteNotesMutation
} = userApi;
