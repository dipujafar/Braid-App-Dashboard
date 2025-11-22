import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const subCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubCategories: builder.mutation({
      query: (data) => ({
        url: "/subcategories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.subCategories],
    }),
    getSubCategories: builder.query({
      query: ({ query, id }) => ({
        url: `/subcategories?category=${id}`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.subCategories],
    }),
    deleteSubCategories: builder.mutation({
      query: (id) => ({
        url: `/subcategories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.subCategories],
    }),
    editSubCategories: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subcategories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.subCategories],
    }),
  }),
});

export const {
  useCreateSubCategoriesMutation,
  useGetSubCategoriesQuery,
  useDeleteSubCategoriesMutation,
  useEditSubCategoriesMutation,
} = subCategoriesApi;
