import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAlert: false,
  alertType: "danger",
  alertMessage: "Test notification.",
};

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
    setAlertType(state, data) {
      state.alertType = data.payload;
    },
    setAlertMessage(state, data) {
      state.alertMessage = data.payload;
    },
  },
});

export const alertActions = alertSlice.actions;

export default alertSlice.reducer;
