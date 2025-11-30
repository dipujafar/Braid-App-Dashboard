import { baseApi } from "./baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBookings: build.query({
      query: (queries) => ({
        url: "/bookings/all",
        method: "GET",
        params: queries,
      }),
    }),
  }),
});

export const { useGetAllBookingsQuery } = bookingApi;