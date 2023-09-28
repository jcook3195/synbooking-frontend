import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAddModal: false,
  showEditModal: false,
  showDeleteModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showAddModal(state) {
      state.showAddModal = true;
    },
    hideAddModal(state) {
      state.showAddModal = false;
    },
    showEditModal(state) {
      state.showEditModal = true;
    },
    hideEditModal(state) {
      state.showEditModal = false;
    },
    showDeleteModal(state) {
      state.showDeleteModal = true;
    },
    hideDeleteModal(state) {
      state.showDeleteModal = false;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
