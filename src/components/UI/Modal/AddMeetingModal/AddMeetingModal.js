import React, { forwardRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { X } from "react-bootstrap-icons";
import axios from "axios";

import CustomModal from "../CustomModal";
import Form from "../../../Form/Form";
import Input from "../../../Form/Fields/Input/Input";
import Button from "../../Button/Button";
import TextArea from "../../../Form/Fields/TextArea/TextArea";
import TimeSelect from "../../../Form/Fields/TimeSelect/TimeSelect";

import { modalActions } from "../../../../store/modalStore";
import { alertActions } from "../../../../store/alertStore";
import { meetingActions } from "../../../../store/meetingStore";

import "./AddMeetingModal.scss";

const AddMeetingModal = forwardRef((props, ref) => {
  const [emailsState, setEmailsState] = useState([]);
  const [titleVal, setTitleVal] = useState("");
  const [descVal, setDescVal] = useState("");
  const [startTimeSelectVal, setStartTimeSelectVal] = useState();
  const [endTimeSelectVal, setEndTimeSelectVal] = useState();
  const [attendeesVal, setAttendeesVal] = useState("");
  const [titleValid, setTitleValid] = useState(false);
  const [endTimeInteracted, setEndTimeInteracted] = useState(false);

  // react-hook-form validations
  const methods = useForm();

  // redux
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.showAddModal);
  const selectedRoomState = useSelector((state) => state.meetings.selectedRoom);
  const selectedMeetingDate = useSelector(
    (state) => state.meetings.selectedMeetingDate
  );
  const selectedRoomName = useSelector(
    (state) => state.meetings.selectedRoomName
  );
  const emailErrText = useSelector((state) => state.meetings.emailErrText);

  const modalHideHandler = () => {
    dispatch(modalActions.hideAddModal());

    setTitleVal("");
    setDescVal("");
    setAttendeesVal("");
    setEmailsState([]);
  };

  const modalShowHandler = () => {
    let startSelect = document.getElementById("meetingStartTimeSelect");
    let endSelect = document.getElementById("meetingEndTimeSelect");

    setStartTimeSelectVal(startSelect[0].value);
    setEndTimeSelectVal(endSelect[0].value);
  };

  const alertShowHandler = (type, message) => {
    dispatch(alertActions.showAlert());
    dispatch(alertActions.setAlertType(type));
    dispatch(alertActions.setAlertMessage(message));
  };

  const alertHideTimeout = (interval) => {
    setTimeout(() => {
      dispatch(alertActions.hideAlert());
    }, interval);
  };

  const handleFormSubmit = (e) => {
    dispatch(alertActions.showLoader(true));

    let loggedInUser = JSON.parse(localStorage.getItem("user"))["userId"];
    let endSelect = document.getElementById("meetingEndTimeSelect");
    let roomId = selectedRoomState;
    let meetingName = e.newMeetingName;
    let meetingDescription = e.meetingDescriptionField;
    let startDateTime = new Date(
      selectedMeetingDate + " " + e.meetingStartTimeSelect
    );
    let endDateTime;

    // check if the end time select was interacted with, and if it was not then instead of just grabbing the value from the event
    // select the very first option in the drop down list
    if (endTimeInteracted) {
      endDateTime = new Date(
        selectedMeetingDate + " " + e.meetingEndTimeSelect
      );
    } else {
      endDateTime = new Date(selectedMeetingDate + " " + endSelect[0].value);
    }

    let attendees = emailsState.toString();

    let data = JSON.stringify({
      user: loggedInUser,
      room: roomId,
      title: meetingName,
      description: meetingDescription,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      attendees: attendees,
    });

    // submit the new meeting
    let config = {
      method: "post",
      url: "http://localhost:8080/meetings",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    if (titleValid) {
      dispatch(meetingActions.setTitleFieldErr(false));
      setEndTimeInteracted(false);

      axios
        .request(config)
        .then((res) => {
          console.log(JSON.stringify(res.data));

          // close the modal after meeting is added successfully
          modalHideHandler();
          // show and hide alert after 5 seconds
          alertShowHandler("success", "Meeting was added successfully.");
          alertHideTimeout(5000);
          dispatch(alertActions.showLoader(false));
          dispatch(meetingActions.resetStartTimes());
          setEmailsState([]);
        })
        .catch((err) => {
          console.error(err);
          alertShowHandler("danger", "There was an error adding a meeting.");
          alertHideTimeout(5000);
          dispatch(alertActions.showLoader(false));
        });
    } else {
      dispatch(meetingActions.setTitleFieldErr(true));
      dispatch(alertActions.showLoader(false));
    }
  };

  const startTimeChangeHandler = (e) => {
    // get the selected date from the date picker and the start time, combine them into a new Date and set the state
    let startDateTime = selectedMeetingDate + " " + e.target.value;

    setStartTimeSelectVal(e.target.value);

    dispatch(meetingActions.setSelectedStartTime(startDateTime));
    dispatch(meetingActions.setMeetingStartTime(startDateTime));
  };

  const endTimeChangeHandler = (e) => {
    let endDateTime = selectedMeetingDate + " " + e.target.value;
    dispatch(meetingActions.setSelectedEndTime(endDateTime));
    setEndTimeSelectVal(e.target.value);
    setEndTimeInteracted(true);
  };

  const titleInputChangeHandler = (e) => {
    setTitleVal(e.target.value);
    if (e.target.value !== "") {
      setTitleValid(true);
    } else {
      setTitleValid(false);
    }
  };

  const descInputChangeHandler = (e) => {
    setDescVal(e.target.value);
  };

  const attendeesInputChangeHandler = (e) => {
    setAttendeesVal(e.target.value);
  };

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const checkEmailDupes = (email) => {
    let emails = emailsState;

    return emails.includes(email);
  };

  const handleEmailKeyDown = (e) => {
    if (["Enter", "Tab", ","].includes(e.key)) {
      e.preventDefault();

      let validEmail = false;

      let email = e.target.value;

      let emailIsValid = validateEmail(email);
      let emailDupes = checkEmailDupes(email);

      if (emailIsValid || !emailDupes) {
        validEmail = true;
      } else if (emailIsValid) {
        dispatch(meetingActions.setEmailErrText("This is not a valid email."));
      } else if (emailDupes) {
        dispatch(
          meetingActions.setEmailErrText("This email has already been added.")
        );
      }

      if (validEmail) {
        setEmailsState((emailsState) => [...emailsState, email]);

        dispatch(meetingActions.setEmailFieldErr(false));

        setAttendeesVal("");
      } else {
        dispatch(meetingActions.setEmailFieldErr(true));
      }
    }
  };

  const handleEmailDelete = (deleteEmail) => {
    setEmailsState(emailsState.filter((email) => email !== deleteEmail));
  };

  return (
    <CustomModal
      heading={"Add a meeting for room " + selectedRoomName}
      show={modalState}
      onHide={modalHideHandler}
      onShow={modalShowHandler}
    >
      <FormProvider {...methods}>
        <Form
          formId="addMeetingForm"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <Input
            ref={ref}
            label="Meeting Name"
            id="newMeetingName"
            type="text"
            name="newMeetingName"
            placeholder="Meeting Name"
            invalidText="Please enter a name for the meeting."
            onChange={titleInputChangeHandler}
            value={titleVal}
          />
          <TextArea
            id="meetingDescriptionField"
            name="meetingDescriptionField"
            label="Description"
            placeholder="Please describe what this meeting is about"
            rows={3}
            onChange={descInputChangeHandler}
            value={descVal}
            ref={ref}
          />
          <TimeSelect
            id="meetingStartTimeSelect"
            name="meetingStartTimeSelect"
            label="Start Time"
            startEnd="start"
            invocation="add"
            onChange={startTimeChangeHandler}
            value={startTimeSelectVal}
            ref={ref}
          />
          <TimeSelect
            id="meetingEndTimeSelect"
            name="meetingEndTimeSelect"
            label="End Time"
            startEnd="end"
            invocation="add"
            onChange={endTimeChangeHandler}
            value={endTimeSelectVal}
            ref={ref}
          />
          <TextArea
            id="meetingAttendeesField"
            name="meetingAttendeesField"
            label="Attendees (Enter an email and press 'Enter', 'Tab', or ',')"
            placeholder="Add one valid email at a time."
            invalidText={emailErrText}
            rows={1}
            onKeyDown={handleEmailKeyDown}
            onChange={attendeesInputChangeHandler}
            value={attendeesVal}
            ref={ref}
          />
          <div className="email-badge-container">
            {emailsState.map((email) => {
              return (
                <span
                  className="badge rounded-pill email-pill"
                  key={email + new Date()}
                >
                  {email}

                  <button
                    type="button"
                    className="btn btn-light pill-btn"
                    onClick={() => handleEmailDelete(email)}
                  >
                    <X />
                  </button>
                </span>
              );
            })}
          </div>
          <Button
            type="submit"
            id="addNewMeetingSubmitBtn"
            classNames="btn-primary form-btn-first"
          >
            Add Meeting
          </Button>
          <Button
            type="button"
            id="cancelAddNewMeetingBtn"
            classNames="btn-secondary"
            onClick={modalHideHandler}
          >
            Cancel
          </Button>
        </Form>
      </FormProvider>
    </CustomModal>
  );
});

export default AddMeetingModal;
