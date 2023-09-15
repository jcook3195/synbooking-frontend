import React from "react";
import { useSelector } from "react-redux";

const TimeSelect = (props) => {
  // redux
  const selectedStartTime = useSelector(
    (state) => state.meetings.selectedStartTime
  );

  const selectedMeetingDate = useSelector(
    (state) => state.meetings.selectedMeetingDate
  );

  const meetingStartTime = useSelector(
    (state) => state.meetings.meetingStartTime
  );

  let now;

  if (props.startEnd === "end") {
    now = new Date(selectedStartTime);
  } else {
    now = new Date();
  }

  let timeH = now.getHours();
  let timeM = now.getMinutes();
  let today = new Date().getDate();

  // javascript sucks so you have to do this to get an accurate day
  // this selectedMeetingDate is formatted yyyy-mm-dd and when
  // running .getDate() here it returns one day less for some reason
  // formatting as mm-dd-yyyy fixes this issue but we only need it
  // for a simple comparison, so just going to use the string
  let selectedDate = selectedMeetingDate.split("-")[2];

  let newSelectedHours = new Date(meetingStartTime).getHours();
  let newSelectedMinutes = new Date(meetingStartTime).getMinutes();

  // build an array of all possible meeting start/end times
  let timesArray = [];
  for (let i = 6; i < 18; i++) {
    if (selectedDate != today) {
      for (let j = 0; j < 60; j++) {
        if (j % 15 === 0) {
          let stringJLen = j.toString().length;
          let minuteVal = j;

          if (stringJLen < 2) {
            minuteVal = "0" + j;
          }

          if (props.startEnd === "end" && meetingStartTime != null) {
            if (i > newSelectedHours) {
              timesArray.push(i + ":" + minuteVal);
            } else if (i === newSelectedHours && j >= newSelectedMinutes) {
              timesArray.push(i + ":" + minuteVal);
            }
          } else {
            timesArray.push(i + ":" + minuteVal);
          }
        }
      }
    } else if (i >= timeH) {
      for (let j = 0; j < 60; j++) {
        if (j % 15 === 0) {
          let stringJLen = j.toString().length;
          let minuteVal = j;

          if (stringJLen < 2) {
            minuteVal = "0" + j;
          }

          if (i > timeH) {
            timesArray.push(i + ":" + minuteVal);
          } else if (i === timeH && j >= timeM) {
            timesArray.push(i + ":" + minuteVal);
          }
        }
      }
    }
  }

  if (props.startEnd === "end") {
    timesArray.shift(); // remove the first time as a possible end time
    timesArray.push("18:00"); // always need this end time
  }

  console.log("rendering");

  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <select
        name={props.id}
        id={props.id}
        className="form-select"
        aria-label={props.label}
        onChange={props.onChange}
      >
        {timesArray.map((time) => (
          <option value={time} key={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelect;
