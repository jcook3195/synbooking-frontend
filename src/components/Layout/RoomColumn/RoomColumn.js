import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import RoomList from "../../RoomList/RoomList";
import DateInput from "../../Form/Fields/DateInput/DateInput";
import MyMeetings from "../../MyMeetings/MyMeetings";

import "./RoomColumn.scss";

const RoomColumn = () => {
  const [roomListHeading, setRoomListHeading] = useState(
    "Current Availability"
  );

  // redux
  const selectedMeetingDate = useSelector(
    (state) => state.meetings.selectedMeetingDate
  );

  useEffect(() => {
    // run when the selected meeting date is changed
    let today = new Date().getDate().toString(); // get todays date and convert it to a string
    let selYear = selectedMeetingDate.split("-")[0]; // selected year from string
    let selMo = selectedMeetingDate.split("-")[1]; // selected month from string
    let selDate = selectedMeetingDate.split("-")[2]; // selected day from string

    if (today !== selDate) {
      // update the column heading of the room availability if the selected day is not today
      setRoomListHeading(
        "Availability for " + selMo + "/" + selDate + "/" + selYear
      );
    }
  }, [selectedMeetingDate]);

  return (
    <div id="room-col" className="col-12 col-lg-3 p-4">
      <div id="all-rooms" className="row mb-5">
        <div className="col-12 text-center">
          <h2>Available Rooms</h2>
        </div>
        <DateInput
          id="meetingDateInput"
          label="Check Availability for Another Day:"
        />
        <div className="col-12 text-left">
          <h2>{roomListHeading}</h2>
          <RoomList />
        </div>
      </div>
      <div id="myMeetings" className="row mb-5 px-3">
        <div className="col-12 text-center">
          <h2>My Active / Upcoming Meetings</h2>
        </div>
        <div className="col-12 mb-3 p-3 meetings-list">
          <MyMeetings />
        </div>
      </div>
    </div>
  );
};

export default RoomColumn;
