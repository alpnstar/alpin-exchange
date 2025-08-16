import { createApi } from "@reduxjs/toolkit/query/react";
import { UserAccountInfo, UserAccountInfoUpdate } from "./types";
import {
  setApiKeys,
  updateAccountInfoByStream,
} from "@/entities/user/model/userSlice";
import { UserSocket, UserSocketEvent } from "@/entities/user";
import { RootState } from "@/app/providers/StoreProvider";
import { privateApiBaseQuery } from "@/shared/api/private-base-query";
import { userKeysStorage } from "@/entities/user/model/userStorage";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: privateApiBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getAccountInfo: builder.query<UserAccountInfo, void>({
      query: () => "account?omitZeroBalances=true",
      keepUnusedDataFor: 0,
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, getState },
      ) {
        try {
          await cacheDataLoaded;
          const state = getState() as RootState;
          const { publicKey, secretKey } = state.user;
          if (publicKey !== null && secretKey !== null) {
            const ws = UserSocket.getInstance(publicKey, secretKey);
            const handler = (data: { event: UserAccountInfoUpdate }) => {
              dispatch(updateAccountInfoByStream(data));
            };
            ws.connect();
            ws.on(UserSocketEvent.OUTBOUND_ACCOUNT_POSITION, handler);
            await cacheEntryRemoved;
            ws.off(UserSocketEvent.OUTBOUND_ACCOUNT_POSITION, handler);
          }
        } catch (error) {
          console.error(error);
        }
      },
      providesTags: ["User"],
    }),
    checkApiKeys: builder.mutation<
      { success: boolean },
      { publicKey: string; secretKey: string }
    >({
      queryFn: async ({ publicKey, secretKey }, { dispatch }) => {
        try {
          const response = await fetch("/api/binance/private/account", {
            method: "GET",
            headers: {
              "X-API-KEY": publicKey,
              "X-SECRET-KEY": secretKey,
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            return { error: { status: response.status, data: errorData } };
          }

          const keys = { publicKey, secretKey };
          dispatch(setApiKeys(keys));
          userKeysStorage.set(keys);

          return { data: { success: true } };
        } catch (error) {
          return { error: { status: "FETCH_ERROR", error: "Network error" } };
        }
      },
    }),
  }),
});

export const { useLazyGetAccountInfoQuery, useCheckApiKeysMutation } = userApi;
