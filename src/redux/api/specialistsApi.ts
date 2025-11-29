import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const specialistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSpecialists: builder.query({
      query: (id) => ({
        url: `/specialists?owner=${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.specialists],
    }),
  }),
});


 export const { useGetSpecialistsQuery } = specialistsApi;
