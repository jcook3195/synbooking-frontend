import React from "react";

import AvailabilityCircle from "../../UI/AvailabilityCircle/AvailabilityCircle";

const RoomsListItem = (props) => {
  return (
    <div id={"room-list-" + props.roomName} className="room-list-item">
      <h4>
        Room {props.roomName.toUpperCase()}
        <AvailabilityCircle availability={props.roomAvailability} />
      </h4>
      <p>{props.roomStatus}</p>
    </div>
  );
};

export default RoomsListItem;
