import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const freelancerRequestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFreelancerRequests: builder.query({
      query: (queries) => ({
        url: "/freelancer-registration/requests",
        method: "GET",
        params: queries,
      }),
      providesTags: [tagTypes.freelanceRequests],
    }),
    updateApprovedStatusFreelancer: builder.mutation({
      query: (id) => ({
        url: `/freelancer-registration/approval-request/${id}`,
        method: "PUT",
        body: { approvalStatus: "approved" },
      }),
      invalidatesTags: [tagTypes.freelanceRequests, tagTypes.users],
    }),
    rejectStatusFreelancer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/freelancer-registration/rejected-request/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.freelanceRequests, tagTypes.users],
    }),
  }),
});

export const {
  useGetAllFreelancerRequestsQuery,
  useUpdateApprovedStatusFreelancerMutation,
  useRejectStatusFreelancerMutation,
} = freelancerRequestApi;
