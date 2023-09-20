import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Container from "../components/Layout/Container";
import RoomColumn from "../components/Layout/RoomColumn/RoomColumn";
import MapColumn from "../components/Layout/MapColumn/MapColumn";
import AddMeetingModal from "../components/UI/Modal/AddMeetingModal/AddMeetingModal";
import CustomAlert from "../components/UI/Alert/CustomAlert";

import { meetingActions } from "../store/meetingStore";

const MeetingScheduler = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const showAlertState = useSelector((state) => state.alerts.showAlert);
  const alertTypeState = useSelector((state) => state.alerts.alertType);
  const alertMessageState = useSelector((state) => state.alerts.alertMessage);
  const selectedMeetingDate = useSelector(
    (state) => state.meetings.selectedMeetingDate
  );

  useEffect(() => {
    // check if someone is logged in, if not then redirect
    const loggedInUser = localStorage.getItem("user");

    // if someone is logged out on page load then go to landing for login
    if (!loggedInUser) {
      navigate("/landing");
    }

    // grab all the meetings for the set date
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/meetings/" + selectedMeetingDate,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((res) => {
        // console.log(JSON.stringify(res.data));
        dispatch(meetingActions.setMeetings(res.data));
        // dispatch(meetingActions.updateRoomAvailability());
        dispatch(meetingActions.updateRoomAvailability2());
      })
      .catch((err) => {
        console.error(err);
      });
  });

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
