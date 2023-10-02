import React from "react";
import { useSelector } from "react-redux";

import Building from "../../Building/Building";

const MapColumn = () => {
  const meetings = useSelector((state) => state.meetings.meetings);
  const pastMeetings = useSelector((state) => state.meetings.pastMeetings);
  const activeMeetings = useSelector((state) => state.meetings.activeMeetings);
  const upcomingMeetings = useSelector(
    (state) => state.meetings.upcomingMeetings
  );

  return (
    <div id="map-col" className="col-12 col-lg-9 text-center">
      {/* <p>All - {JSON.stringify(meetings)}</p>
      <p>Past - {JSON.stringify(pastMeetings)}</p>
      <p>Active - {JSON.stringify(activeMeetings)}</p>
      <p>Future - {JSON.stringify(upcomingMeetings)}</p> */}
      <Building />
    </div>
  );
};

export default MapColumn;
