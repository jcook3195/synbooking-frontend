import { createSlice, current } from "@reduxjs/toolkit";

let todayString = new Date().toISOString().split("T")[0];
let nowTimeHours = new Date().getHours().toString();
let nowTimeMinutes = new Date().getMinutes().toString();

if (nowTimeMinutes.length < 2) {
  nowTimeMinutes = "0" + nowTimeMinutes;
}

let nowTimeString = nowTimeHours + ":" + nowTimeMinutes;

const initialState = {
  meetings: {},
  selectedRoom: null,
  selectedRoomName: null,
  selectedEditMeetingDate: null,
  selectedMeeting: null,
  selectedMeetingDate: todayString,
  selectedStartTime: todayString + " " + nowTimeString,
  selectedEndTime: todayString + " " + nowTimeString,
  meetingStartTime: null,
  meetingToEdit: null,
  editingActive: false,
  titleFieldErr: false,
  emailFieldErr: false,
  emailErrText: "This is not a valid email.",
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
  pastMeetings: {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
  },
  activeMeetings: {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
  },
  upcomingMeetings: {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
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

      if (typeof data.payload === "object") {
        // sort the meetings to put the most recent meetings at the bottom of the list, this prevents errors with the loop for availablility and status messages
        newMeetings.sort((a, b) => {
          return new Date(b.startDateTime) - new Date(a.startDateTime);
        });
      }

      // set the state with the new sorted object
      state.meetings = newMeetings;
    },
    setRooms(state, data) {
      state.rooms = data.payload;
    },
    setSelectedRoom(state, data) {
      state.selectedRoom = data.payload;

      Object.entries(state.rooms).forEach((room) => {
        if (data.payload === current(room[1]).id) {
          state.selectedRoomName = room[0];
        }
      });
    },
    setSelectedMeeting(state, data) {
      state.selectedMeeting = data.payload;

      let roomId;
      Object.entries(state.meetings).forEach((meeting) => {
        if (data.payload === current(meeting[1]).id) {
          roomId = current(meeting[1]).room;
          state.selectedEditMeetingDate = current(meeting[1]).startDateTime;
        }
      });

      Object.entries(state.rooms).forEach((room) => {
        if (current(room[1]).id === roomId) {
          state.selectedRoomName = room[0];
        }
      });
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
    setMeetingToEdit(state, data) {
      state.meetingToEdit = data.payload;
    },
    setEditingActive(state, data) {
      state.editingActive = data.payload;
    },
    updateRoomAvailability(state) {
      // get current state of meetings and rooms
      let meetings = state.meetings;
      let rooms = current(state.rooms);

      if (JSON.stringify(meetings) === "{}" || typeof meetings !== "string") {
        // as long as there is no meetings, get the current
        meetings = current(state.meetings);
      }

      // new instance of rooms, past, active, and upcoming meetings for state updates and immutability
      let newRooms = state.rooms;
      let newPastMeetings = state.pastMeetings;
      let newActiveMeetings = state.activeMeetings;
      let newUpcomingMeetings = state.upcomingMeetings;

      // need this for resetting the meetings when there is a day change if there are no meetings
      if (JSON.stringify(meetings) === "{}" || typeof meetings === "string") {
        // no meetings, reset all the statuses of the rooms
        Object.entries(rooms).forEach((roomVal, roomKey) => {
          newRooms[roomVal[0]].availability = true;
          newRooms[roomVal[0]].statusMsg = "Free for the rest of the day.";
        });
      } else {
        // there are some meetings, continue with business as usual
        // loop through meetings and rooms to compare ids and build past, active, and upcoming states
        Object.values(meetings).forEach((meetingVal) => {
          // do some magic with the current time, start time, and end time of meetings so they are mathematically comparable
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

          // loop through all the rooms for every meeting for comparisons and updates
          Object.entries(rooms).forEach((roomVal, key) => {
            if (meetingVal.room === roomVal[1].id) {
              // past meetings condition
              if (currentDateTime > endDateTime) {
                // code is looping multiple times, so add this to make sure it is not added to the state twice
                const found = newPastMeetings[roomVal[0]].some(
                  (el) => el.id === meetingVal.id
                );

                if (!found) {
                  // if the meeting is not already found in the array, push it
                  newPastMeetings[roomVal[0]].push(meetingVal);
                }
              }

              // current meetings condition
              if (
                currentDateTime >= startDateTime &&
                currentDateTime <= endDateTime
              ) {
                // code is looping multiple times, so add this to make sure it is not added to the state twice
                const found = newActiveMeetings[roomVal[0]].some(
                  (el) => el.id === meetingVal.id
                );

                if (!found) {
                  // if the meeting is not already found in the array, push it
                  newActiveMeetings[roomVal[0]].push(meetingVal);
                }
              }

              // upcoming meetings condition
              if (currentDateTime < startDateTime) {
                // code is looping multiple times, so add this to make sure it is not added to the state twice
                const found = newUpcomingMeetings[roomVal[0]].some(
                  (el) => el.id === meetingVal.id
                );

                if (!found) {
                  // if the meeting is not already found in the array, push it
                  newUpcomingMeetings[roomVal[0]].push(meetingVal);
                }
              }
            }
          });
        });

        // console.log("PAST", current(newPastMeetings));
        // console.log("ACTIVE", current(newActiveMeetings));
        // console.log("UPCOMING", current(newUpcomingMeetings));
        state.pastMeetings = newPastMeetings;
        state.activeMeetings = newActiveMeetings;
        state.upcomingMeetings = newUpcomingMeetings;

        let compActiveMeetings = state.activeMeetings;
        let compFutureMeetings = state.upcomingMeetings;

        // loop through the future meeting sets to update room state for status msg and availability
        Object.entries(compFutureMeetings).forEach((futureMeetVal, key) => {
          // loop through current meetings to compare. if there is a current meeting in this room then don't update the state for the future meetings
          let futureMeetingSet = current(futureMeetVal[1]);
          // loop through the array of meeting objects
          Object.values(futureMeetingSet).forEach((fms) => {
            // loop through current meetings to compare. if there is a current meeting in this room then don't update the state for the future meetings
            Object.entries(compActiveMeetings).forEach(
              (activeMeetVal, nKey) => {
                let activeMeetingSet = current(activeMeetVal[1]);

                // now determine if there are any active meetings in the same room for the day
                // if there are, a special loop needs to be run to make sure the future meetings do not wrongly display the status
                // if there are no currently active meetings, just go ahead and display the future meeting

                if (
                  !Array.isArray(current(activeMeetVal[1])) ||
                  !current(activeMeetVal[1]).length
                ) {
                  // if the array is empty. That means there are no active meetings in the array and the future meetings can be displayed
                  let prettyStartTime = new Date(fms.startDateTime);
                  // adding an extra 0 for minute formatting if only one number
                  let startHrs = prettyStartTime.getHours();
                  let startMins = prettyStartTime.getMinutes();
                  if (startHrs.toString().length < 2) {
                    startHrs = "0" + startHrs;
                  }
                  if (startMins.toString().length < 2) {
                    startMins = startMins + "0";
                  }
                  newRooms[futureMeetVal[0].toString()].statusMsg =
                    "Free Until " + startHrs + ":" + startMins;
                  newRooms[futureMeetVal[0].toString()].availability = true;
                } else {
                  // there are some active meetings. run the loop to make sure those are not displayed
                  Object.values(activeMeetingSet).forEach((ams) => {
                    if (!(fms.room === ams.room)) {
                      // if there is not an active meeting in the same room that there is a future meeting
                      let prettyStartTime = new Date(fms.startDateTime);
                      // adding an extra 0 for minute formatting if only one number
                      let startHrs = prettyStartTime.getHours();
                      let startMins = prettyStartTime.getMinutes();
                      if (startHrs.toString().length < 2) {
                        startHrs = "0" + startHrs;
                      }
                      if (startMins.toString().length < 2) {
                        startMins = startMins + "0";
                      }
                      newRooms[futureMeetVal[0].toString()].statusMsg =
                        "Free Until " + startHrs + ":" + startMins;
                      newRooms[futureMeetVal[0].toString()].availability = true;
                    }
                  });
                }
              }
            );
          });
        });

        // now just the active meetings. important to do these last since they have highest priority
        Object.entries(compActiveMeetings).forEach((activeMeetVal, nKey) => {
          let activeMeetingSet = current(activeMeetVal[1]);
          // loop through each array of meeting objects
          Object.values(activeMeetingSet).forEach((ams) => {
            // if there is not an active meeting in the same room that there is a future meeting
            let prettyEndTime = new Date(ams.endDateTime);
            // adding an extra 0 for minute formatting if only one number
            let endHrs = prettyEndTime.getHours();
            let endMins = prettyEndTime.getMinutes();

            if (endHrs.toString().length < 2) {
              endHrs = "0" + endHrs;
            }
            if (endMins.toString().length < 2) {
              endMins = endMins + "0";
            }
            newRooms[activeMeetVal[0].toString()].statusMsg =
              "Booked Until " + endHrs + ":" + endMins;
            newRooms[activeMeetVal[0].toString()].availability = false;
          });
        });
      }

      state.rooms = newRooms;
    },
    resetRoomAvailability(state) {
      // loop friendly version
      let rooms = current(state.rooms);

      // new instance of rooms for updating the original at the end
      let newRooms = state.rooms;
      // create a var for wiping past, active, upcoming meetings
      let meetingsWipe = {
        A: [],
        B: [],
        C: [],
        D: [],
        E: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
      };

      Object.entries(rooms).forEach((roomVal, key) => {
        newRooms[roomVal[0].toString()].statusMsg =
          "Free for the rest of the day.";
        newRooms[roomVal[0].toString()].availability = true;
      });

      // wipe the past, active, and future meetings - and all meetings
      state.pastMeetings = meetingsWipe;
      state.activeMeetings = meetingsWipe;
      state.upcomingMeetings = meetingsWipe;

      state.meetings = {};

      // update the rooms
      state.rooms = newRooms;
    },
    resetStartTimes(state) {
      let todayString = new Date().toISOString().split("T")[0];
      let nowTimeHours = new Date().getHours().toString();
      let nowTimeMinutes = new Date().getMinutes().toString();

      if (nowTimeMinutes.length < 2) {
        nowTimeMinutes = "0" + nowTimeMinutes;
      }

      let nowTimeString = nowTimeHours + ":" + nowTimeMinutes;

      state.selectedStartTime = todayString + " " + nowTimeString;
      state.meetingStartTime = null;
    },
    setTitleFieldErr(state, data) {
      state.titleFieldErr = data.payload;
    },
    setEmailFieldErr(state, data) {
      state.emailFieldErr = data.payload;
    },
    resetMeetings(state) {
      state.meetings = {};
    },
    setSelectedEndTime(state, data) {
      state.selectedEndTime = data.payload;
    },
    setEmailErrText(state, data) {
      state.emailErrText = data.payload;
    },
  },
});

export const meetingActions = meetingSlice.actions;

export default meetingSlice.reducer;
