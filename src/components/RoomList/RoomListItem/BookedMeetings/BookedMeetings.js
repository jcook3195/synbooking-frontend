import React from "react";
import { useSelector } from "react-redux";

import BookedMeeting from "./BookedMeeting/BookedMeeting";

const BookedMeetings = (props) => {
  // redux
  const users = useSelector((state) => state.auth.users);
  const meetings = useSelector((state) => state.meetings.meetings);
  const now = new Date();

  return (
    <div id="bookedMeetingsList" className=" mt-4 mb-4">
      <h6>Upcoming Meetings</h6>
      {Object.entries(meetings).map((meeting) => {
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
          return (
            <BookedMeeting
              key={meeting[1].user + startHrs + startMins}
              user={users[meeting[1].user]}
              startTime={startHrs + ":" + startMins}
              endTime={endHrs + ":" + endMins}
            />
          );
        }
      })}
    </div>
  );
};

export default BookedMeetings;
