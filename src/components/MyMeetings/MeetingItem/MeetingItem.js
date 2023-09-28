import React from "react";
import { useDispatch } from "react-redux";

import Button from "../../UI/Button/Button";

import { modalActions } from "../../../store/modalStore";
import { meetingActions } from "../../../store/meetingStore";

import "./MeetingItem.scss";

const MeetingItem = (props) => {
  // redux
  const dispatch = useDispatch();

  const editModalShowButtonCLickHanlder = (meetingId) => {
    dispatch(modalActions.showEditModal());
    dispatch(meetingActions.setSelectedMeeting(meetingId));
  };

  const deleteModalShowButtonCLickHanlder = (meetingId) => {
    dispatch(modalActions.showDeleteModal());
    dispatch(meetingActions.setSelectedMeeting(meetingId));
  };

  return (
    <div className="my-meeting p-2">
      <div className="meeting-info">
        <h6>{props.title}</h6>
        <p>
          Room {props.roomName}: {props.start} - {props.end}
        </p>
      </div>
      <div className="meeting-actions">
        <Button
          type="button"
          id={"editMeet" + props.meetingId + "Btn"}
          classNames="btn-primary"
          onClick={() => editModalShowButtonCLickHanlder(props.meetingId)}
        >
          Edit
        </Button>
        <Button
          type="button"
          id={"deleteMeet" + props.meetingId + "Btn"}
          classNames="btn-danger"
          onClick={() => deleteModalShowButtonCLickHanlder(props.meetingId)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default MeetingItem;
