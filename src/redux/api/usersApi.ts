import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (queries) => ({
        url: "/users",
        method: "GET",
        params: queries,
      }),
      providesTags: [tagTypes.users],
    }),
    userStatusChange: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/change-status/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const { useGetAllUsersQuery, useUserStatusChangeMutation } = userApi;
