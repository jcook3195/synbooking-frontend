import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { meetingActions } from "../../../../store/meetingStore";

const DateInput = (props) => {
  // redux
  const dispatch = useDispatch();
  const selectedMeetingDate = useSelector(
    (state) => state.meetings.selectedMeetingDate
  );

  // only let meetings be booked one week ahead of time
  let today = new Date();
  let maxDay = today.getDate() + 7;

  let todayString = today.toISOString().split("T")[0];
  let endOfWeek = new Date(today.setDate(maxDay)).toISOString().split("T")[0];

  // set initial field value
  const [fieldVal, setFieldVal] = useState(todayString);

  const onChangeHandler = (e) => {
    setFieldVal(e.target.value);
    // reset the previous meetings state to clear the meetings
    dispatch(meetingActions.resetRoomAvailability());
    // set the selected meeting date from the input
    dispatch(meetingActions.setSelectedMeetingDate(e.target.value));

    // grab all the meetings for the set date
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/meetings/" + selectedMeetingDate,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((res) => {
        // console.log(JSON.stringify(res.data));
        dispatch(meetingActions.setMeetings(res.data));
        // update the meetings state
        dispatch(meetingActions.updateRoomAvailability());
      })
      .catch((err) => {
        console.error(err);
      });
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
