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
import { useLocalState } from "../store/useLocalStore";
import {UserReturn} from "../store/authStore";

const MeetingScheduler = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const showAlertState = useSelector((state) => state.alerts.showAlert);
  const alertTypeState = useSelector((state) => state.alerts.alertType);
  const alertMessageState = useSelector((state) => state.alerts.alertMessage);
  const selectedMeetingDate = useSelector(
    (state) => state.meetings.selectedMeetingDate
  );
  const [jwt, setJwt] = useLocalState("", "jwt");

  

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/users",
      headers: {
        "Content-Type": "applicaiton/json",
        Authorization: `bearer ${jwt}`,
      },
    };

    axios
      .request(config)
      .then((res) => {
        for(let i = 0; i < res.data.length; i++){
          let users = {
            1: `${res.data[i].firstname}`
          }
          console.log(users);
          // if(localStorage.getItem('username') == res.data[i].username){
          //   console.log("They compare");
          //   console.log(localStorage.getItem('username') + res.data[i].username);

          //   break;
          // }
          // else{
          //   console.log("User not found");
          // }
        }
        // console.log(res.data);
        // console.log(res.data[3]);
        // console.log(res.data[3].firstname);
        // console.log(localStorage.getItem('username'));
      })
  })

  useEffect(() => {

    // grab all the meetings for the set date
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/meetings/" + selectedMeetingDate,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${jwt}`
      },
    };

    axios
      .request(config)
      .then((res) => {
        // reset the previous meetings state to clear the meetings
        dispatch(meetingActions.resetRoomAvailability());
        // set the meetings
        dispatch(meetingActions.setMeetings(res.data));
        // update the availability
        dispatch(meetingActions.updateRoomAvailability());
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
