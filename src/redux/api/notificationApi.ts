import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (params) => ({
        url: "/notifications/admin-notifications",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.notifications],
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationApi;