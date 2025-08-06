import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserOrder } from "./types";
import { userOrdersApi } from "./userOrdersApi";

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
    // Редьюсер для обновления состояния на основе WebSocket-события
    updateOrderByEvent: (state, action: PayloadAction<any>) => {
      const event = action.payload;

      // Нас интересует только событие об исполнении ордера
      if (event.e !== "executionReport") {
        return;
      }

      const orderId = event.i;
      const status = event.X; // Статус ордера (FILLED, CANCELED, etc.)

      const existingOrderIndex = state.openOrders.findIndex(
        (order) => order.orderId === orderId,
      );

      if (existingOrderIndex !== -1) {
        // Если ордер исполнен или отменен, удаляем его из списка открытых
        if (status === "FILLED" || status === "CANCELED") {
          state.openOrders.splice(existingOrderIndex, 1);
        } else {
          // В противном случае, можно обновить его данные (например, partially filled)
          // Для простоты пока оставим так
          state.openOrders[existingOrderIndex] = {
            ...state.openOrders[existingOrderIndex],
            status: status,
            executedQty: event.z,
          };
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Заполняем состояние после первоначального REST-запроса
    builder.addMatcher(
      userOrdersApi.endpoints.getOpenOrders.matchFulfilled,
      (state, action: PayloadAction<UserOrder[]>) => {
        state.openOrders = action.payload;
      },
    );
  },
});

export const { updateOrderByEvent } = userOrdersSlice.actions;
