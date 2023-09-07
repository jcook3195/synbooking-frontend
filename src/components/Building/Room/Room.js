import React from "react";

const Room = (props) => {
  return (
    <a
      href={"#" + props.name}
      id={"room-" + props.name.toLowerCase()}
      className={"building-room " + props.size + " " + props.availability}
    >
      {props.name}
    </a>
  );
};

export default Room;
