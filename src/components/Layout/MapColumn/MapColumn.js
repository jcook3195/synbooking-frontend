import React from "react";
import { useSelector } from "react-redux";

import Building from "../../Building/Building";

const MapColumn = () => {
  const meetings = useSelector((state) => state.meetings.meetings);

  return (
    <div id="map-col" className="col-12 col-lg-9 text-center">
      <p>{JSON.stringify(meetings)}</p>
      <Building />
    </div>
  );
};

export default MapColumn;
