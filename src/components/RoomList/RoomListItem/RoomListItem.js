import React from "react";
import { useDispatch } from "react-redux";
import Accordion from "react-bootstrap/Accordion";
import { CalendarPlus } from "react-bootstrap-icons";

import AvailabilityCircle from "../../UI/AvailabilityCircle/AvailabilityCircle";
import Button from "../../UI/Button/Button";
import BookedMeetings from "./BookedMeetings/BookedMeetings";

import { modalActions } from "../../../store/modalStore";
import { meetingActions } from "../../../store/meetingStore";

import "./RoomListItem.scss";

const RoomsListItem = (props) => {
  // redux
  const dispatch = useDispatch();

  const modalShowButtonClickHandler = (roomId) => {
    dispatch(modalActions.showModal());
    dispatch(meetingActions.setSelectedRoom(roomId));
  };

  return (
    <>
      <Accordion.Item
        eventKey={props.roomName.toUpperCase()}
        id={"room-list-" + props.roomName}
        className="room-list-item accordion-item"
      >
        <Accordion.Header>
          <div className="accordion-title-content">
            <h4>
              Room {props.roomName.toUpperCase()}
              <AvailabilityCircle availability={props.roomAvailability} />
            </h4>
            <p>{props.roomStatus}</p>
          </div>
        </Accordion.Header>
        <Accordion.Body>
          <Button
            type="button"
            id="showModalButton"
            classNames="btn-primary"
            onClick={() => modalShowButtonClickHandler(props.roomId)}
          >
            <CalendarPlus></CalendarPlus> New Meeting
          </Button>
          <BookedMeetings roomId={props.roomId} />
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default RoomsListItem;
