import React from "react";

import RoomList from "../../RoomList/RoomList";
import DateInput from "../../Form/Fields/DateInput/DateInput";

import "./RoomColumn.scss";

const RoomColumn = () => {
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
          <h2>Current Availability</h2>
          <RoomList />
        </div>
      </div>
    </div>
  );
};

export default RoomColumn;
