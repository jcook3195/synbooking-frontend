import React from "react";
import RoomList from "../../RoomList/RoomList";

import "./RoomColumn.scss";
import MeetingTimePicker from "../../MeetingTimePicker/MeetingTimePicker";

const RoomColumn = () => {
  return (
    <div id="room-col" className="col-12 col-lg-3 p-4">
      <div id="all-rooms" className="row mb-5">
        <div className="col-12 text-center">
          <h2>Available Rooms</h2>
        </div>
        <MeetingTimePicker />
        <div className="col-12 text-left">
          <RoomList />
        </div>
      </div>
    </div>
  );
};

export default RoomColumn;
