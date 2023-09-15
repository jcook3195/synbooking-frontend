import React from "react";
import { useSelector } from "react-redux";

import Building from "../../Building/Building";

const MapColumn = () => {
  const selectedRoom = useSelector((state) => state.meetings.selectedRoom);

  return (
    <div id="map-col" className="col-12 col-lg-9 text-center">
      <h1>{selectedRoom}</h1>
      <Building />
    </div>
  );
};

export default MapColumn;
