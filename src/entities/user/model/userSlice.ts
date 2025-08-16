import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  UserAccountInfo,
  UserAccountInfoUpdate,
  userApi,
} from "@/entities/user";
import { userKeysStorage } from "./userStorage";

interface userState {
  authorized: boolean;
  secretKey: string | null;
  publicKey: string | null;
  accountInfo: UserAccountInfo | null;
}

const initialState: userState = {
  secretKey: null,
  publicKey: null,
  authorized: false,
  accountInfo: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initAuthData: (state) => {
      const keys = userKeysStorage.get();
      if (keys) {
        state.publicKey = keys.publicKey;
        state.secretKey = keys.secretKey;
        state.authorized = true;
      }
    },
    updateAccountInfoByStream: (
      state,
      action: PayloadAction<{ event: UserAccountInfoUpdate }>,
    ) => {
      if (state.accountInfo) {
        const accountInfo = state.accountInfo;
        action.payload.event.B.forEach((item) => {
          const index = accountInfo.balances.findIndex(
            (balance) => balance.asset === item.a,
          );

          if (index === -1) {
            accountInfo.balances.push({
              asset: item.a,
              free: item.f,
              locked: item.l,
            });
          } else {
            accountInfo.balances[index].free = item.f;
            accountInfo.balances[index].locked = item.l;
          }
        });
      }
    },
    setApiKeys: (
      state,
      action: PayloadAction<{ secretKey: string; publicKey: string }>,
    ) => {
      state.secretKey = action.payload.secretKey;
      state.publicKey = action.payload.publicKey;
      state.authorized = true;
    },
    logout: (state) => {
      state.secretKey = null;
      state.publicKey = null;
      state.authorized = false;
      state.accountInfo = null;
      userKeysStorage.remove();
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getAccountInfo.matchFulfilled,
      (state, action) => {
        state.accountInfo = action.payload;
        state.authorized = true;
      },
    );
  },
});
export const { updateAccountInfoByStream, setApiKeys, initAuthData, logout } =
  userSlice.actions;
