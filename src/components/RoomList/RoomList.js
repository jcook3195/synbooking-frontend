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
      <RoomsListItem
        roomName="d"
        roomStatus="Open all day"
        roomAvailability="available"
      />
      <RoomsListItem
        roomName="e"
        roomStatus="Open all day"
        roomAvailability="available"
      />
      <RoomsListItem
        roomName="f"
        roomStatus="Open all day"
        roomAvailability="available"
      />
      <RoomsListItem
        roomName="g"
        roomStatus="Open all day"
        roomAvailability="available"
      />
      <RoomsListItem
        roomName="h"
        roomStatus="Open all day"
        roomAvailability="available"
      />
      <RoomsListItem
        roomName="i"
        roomStatus="Open all day"
        roomAvailability="available"
      />
      <RoomsListItem
        roomName="j"
        roomStatus="Open all day"
        roomAvailability="available"
      />
    </div>
  );
};

export default RoomList;
