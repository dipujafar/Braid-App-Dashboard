import { baseApi } from "./baseApi";

const serverBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
   createCustomer: builder.mutation({
      query: (params) => ({
        url: "/users/admin/create-customer",
        method: "POST",
        body: params,
      }),
    }),
  }),
});
export const { useCreateCustomerMutation } = serverBookingApi;