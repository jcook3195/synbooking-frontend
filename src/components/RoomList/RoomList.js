import React from "react";

import RoomsListItem from "./RoomListItem/RoomListItem";

import "./RoomList.scss";

const RoomList = () => {
  return (
    <div id="room-list">
      <RoomsListItem
        roomName="a"
        roomStatus="Open all day"
        roomAvailability="available"
      />
      <RoomsListItem
        roomName="b"
        roomStatus="Booked until 13:45"
        roomAvailability="unavailable"
      />
      <RoomsListItem
        roomName="c"
        roomStatus="Open all day"
        roomAvailability="available"
      />
    </div>
  );
};

export default RoomList;
