import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { meetingActions } from "../../../../store/meetingStore";

const DateInput = (props) => {
  // redux
  const dispatch = useDispatch();

  // figure out today and the following friday to restrict meeting booking
  // TODO - Maybe have it restricted to just booking 1 or two weeks ahead of time? That way you can book a monday morning meeting on a friday
  let today = new Date();
  let first = today.getDate() - today.getDay();
  let last = first + 5;

  let todayString = today.toISOString().split("T")[0];
  let friday = new Date(today.setDate(last)).toISOString().split("T")[0];

  const selectedMeetingDate = useSelector(
    (state) => state.meetings.selectedMeetingDate
  );

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
        max={friday}
        value={fieldVal}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default DateInput;
