import React from "react";

import Container from "../components/Layout/Container";
import RoomColumn from "../components/Layout/RoomColumn/RoomColumn";

const MeetingScheduler = (props) => {
  return (
    <div id="meeting-scheduler">
      <Container>
        <RoomColumn />
      </Container>
    </div>
  );
};

export default MeetingScheduler;
