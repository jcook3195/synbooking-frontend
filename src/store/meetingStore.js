import { createSlice } from "@reduxjs/toolkit";

let todayString = new Date().toISOString().split("T")[0];
let nowTimeHours = new Date().getHours().toString();
let nowTimeMinutes = new Date().getMinutes().toString();
let nowTimeString = nowTimeHours + ":" + nowTimeMinutes;

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
  selectedMeetingDate: todayString,
  selectedStartTime: todayString + " " + nowTimeString,
  meetingStartTime: null,
  newRooms: {
    A: {
      id: "65008c61e49aed0cfc36f0a1",
      availability: true,
      size: "small",
      statusMsg: "Open All Day",
    },
    B: {
      id: "65008c68e49aed0cfc36f0a2",
      availability: true,
      size: "small",
      statusMsg: "Open All Day",
    },
    C: {
      id: "65008c75e49aed0cfc36f0a3",
      availability: false,
      size: "small",
      statusMsg: "Open All Day",
    },
    D: {
      id: "65008c7ae49aed0cfc36f0a4",
      availability: true,
      size: "small",
      statusMsg: "Open All Day",
    },
    E: {
      id: "65008c80e49aed0cfc36f0a5",
      availability: true,
      size: "small",
      statusMsg: "Open All Day",
    },
    F: {
      id: "65008c86e49aed0cfc36f0a6",
      availability: true,
      size: "small",
      statusMsg: "Open All Day",
    },
    G: {
      id: "65008c8ae49aed0cfc36f0a7",
      availability: false,
      size: "small",
      statusMsg: "Open All Day",
    },
    H: {
      id: "65008c93e49aed0cfc36f0a8",
      availability: false,
      size: "small",
      statusMsg: "Open All Day",
    },
    I: {
      id: "65008c98e49aed0cfc36f0a9",
      availability: true,
      size: "large",
      statusMsg: "Open All Day",
    },
    J: {
      id: "65008c9de49aed0cfc36f0aa",
      availability: false,
      size: "large",
      statusMsg: "Open All Day",
    },
  },
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
    setSelectedMeetingDate(state, data) {
      state.selectedMeetingDate = data.payload;
    },
    setSelectedStartTime(state, data) {
      state.selectedStartTime = data.payload;
    },
    setMeetingStartTime(state, data) {
      state.meetingStartTime = data.payload;
    },
  },
});

export const meetingActions = meetingSlice.actions;

export default meetingSlice.reducer;
