import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const announcementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAnnouncement: build.query({
      query: (queries) => ({
        url: "/announcement",
        method: "GET",
        params: queries,
      }),
      providesTags: [tagTypes.announcements],
    }),
    uploadAnnouncement: build.mutation({
      query: (data) => ({
        url: "/announcement",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.announcements],
    }),
    deleteAnnouncement: build.mutation({
      query: (id) => ({
        url: `/announcement/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.announcements],
    }),
  }),
});

export const {
  useGetAnnouncementQuery,
  useUploadAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;
