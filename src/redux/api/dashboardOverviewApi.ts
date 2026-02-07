import { baseApi } from "./baseApi";

const dashboardOverviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/dashboard/overview-stats",
        method: "GET",
      }),
    }),
    getOngoingBookings: builder.query({
      query: (params) => ({
        url: "/bookings/pending-bookings",
        method: "GET",
        params,
      }),
    }),
    upcomingBookings: builder.query({
      query: (params) => ({
        url: "/bookings/upcoming-bookings",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetOngoingBookingsQuery } = dashboardOverviewApi;
