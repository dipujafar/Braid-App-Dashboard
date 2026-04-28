import { baseApi } from "./baseApi";

const priceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPrice: build.query({
      query: (queries) => ({
        url: "/prices",
        method: "GET",
        params: queries,
      }),
    }),
    updatePrice: build.mutation({
      query: (data) => ({
        url: "/prices",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const { useGetPriceQuery, useUpdatePriceMutation } = priceApi;
