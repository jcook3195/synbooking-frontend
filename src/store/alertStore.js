import { createSlice } from "@reduxjs/toolkit";

const initialState = { showAlert: false };

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert(state) {
      state.showAlert = true;
    },
    hideAlert(state) {
      state.showAlert = false;
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice.reducer;
