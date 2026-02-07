import { baseApi } from "./baseApi";

const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnings: builder.query({
      query: () => ({
        url: "/dashboard/earnings-stats",
        method: "GET",
      }),
    }),
    getTransitionHistory: builder.query({
      query: (params) => ({
        url: "/payments/transactions",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetEarningsQuery, useGetTransitionHistoryQuery } = earningApi;
