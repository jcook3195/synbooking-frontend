import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import Container from "../components/Layout/Container";
import RoomColumn from "../components/Layout/RoomColumn/RoomColumn";
import MapColumn from "../components/Layout/MapColumn/MapColumn";

const MeetingScheduler = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // check if someone is logged in, if not then redirect
    const loggedInUser = localStorage.getItem("user");

    // if someone is logged out on page load then go to landing for login
    if (!loggedInUser) {
      navigate("/landing");
    }
  });

  return (
    <div id="meeting-scheduler">
      <Container>
        <RoomColumn />
        <MapColumn />
      </Container>
    </div>
  );
};

export default MeetingScheduler;
