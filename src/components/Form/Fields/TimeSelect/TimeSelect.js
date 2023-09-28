import React from "react";
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";

const TimeSelect = (props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

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
    // loop through 6 - 18 for open hours
    if (selectedDate !== today.toString()) {
      // if it is the current date that the user has selected
      for (let j = 0; j < 60; j++) {
        // loop through 0 - 59 for all possible minute values
        if (j % 15 === 0) {
          // only show the 15 min increments
          let stringJLen = j.toString().length; // convert to string and get length so if value is 0 it adds another 0 ex: (060 ~ 0600)
          let minuteVal = j;

          if (stringJLen < 2) {
            minuteVal = "0" + j;
          }

          if (props.startEnd === "end" && meetingStartTime != null) {
            // if it is a meeting end time picker
            if (i > newSelectedHours) {
              // if the hour value of the selected start time is less than the loop hour index
              timesArray.push(i + ":" + minuteVal); // add the time to the array
            } else if (i === newSelectedHours && j >= newSelectedMinutes) {
              // if the hour of the selected start time is te same and the selected minutes is less than the minute loop index
              timesArray.push(i + ":" + minuteVal); // add the time to the array
            }
          } else {
            // if it is a meeting start time picker
            timesArray.push(i + ":" + minuteVal);
          }
        }
      }
    } else if (i >= timeH) {
      // if it is a future date the user has selected
      for (let j = 0; j < 60; j++) {
        // loop through 0 - 59 for all possible minute values
        if (j % 15 === 0) {
          // only show the 15 min increments
          let stringJLen = j.toString().length; // convert to string and get length so if value is 0 it adds another 0 ex: (060 ~ 0600)
          let minuteVal = j;

          if (stringJLen < 2) {
            minuteVal = "0" + j;
          }

          if (i > timeH) {
            // if the current hour is less than the hour loop index
            timesArray.push(i + ":" + minuteVal); // add the time to the array
          } else if (i === timeH && j >= timeM) {
            timesArray.push(i + ":" + minuteVal); // if the current hour is equal to the loop index and the current minutes are less than the minute loop index
          }
        }
      }
    }
  }

  if (props.startEnd === "end") {
    timesArray.shift(); // remove the first time as a possible end time
    timesArray.push("18:00"); // always need this end time
  }

  // set the form field value
  setValue(props.name, props.value);

  // check if the name of the input is contained in the error object for displaying err class and message
  const err = Object.keys(errors).includes(props.name) ? true : false;
  const errClass = err ? " is-invalid" : "";

  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <select
        name={props.name}
        id={props.id}
        className={"form-select" + errClass}
        aria-label={props.label}
        onChange={props.onChange}
        {...register(props.name, props.validations)}
      >
        {timesArray.map((time) => (
          <option value={time} key={time}>
            {time}
          </option>
        ))}
      </select>
      {err && <div className="invalid-feedback">{props.invalidText}</div>}
    </div>
  );
};

export default TimeSelect;
