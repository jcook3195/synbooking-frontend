import { createSlice, current } from "@reduxjs/toolkit";

let todayString = new Date().toISOString().split("T")[0];
let nowTimeHours = new Date().getHours().toString();
let nowTimeMinutes = new Date().getMinutes().toString();
let nowTimeString = nowTimeHours + ":" + nowTimeMinutes;

const initialState = {
  meetings: {},
  selectedRoom: null,
  selectedMeetingDate: todayString,
  selectedStartTime: todayString + " " + nowTimeString,
  meetingStartTime: null,
  rooms: {
    A: {
      id: "65008c61e49aed0cfc36f0a1",
      availability: true,
      size: "small",
      statusMsg: "Free for the rest of the day.",
    },
    B: {
      id: "65008c68e49aed0cfc36f0a2",
      availability: true,
      size: "small",
      statusMsg: "Free for the rest of the day.",
    },
    C: {
      id: "65008c75e49aed0cfc36f0a3",
      availability: true,
      size: "small",
      statusMsg: "Free for the rest of the day.",
    },
    D: {
      id: "65008c7ae49aed0cfc36f0a4",
      availability: true,
      size: "small",
      statusMsg: "Free for the rest of the day.",
    },
    E: {
      id: "65008c80e49aed0cfc36f0a5",
      availability: true,
      size: "small",
      statusMsg: "Free for the rest of the day.",
    },
    F: {
      id: "65008c86e49aed0cfc36f0a6",
      availability: true,
      size: "small",
      statusMsg: "Free for the rest of the day.",
    },
    G: {
      id: "65008c8ae49aed0cfc36f0a7",
      availability: true,
      size: "small",
      statusMsg: "Free for the rest of the day.",
    },
    H: {
      id: "65008c93e49aed0cfc36f0a8",
      availability: true,
      size: "small",
      statusMsg: "Free for the rest of the day.",
    },
    I: {
      id: "65008c98e49aed0cfc36f0a9",
      availability: true,
      size: "large",
      statusMsg: "Free for the rest of the day.",
    },
    J: {
      id: "65008c9de49aed0cfc36f0aa",
      availability: true,
      size: "large",
      statusMsg: "Free for the rest of the day.",
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
    setMeetings(state, data) {
      // save state as new object for state immutability
      let newMeetings = state.meetings;
      newMeetings = data.payload;

      // sort the meetings to put the most recent meetings at the bottom of the list, this prevents errors with the loop for availablility and status messages
      newMeetings.sort((a, b) => {
        return new Date(b.startDateTime) - new Date(a.startDateTime);
      });

      // set the state with the new sorted object
      state.meetings = newMeetings;
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
    updateRoomAvailability(state) {
      // get the current state of both the meetings and the rooms
      let meetings = current(state.meetings);
      let rooms = current(state.rooms);

      // new instance of rooms state for updating the original at the end
      let newRooms = state.rooms;

      // loop through meetings and compare room ids to rooms and set availability
      Object.values(meetings).forEach((meetingVal) => {
        let startTime = meetingVal.startDateTime.split("T")[1];
        let endTime = meetingVal.endDateTime.split("T")[1];

        let startTimeMinusTrail = startTime.split(".")[0];
        let endTimeMinusTrail = endTime.split(".")[0];

        let currentDateTime = new Date();
        let startDateTime = new Date();
        startDateTime.setHours(startTimeMinusTrail.split(":")[0] - 4); // cheating to convert from gmt to est
        startDateTime.setMinutes(startTimeMinusTrail.split(":")[1]);
        startDateTime.setSeconds(startTimeMinusTrail.split(":")[2]);

        let endDateTime = new Date();
        endDateTime.setHours(endTimeMinusTrail.split(":")[0] - 4); // cheating to convert from gmt to est
        endDateTime.setMinutes(endTimeMinusTrail.split(":")[1]);
        endDateTime.setSeconds(endTimeMinusTrail.split(":")[2]);
        // loop through the rooms and update based off meetings
        Object.entries(rooms).forEach((roomVal, key) => {
          let prettyStartTime = new Date(meetingVal.startDateTime);
          let prettyEndTime = new Date(meetingVal.endDateTime);

          // adding an extra 0 for minute formatting if only one number
          let startHrs = prettyStartTime.getHours();
          let startMins = prettyStartTime.getMinutes();
          let endHrs = prettyEndTime.getHours();
          let endMins = prettyEndTime.getMinutes();

          if (startHrs.toString().length < 2) {
            startHrs = "0" + startHrs;
          }

          if (startMins.toString().length < 2) {
            startMins = startMins + "0";
          }

          if (endHrs.toString().length < 2) {
            endHrs = "0" + endHrs;
          }

          if (endMins.toString().length < 2) {
            endMins = endMins + "0";
          }

          if (meetingVal.room === roomVal[1].id) {
            // checks for availability and status message updates
            if (
              startDateTime <= currentDateTime &&
              endDateTime >= currentDateTime
            ) {
              // if there is a currently active meeting
              newRooms[roomVal[0].toString()].statusMsg =
                "Booked Until " + endHrs + ":" + endMins;
              newRooms[roomVal[0].toString()].availability = false;
            }

            if (currentDateTime > endDateTime) {
              // loop meetings to check if there are any meetings that start after this, and if so do not update the state
              Object.values(meetings).forEach((innerMeetingVal) => {
                let innerEndTime = innerMeetingVal.endDateTime.split("T")[1];
                let innerEndTimeMinusTrail = innerEndTime.split(".")[0];
                let innerEndDateTime = new Date();
                innerEndDateTime.setHours(
                  innerEndTimeMinusTrail.split(":")[0] - 4
                ); // cheating to convert from gmt to est
                innerEndDateTime.setMinutes(
                  innerEndTimeMinusTrail.split(":")[1]
                );
                innerEndDateTime.setSeconds(
                  innerEndTimeMinusTrail.split(":")[2]
                );

                if (innerMeetingVal.room === roomVal[1].id) {
                  // if any meetings start after
                  // console.log("inner: ", roomVal[1].id);
                } else {
                  console.log("hey hi hello");
                  // last meeting of the day
                  // current time is after any endDateTimes
                  newRooms[roomVal[0].toString()].statusMsg =
                    "Free for the rest of the day.";
                }
              });
            }

            if (currentDateTime < startDateTime) {
              // current time is before any meeting times
              newRooms[roomVal[0].toString()].statusMsg =
                "Free Until " + startHrs + ":" + startMins;
            }
          }
        });
      });

      state.rooms = newRooms;
    },
    resetRoomAvailability(state) {
      let rooms = current(state.rooms);
      // new instance of rooms state for updating the original at the end
      let newRooms = state.rooms;

      Object.entries(rooms).forEach((roomVal, key) => {
        newRooms[roomVal[0].toString()].statusMsg =
          "Free for the rest of the day.";
        newRooms[roomVal[0].toString()].availability = true;
      });
    },
  },
});

export const meetingActions = meetingSlice.actions;

export default meetingSlice.reducer;
