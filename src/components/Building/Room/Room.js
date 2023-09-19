import React from "react";
import { useDispatch } from "react-redux";

import { meetingActions } from "../../../store/meetingStore";
import { modalActions } from "../../../store/modalStore";

const Room = (props) => {
  // redux
  const dispatch = useDispatch();

  const onClickHandler = (e) => {
    e.preventDefault();

    dispatch(modalActions.showModal());
    dispatch(meetingActions.setSelectedRoom(props.name));
  };

  return (
    <a
      href={"#" + props.name}
      id={"room-" + props.name.toLowerCase()}
      className={"building-room " + props.size + " " + props.availability}
      onClick={onClickHandler}
    >
      {props.name}
    </a>
  );
};

export default Room;
