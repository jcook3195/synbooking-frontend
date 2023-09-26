import React from "react";
import { useSelector } from "react-redux";

import MeetingItem from "./MeetingItem/MeetingItem";

const MyMeetings = () => {
  const meetings = useSelector((state) => state.meetings.meetings);

  const loggedInUserId = JSON.parse(localStorage.getItem("user"))["userId"];

  return (
    <>
      {Object.entries(meetings).map((entry) => {
        console.log(entry[1]);
        if (entry[1].user === loggedInUserId) {
          return <MeetingItem title={entry[1].title} />;
        }
      })}
    </>
  );
};

export default MyMeetings;
