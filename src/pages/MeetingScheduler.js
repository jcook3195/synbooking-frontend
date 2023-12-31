import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import Container from "../components/Layout/Container";
import RoomColumn from "../components/Layout/RoomColumn/RoomColumn";
import MapColumn from "../components/Layout/MapColumn/MapColumn";
import AddMeetingModal from "../components/UI/Modal/AddMeetingModal/AddMeetingModal";
import EditMeetingModal from "../components/UI/Modal/EditMeetingModal/EditMeetingModal";
import DeleteMeetingModal from "../components/UI/Modal/DeleteMeetingModal/DeleteMeetingModal";
import CustomAlert from "../components/UI/Alert/CustomAlert";

import { meetingActions } from "../store/meetingStore";
import { alertActions } from "../store/alertStore";

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
    dispatch(alertActions.showLoader(true));

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
        // reset the previous meetings state to clear the meetings
        dispatch(meetingActions.resetRoomAvailability());

        if (typeof res.data === "object") {
          // set the meetings
          dispatch(meetingActions.setMeetings(res.data));

          // update the availability
          dispatch(meetingActions.updateRoomAvailability());
        } else {
          // reset the meetings to empty
          dispatch(meetingActions.resetMeetings());

          // reset the availability by past, active, and upcoming
          dispatch(meetingActions.updateRoomAvailability());
        }

        dispatch(alertActions.showLoader(false));
      })
      .catch((err) => {
        console.error(err);
        dispatch(alertActions.showLoader(false));
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
        <EditMeetingModal />
        <DeleteMeetingModal />
      </Container>
    </div>
  );
};

export default MeetingScheduler;
