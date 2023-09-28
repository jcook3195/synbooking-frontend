import React from "react";
import { useSelector } from "react-redux";

import BookedMeeting from "./BookedMeeting/BookedMeeting";

const BookedMeetings = (props) => {
  let header = "No meetings for the day.";

  // redux
  const users = useSelector((state) => state.auth.users);
  const meetings = useSelector((state) => state.meetings.meetings);
  const now = new Date();

  let body = Object.entries(meetings).map((meeting) => {
    let start = new Date(meeting[1].startDateTime);
    let startHrs = start.getHours();
    let startMins = start.getMinutes();
    if (startHrs.toString().length < 2) {
      startHrs = "0" + startHrs;
    }
    if (startMins.toString().length < 2) {
      startMins = startMins + "0";
    }

    let end = new Date(meeting[1].endDateTime);
    let endHrs = end.getHours();
    let endMins = end.getMinutes();
    if (endHrs.toString().length < 2) {
      endHrs = "0" + endHrs;
    }
    if (endMins.toString().length < 2) {
      endMins = endMins + "0";
    }

    if (meeting[1].room === props.roomId && start > now) {
      header = "Upcoming Meetings";

      return (
        <BookedMeeting
          key={meeting[1].user + props.roomId + endHrs + startMins + startHrs}
          user={users[meeting[1].user]}
          startTime={startHrs + ":" + startMins}
          endTime={endHrs + ":" + endMins}
        />
      );
    } else {
      header = "No meetings for the day.";
      return (
        <span
          key={meeting[1].user + props.roomId + startHrs + endMins + endHrs}
        ></span>
      );
    }
  });

  return (
    <div id="bookedMeetingsList" className="mt-4 mb-4">
      <h6>{header}</h6>
      {body}
    </div>
  );
};

export default BookedMeetings;
