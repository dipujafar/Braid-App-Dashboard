import { baseApi } from "./baseApi";

const servicingNowPanelApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServicingNowPanel: builder.query({
            query: (params) => ({
                url: "/bookings/servicing-now-panel",
                method: "GET",
                params,
            }),
        }),
    })
});

export const { useGetServicingNowPanelQuery } = servicingNowPanelApi;