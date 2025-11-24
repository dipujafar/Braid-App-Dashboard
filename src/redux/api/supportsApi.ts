import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSupports: builder.query({
      query: (queries) => ({
        url: "/supports",
        method: "GET",
        params: queries,
      }),
      providesTags: [tagTypes.support],
    }),
    getSingleSupportDetails: builder.query({
      query: (id) => ({
        url: `/supports/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.support],
    }),
    sendReply: builder.mutation({
      query: ({ id, data }) => ({
        url: `/supports/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.support],
    }),
  }),
});

export const {
  useGetAllSupportsQuery,
  useGetSingleSupportDetailsQuery,
  useSendReplyMutation,
} = supportApi;
