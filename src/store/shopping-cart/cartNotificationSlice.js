import { createSlice } from "@reduxjs/toolkit";

const cartNotificationSlice = createSlice({
  name: "cartNotification",
  initialState: { message: "", visible: false },
  reducers: {
    showNotification(state, action) {
      state.message = action.payload;
      state.visible = true;
    },
    hideNotification(state) {
      state.message = "";
      state.visible = false;
    },
  },
});

export const cartNotificationActions = cartNotificationSlice.actions;
export default cartNotificationSlice;
