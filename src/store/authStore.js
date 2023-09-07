import { createSlice } from "@reduxjs/toolkit";

const initialState = { loggedIn: false };

const authSlice = createSlice({
  name: "loggedIn",
  initialState,
  reducers: {
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
