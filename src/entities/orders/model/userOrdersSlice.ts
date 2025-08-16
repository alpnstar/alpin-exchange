import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserOrder } from "./types";
import { userOrdersApi } from "./userOrdersApi";
import { mapExecReportToOpenOrder } from "@/entities/orders/lib/mapExecReportToOpenOrder";

interface UserOrdersState {
  openOrders: UserOrder[];
}

const initialState: UserOrdersState = {
  openOrders: [],
};

export const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    updateOpenOrdersByEvent: (state, action: PayloadAction<any>) => {
      const mapped = mapExecReportToOpenOrder(action.payload.event);
      const existingOrderIndex = state.openOrders.findIndex(
        (order) => order.orderId === mapped.orderId,
      );
      if (existingOrderIndex !== -1) {
        if (mapped.status === "FILLED" || mapped.status === "CANCELED") {
          state.openOrders.splice(existingOrderIndex, 1);
        }
      } else {
        state.openOrders.push(mapped);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userOrdersApi.endpoints.getOpenOrders.matchFulfilled,
      (state, action: PayloadAction<UserOrder[]>) => {
        state.openOrders = action.payload;
      },
    );
  },
});

export const { updateOpenOrdersByEvent } = userOrdersSlice.actions;
