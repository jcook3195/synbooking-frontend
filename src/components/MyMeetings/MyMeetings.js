import React from "react";
import { useSelector } from "react-redux";

import MeetingItem from "./MeetingItem/MeetingItem";

const MyMeetings = () => {
  // redux
  const meetings = useSelector((state) => state.meetings.meetings);
  const rooms = useSelector((state) => state.meetings.rooms);

  const loggedInUser = localStorage.getItem("user");
  let loggedInUserId;

  if (loggedInUser !== null) {
    loggedInUserId = JSON.parse(localStorage.getItem("user"))["userId"];
  } else {
    loggedInUserId = null;
  }

  let meetingList = Object.entries(meetings).map((entry) => {
    if (entry[1].user === loggedInUserId) {
      let current = new Date();
      let start = new Date(entry[1].startDateTime);
      let startHrs = start.getHours();
      let startMins = start.getMinutes();
      if (startHrs.toString().length < 2) {
        startHrs = "0" + startHrs;
      }
      if (startMins.toString().length < 2) {
        startMins = startMins + "0";
      }

      let end = new Date(entry[1].endDateTime);
      let endHrs = end.getHours();
      let endMins = end.getMinutes();
      if (endHrs.toString().length < 2) {
        endHrs = "0" + endHrs;
      }
      if (endMins.toString().length < 2) {
        endMins = endMins + "0";
      }

      if (end > current) {
        let roomName;
        Object.entries(rooms).forEach((roomVal, key) => {
          if (entry[1].room === roomVal[1].id) {
            roomName = roomVal[0];
          }
        });

        return (
          <MeetingItem
            key={roomName + startHrs + startMins}
            roomName={roomName}
            roomId={entry[1].room}
            meetingId={entry[1].id}
            title={entry[1].title}
            start={startHrs + ":" + startMins}
            end={endHrs + ":" + endMins}
          />
        );
      }
    }
  });

  return (
    <>
      {Object.values(meetingList).every((el) => el === undefined)
        ? "No meetings for the day."
        : meetingList}
    </>
  );
};

export default MyMeetings;
