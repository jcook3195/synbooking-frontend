import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";

import Container from "../components/Layout/Container";
import RoomColumn from "../components/Layout/RoomColumn/RoomColumn";
import MapColumn from "../components/Layout/MapColumn/MapColumn";
import AddMeetingModal from "../components/UI/Modal/AddMeetingModal/AddMeetingModal";
import CustomAlert from "../components/UI/Alert/CustomAlert";

const MeetingScheduler = () => {
  const navigate = useNavigate();

  const meetingsState = useSelector((state) => state.meetings.meetings);
  const showAlertState = useSelector((state) => state.alerts.showAlert);
  const alertTypeState = useSelector((state) => state.alerts.alertType);
  const alertMessageState = useSelector((state) => state.alerts.alertMessage);

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

  useEffect(() => {
    // check if someone is logged in, if not then redirect
    const loggedInUser = localStorage.getItem("user");

    // if someone is logged out on page load then go to landing for login
    if (!loggedInUser) {
      navigate("/landing");
    }

    // let rooms = getRooms();
    // let meetings = getMeetings();
  });

  // useEffect(() => {
  //   // get the rooms and meetings
  //   let rooms = getRooms();
  //   let meetings = getMeetings();

  //   console.log("ROOMS2");
  //   console.log(rooms);

  //   console.log("MEETINGS2");
  //   console.log(meetings);
  // }, [meetingsState]);

  return (
    <div id="meeting-scheduler">
      <Container>
        {showAlertState ? (
          <CustomAlert type={alertTypeState}>{alertMessageState}</CustomAlert>
        ) : (
          <></>
        )}
        <RoomColumn />
        <MapColumn />
        <AddMeetingModal />
      </Container>
    </div>
  );
};

export default MeetingScheduler;
