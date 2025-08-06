import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserAccountInfo, UserAccountInfoUpdate, userApi } from "@/entities/user";

interface userState {
  authorized: boolean;
  accountInfo: UserAccountInfo | null;
}

const initialState: userState = {
  authorized: false,
  accountInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAccountInfoByStream: (state, action:PayloadAction<{event: UserAccountInfoUpdate}>) => {
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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getAccountInfo.matchFulfilled,
      (state, action) => {
        state.accountInfo = action.payload;
      },
    );
  },
});
export const { updateAccountInfoByStream } = userSlice.actions;
