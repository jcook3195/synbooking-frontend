import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomAvailable: false,
};

const meetingSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    changeAvailability(state) {
      state.roomAvailable = false;
    },
  },
});

export const meetingActions = meetingSlice.actions;

export default meetingSlice.reducer;
