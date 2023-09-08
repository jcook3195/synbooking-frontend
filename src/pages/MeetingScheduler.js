import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Container from "../components/Layout/Container";
import RoomColumn from "../components/Layout/RoomColumn/RoomColumn";
import MapColumn from "../components/Layout/MapColumn/MapColumn";
import AddMeetingModal from "../components/UI/Modal/AddMeetingModal/AddMeetingModal";
import Button from "../components/UI/Button/Button";
import CustomAlert from "../components/UI/Alert/CustomAlert";

import { modalActions } from "../store/modalStore";

const MeetingScheduler = (props) => {
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();

  const roomsState = useSelector((state) => state.meetings.rooms);
  const meetingsState = useSelector((state) => state.meetings.meetings);
  const alertState = useSelector((state) => state.alerts.showAlert);

  const getRooms = async () => {
    const res = await axios
      .get("http://localhost:8080/rooms")
      .then((res) => {
        return res.data._embedded.rooms;
      })
      .catch((err) => {
        return err;
      });

    return await res;
  };

  const getMeetings = async () => {
    const res = await axios
      .get("http://localhost:8080/meetings")
      .then((res) => {
        return res.data._embedded.meetings;
      })
      .catch((err) => {
        return err;
      });

    return await res;
  };

  const modalShowButtonClickHandler = () => {
    dispatch(modalActions.showModal());
  };

  useEffect(() => {
    // check if someone is logged in, if not then redirect
    const loggedInUser = localStorage.getItem("user");

    // if someone is logged out on page load then go to landing for login
    if (!loggedInUser) {
      navigate("/landing");
    }

    // let rooms = getRooms();
    // let meetings = getMeetings();

    console.log("ALERTS: " + alertState);
  });

  useEffect(() => {
    // get the rooms and meetings
    let rooms = getRooms();
    let meetings = getMeetings();

    console.log("ROOMS2");
    console.log(rooms);

    console.log("MEETINGS2");
    console.log(meetings);
  }, [roomsState, meetingsState]);

  return (
    <div id="meeting-scheduler">
      <Container>
        {alertState ? (
          <CustomAlert type="success">Meeting succesfully added</CustomAlert>
        ) : (
          <></>
        )}
        <Button
          type="button"
          id="showModalButton"
          classNames="btn-primary"
          onClick={modalShowButtonClickHandler}
        >
          Show Modal
        </Button>
        <RoomColumn />
        <MapColumn />
        <AddMeetingModal />
      </Container>
    </div>
  );
};

export default MeetingScheduler;
