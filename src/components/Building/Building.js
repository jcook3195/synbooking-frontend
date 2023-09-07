import React from "react";

import "./Building.scss";
import Room from "./Room/Room";

const Building = () => {
  return (
    <div id="ex-map-container">
      <div id="bldg-main" className="building-part">
        <div className="bldg-rooms">
          <Room name="A" size="small" availability="" />
          <Room name="B" size="small" availability="unavailable" />
          <Room name="C" size="small" availability="" />
          <Room name="D" size="small" availability="" />
          <Room name="E" size="small" availability="" />
          <Room name="F" size="small" availability="" />
          <Room name="G" size="small" availability="" />
          <Room name="H" size="small" availability="" />
          <Room name="I" size="large" availability="" />
          <Room name="J" size="large" availability="" />
        </div>
      </div>
    </div>
  );
};

export default Building;
