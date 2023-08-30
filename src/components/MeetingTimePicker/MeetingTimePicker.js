import React from "react";

import DatePicker from "../Form/Fields/DatePicker";

import "./MeetingTimePicker.scss";

const MeetingTimePicker = () => {
  return (
    <React.Fragment>
      <div className="col-12">
        <div className="row">
          <p>Start:</p>
          <DatePicker />
        </div>
      </div>
      <div className="col-12">
        <div className="row">
          <p>End:</p>
          <DatePicker />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MeetingTimePicker;
