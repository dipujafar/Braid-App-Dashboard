import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const salonOwnerRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSalonOwnerRequests: builder.query({
      query: (queries) => ({
        url: "/owner-registration/requests",
        method: "GET",
        params: queries,
      }),
      providesTags: [tagTypes.salonRequests],
    }),
    updateApprovedStatusSalon: builder.mutation({
      query: (id) => ({
        url: `/owner-registration/approval-request/${id}`,
        method: "PUT",
        body: { approvalStatus: "approved" },
      }),
      invalidatesTags: [tagTypes.salonRequests, tagTypes.users],
    }),
    rejectStatusSalon: builder.mutation({
      query: ({ id, data }) => ({
        url: `/owner-registration/rejected-request/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.salonRequests, tagTypes.users],
    }),
    getStat: builder.query({
      query: () => ({
        url: "/dashboard/request-stats",
        method: "GET",
      }),
      providesTags: [tagTypes.salonRequests],
    }),
  }),
});

export const {
  useGetAllSalonOwnerRequestsQuery,
  useUpdateApprovedStatusSalonMutation,
  useRejectStatusSalonMutation,
  useGetStatQuery,
} = salonOwnerRequestApi;
