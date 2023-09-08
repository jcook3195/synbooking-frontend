import { createSlice } from "@reduxjs/toolkit";

const initialState = { showModal: false };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(state) {
      state.showModal = true;
    },
    hideModal(state) {
      state.showModal = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
