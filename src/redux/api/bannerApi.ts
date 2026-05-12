import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBanner: build.query({
      query: () => ({
        url: "/banner",
        method: "GET",
      }),
      providesTags: [tagTypes.banner],
    }),
    updateLoginBanner: build.mutation({
      query: (data) => ({
        url: "/banner/login",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),
    updateSignUpBanner: build.mutation({
      query: (data) => ({
        url: "/banner/signup",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.banner],
    }),
  }),
});

export const {
  useGetBannerQuery,
  useUpdateLoginBannerMutation,
  useUpdateSignUpBannerMutation,
} = bannerApi;
