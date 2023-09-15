import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Room from "./Room/Room";

import "./Building.scss";

const Building = () => {
  // redux
  const roomsState = useSelector((state) => state.meetings.newRooms);

  useEffect(() => {
    console.log(roomsState);

    // Object.entries(
    //   roomsState.map((entry) => {
    //     console.log("entry", entry);
    //   })
    // );
  });

  return (
    <div id="ex-map-container">
      <div id="bldg-main" className="building-part">
        <div className="bldg-rooms">
          {Object.entries(roomsState).map((entry) => {
            let availability = entry[1]["availability"]
              ? "available"
              : "unavailable";

            return (
              <Room
                name={entry[0]}
                size={entry[1]["size"]}
                availability={availability}
                roomId={entry[1]["id"]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Building;
