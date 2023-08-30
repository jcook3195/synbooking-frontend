import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";

import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import "./DatePicker.scss";

let ValuePiece = Date | null;

let Value = ValuePiece | [ValuePiece, ValuePiece];

const DatePicker = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <DateTimePicker onChange={onChange} value={value} disableClock={true} />
    </div>
  );
};

export default DatePicker;
