import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategories: builder.mutation({
      query: (data) => ({
        url: "/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.categories],
    }),
    getCategories: builder.query({
      query: (query) => ({
        url: "/categories",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.categories],
    }),
    getCategoryById: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.categories],
    }),
    deleteCategories: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.categories],
    }),
    editCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.categories],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoriesMutation,
  useDeleteCategoriesMutation,
  useEditCategoryMutation,
  useGetCategoryByIdQuery,
} = categoriesApi;
