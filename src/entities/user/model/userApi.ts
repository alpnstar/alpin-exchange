import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserAccountInfo, UserAccountInfoUpdate } from "./types";
import { updateAccountInfoByStream } from "@/entities/user/model/userSlice";
import { UserSocket, UserSocketEvent } from "@/entities/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/binance/private" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAccountInfo: builder.query<UserAccountInfo, void>({
      query: () => "account?omitZeroBalances=true",
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, dispatch },
      ) {
        try {
          await cacheDataLoaded;
          const ws = UserSocket.getInstance();
          const handler = (data: {event: UserAccountInfoUpdate}) => {
            dispatch(updateAccountInfoByStream(data));
          };
          ws.connect();
          ws.on(UserSocketEvent.OUTBOUND_ACCOUNT_POSITION, handler);
          await cacheEntryRemoved;
          ws.off(UserSocketEvent.OUTBOUND_ACCOUNT_POSITION, handler)
        } catch (error) {
          console.error(error);
        }
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetAccountInfoQuery } = userApi;
