import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { meetingActions } from "../../../../store/meetingStore";

const DateInput = (props) => {
  // redux
  const dispatch = useDispatch();

  // only let meetings be booked one week ahead of time
  let today = new Date();
  let maxDay = today.getDate() + 7;

  let todayString = today.toISOString().split("T")[0];
  let endOfWeek = new Date(today.setDate(maxDay)).toISOString().split("T")[0];

  // set initial field value
  const [fieldVal, setFieldVal] = useState(todayString);

  const onChangeHandler = (e) => {
    setFieldVal(e.target.value);
    dispatch(meetingActions.setSelectedMeetingDate(e.target.value));
  };

  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label text-white">
        {props.label}
      </label>
      <input
        type="date"
        id={props.id}
        name={props.id}
        className="form-control"
        aria-label={props.label}
        min={todayString}
        max={endOfWeek}
        value={fieldVal}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default DateInput;
