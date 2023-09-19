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
      </Accordion>
    </>
  );
};

export default RoomList;
