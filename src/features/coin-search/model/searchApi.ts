import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/binance/search" }),
  tagTypes: [],
  endpoints: (builder) => ({
    search: builder.query({
      query: (query) => `?query=${query.toUpperCase()}`,
    }),
  }),
});

export const { useLazySearchQuery } = searchApi;