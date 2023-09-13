import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomAvailability: {
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
    G: false,
    H: false,
    I: false,
    J: false,
  },
  meetings: {},
  rooms: {
    A: "65008c61e49aed0cfc36f0a1",
    B: "65008c68e49aed0cfc36f0a2",
    C: "65008c75e49aed0cfc36f0a3",
    D: "65008c7ae49aed0cfc36f0a4",
    E: "65008c80e49aed0cfc36f0a5",
    F: "65008c86e49aed0cfc36f0a6",
    G: "65008c8ae49aed0cfc36f0a7",
    H: "65008c93e49aed0cfc36f0a8",
    I: "65008c98e49aed0cfc36f0a9",
    J: "65008c9de49aed0cfc36f0aa",
  },
  selectedRoom: null,
};

const meetingSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    changeAvailability(state, payload) {
      // The payload here will be the name of the room: A, B, C, etc.
      let newAvailibility = state.roomAvailability;

      newAvailibility[payload] = !state.roomAvailability[payload]; // set the value of the room availability to the opposite of it's original value

      state.roomAvailability = newAvailibility; // update the state array with the new changed array
    },
    setRooms(state, data) {
      state.rooms = data.payload;
    },
    setSelectedRoom(state, data) {
      state.selectedRoom = data.payload;
    },
  },
});

export const meetingActions = meetingSlice.actions;

export default meetingSlice.reducer;
