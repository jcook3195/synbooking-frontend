import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";

import RoomsListItem from "./RoomListItem/RoomListItem";

import "./RoomList.scss";

const RoomList = () => {
  // redux
  const roomsState = useSelector((state) => state.meetings.rooms);

  return (
    <>
      <Accordion>
        {Object.entries(roomsState).map((entry) => {
          let availability = entry[1]["availability"]
            ? "available"
            : "unavailable";

          return (
            <RoomsListItem
              roomName={entry[0].toString().toLowerCase()}
              roomStatus={entry[1]["statusMsg"]}
              roomAvailability={availability}
              roomId={entry[1]["id"]}
              key={entry[1]["id"]}
            />
          );
        })}
        {/* <RoomsListItem
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
        /> */}
      </Accordion>
    </>
  );
};

export default RoomList;
