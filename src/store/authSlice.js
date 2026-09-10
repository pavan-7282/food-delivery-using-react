import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("currentUser");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("currentUser");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
