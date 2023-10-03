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

  const meetingToEdit = useSelector((state) => state.meetings.meetingToEdit);
  const editingActive = useSelector((state) => state.meetings.editingActive);
  const activeMeetings = useSelector((state) => state.meetings.activeMeetings);

  let now;

  if (props.startEnd === "end") {
    now = new Date(selectedStartTime);
  } else {
    now = new Date();

    // check if this is an issue with the active meetings
    // all this just to make the start time show properly in the 'My meetings' section
    // there was an issue with being able to edit a start time of an active meeting since it will only show start times in the future
    // being able to edit the start time after the meeting has started would be necessary some times
    if (meetingToEdit !== null) {
      Object.values(activeMeetings).forEach((val) => {
        Object.values(val).forEach((val2) => {
          if (val2.id === meetingToEdit.id) {
            // if a meeting is being edited, and that meetings id matches an entry in our active meetings, then set the start date first potential value to the edited meetings start time
            now = new Date(meetingToEdit.startDateTime);
          }
        });
      });
    }
  }

  let timeH = now.getHours();
  let timeM = now.getMinutes();
  let today = new Date().getDate().toString();

  // add a 0 to the today string if it is only one character
  if (today.length < 2) {
    today = "0" + today;
  }

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
    if (selectedDate !== today) {
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

  // if (props.invocation === "add") {
  //   setValue(props.name, timesArray[0]);

  //   console.log("set the value to " + timesArray[0]);
  // }

  if (meetingToEdit !== null) {
    let start = new Date(meetingToEdit.startDateTime);
    let end = new Date(meetingToEdit.endDateTime);

    let startHrs = start.getHours().toString();
    let startMins = start.getMinutes().toString();
    let endHrs = end.getHours().toString();
    let endMins = end.getMinutes().toString();

    if (startHrs.length < 2) {
      startHrs = "0" + startHrs;
    }

    if (startMins.length < 2) {
      startMins = "0" + startMins;
    }

    if (endHrs.length < 2) {
      endHrs = "0" + endHrs;
    }

    if (endMins.length < 2) {
      endMins = "0" + endMins;
    }

    if (props.invocation === "edit") {
      if (editingActive) {
        if (props.startEnd === "start") {
          setValue(props.name, startHrs + ":" + startMins);
        } else {
          setValue(props.name, endHrs + ":" + endMins);
        }
      }
    }
  }

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
        {...register(props.name, {
          onChange: props.onChange,
        })}
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
