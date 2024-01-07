import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const users = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://apijson-ezj8.onrender.com/' }),

  //End-point to get users
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),

    //End-point to get users by ID
    getUserId: builder.query({
      query: (id) => `users/${id}`,
    }),

    //End-point to get users by email
    getUserByEmail: builder.query({
      query: (email) => `users/${email}`,
    }),

    //End-point to add users
    createUser: builder.mutation({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: newUser,
      }),
    }),
    //End-point to update users
    updateUser: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: updates,
      }),
    }),
    
    //End-point to delete users
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})


/**
 * 
 */


export const {useCreateUserMutation,useGetUserByEmailQuery,useGetUsersQuery,useDeleteUserMutation,useGetUserIdQuery} = users;
