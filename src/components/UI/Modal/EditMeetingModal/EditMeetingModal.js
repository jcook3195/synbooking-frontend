import React, { useEffect, useState, forwardRef } from "react";
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

import "./EditMeetingModal.scss";

const EditMeetingModal = forwardRef((props, ref) => {
  const [emailsState, setEmailsState] = useState([]);
  const [titleVal, setTitleVal] = useState("");
  const [descVal, setDescVal] = useState("");
  const [startTimeVal, setStartTimeVal] = useState();
  const [endTimeVal, setEndTimeVal] = useState();
  const [attendeesVal, setAttendeesVal] = useState("");
  const [titleValid, setTitleValid] = useState(false);
  const [endTimeInteracted, setEndTimeInteracted] = useState(false);

  // react-hook-form validations
  const methods = useForm();

  // redux
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.showEditModal);
  const selectedRoomState = useSelector((state) => state.meetings.selectedRoom);
  const selectedRoomName = useSelector(
    (state) => state.meetings.selectedRoomName
  );
  const emailErrText = useSelector((state) => state.meetings.emailErrText);
  const selectedMeeting = useSelector(
    (state) => state.meetings.selectedMeeting
  );
  const selectedMeetingDate = useSelector(
    (state) => state.meetings.selectedMeetingDate
  );
  const selectedEditMeetingDate = useSelector(
    (state) => state.meetings.selectedEditMeetingDate
  );

  useEffect(() => {
    // let loggedInUser = JSON.parse(localStorage.getItem("user"))["userId"];
    dispatch(alertActions.showLoader(true));

    if (selectedMeeting !== null) {
      // get the meeting
      let config = {
        method: "get",
        url: "http://localhost:8080/meetings/id/" + selectedMeeting,
      };

      axios
        .request(config)
        .then((res) => {
          // console.log(JSON.stringify(res.data));
          setTitleVal(res.data.title);
          setTitleValid(true);
          setDescVal(res.data.description);

          // dont set the attendees field value, set the state to create the badges
          if (res.data.attendees === "") {
            setEmailsState([]);
          } else {
            setEmailsState(res.data.attendees.split(","));
          }

          dispatch(meetingActions.setMeetingToEdit(res.data));
          dispatch(meetingActions.setSelectedRoom(res.data.room));
          dispatch(meetingActions.setEditingActive(true));

          let start = new Date(res.data.startDateTime);
          let end = new Date(res.data.endDateTime);
          let startHrs = start.getHours();
          let startMins = start.getMinutes();
          let endHrs = end.getHours();
          let endMins = end.getMinutes();

          if (startHrs.toString().length < 2) {
            startHrs = "0" + startHrs;
          }
          if (startMins.toString().length < 2) {
            startMins = startMins + "0";
          }
          if (endHrs.toString().length < 2) {
            endHrs = "0" + endHrs;
          }
          if (endMins.toString().length < 2) {
            endMins = endMins + "0";
          }

          setStartTimeVal(startHrs + ":" + startMins);
          setEndTimeVal(endHrs + ":" + endMins);

          let startElem = document.getElementById("editMeetingStartTimeSelect");
          let endElem = document.getElementById("editMeetingEndTimeSelect");

          startElem.value = startTimeVal;
          endElem.value = endTimeVal;

          dispatch(alertActions.showLoader(false));

          // console.log("title", titleVal);
          // console.log("desc", descVal);
          // console.log("atten", attendeesVal);
          // console.log("start", startTimeVal);
          // console.log("end", endTimeVal);
        })
        .catch((err) => {
          console.error(err);
          alertShowHandler(
            "danger",
            "There was an error retreiving this meeting. Please refresh the browser."
          );
          alertHideTimeout(5000);
          dispatch(alertActions.showLoader(false));
        });
    }
  }, [modalState]);

  const descInputChangeHandler = (e) => {
    setDescVal(e.target.value);
  };

  const endTimeInputChangeHandler = (e) => {
    let endDateTime = selectedMeetingDate + " " + e.target.value;
    dispatch(meetingActions.setSelectedEndTime(endDateTime));
    setEndTimeVal(e.target.value);
    setEndTimeInteracted(true);
  };

  const modalHideHandler = () => {
    dispatch(modalActions.hideEditModal());

    setTitleVal("");
    setDescVal("");
    setAttendeesVal("");
    setEmailsState([]);
  };

  const modalShowHandler = () => {
    let startSelect = document.getElementById("editMeetingStartTimeSelect");
    let endSelect = document.getElementById("editMeetingEndTimeSelect");

    setStartTimeVal(startSelect[0].value);
    setEndTimeVal(endSelect[0].value);
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
    let endSelect = document.getElementById("editMeetingEndTimeSelect");
    let roomId = selectedRoomState;
    let meetingName = e.editMeetingName;
    let meetingDescription = e.editMeetingDescriptionField;
    let startDateTime = new Date(
      selectedMeetingDate + " " + e.editMeetingStartTimeSelect
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
      id: selectedMeeting,
      user: loggedInUser,
      room: roomId,
      title: meetingName,
      description: meetingDescription,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      attendees: attendees,
    });

    // update the meeting
    let config = {
      method: "put",
      url: "http://localhost:8080/meetings/" + selectedMeeting,
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

          // close the modal after meeting is update successfully
          modalHideHandler();
          // show and hide alert after 5 seconds
          alertShowHandler("success", "Meeting was updated successfully.");
          alertHideTimeout(5000);
          // dispatch(meetingActions.setEditingActive(false));
          dispatch(alertActions.showLoader(false));
          dispatch(meetingActions.setMeetingToEdit(null));
          dispatch(meetingActions.resetStartTimes());
        })
        .catch((err) => {
          console.error(err);
          alertShowHandler("danger", "There was an error updating a meeting.");
          alertHideTimeout(5000);
          dispatch(alertActions.showLoader(false));
          dispatch(meetingActions.setMeetingToEdit(null));
        });
    } else {
      dispatch(meetingActions.setTitleFieldErr(true));
      dispatch(alertActions.showLoader(false));
    }
  };

  const titleInputChangeHandler = (e) => {
    setTitleVal(e.target.value);
    if (e.target.value !== "") {
      setTitleValid(true);
    } else {
      setTitleValid(false);
    }
  };

  const startTimeChangeHandler = (e) => {
    // get the selected date from the date picker and the start time, combine them into a new Date and set the state
    let startDateTime = selectedMeetingDate + " " + e.target.value;

    setStartTimeVal(e.target.value);
    dispatch(meetingActions.setSelectedStartTime(startDateTime));
    dispatch(meetingActions.setMeetingStartTime(startDateTime));
    dispatch(meetingActions.setEditingActive(false));
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
    if (["Enter", ","].includes(e.key)) {
      e.preventDefault();

      let validEmail = false;

      let email = e.target.value;

      let emailIsValid = validateEmail(email);
      let emailDupes = checkEmailDupes(email);

      if (emailIsValid !== null) {
        if (!emailDupes) {
          validEmail = true;
        } else {
          dispatch(
            meetingActions.setEmailErrText("This email has already been added.")
          );
        }
      } else {
        dispatch(meetingActions.setEmailErrText("This is not a valid email."));
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

  let editMeetingDate = new Date(selectedEditMeetingDate);
  let editMeetingHrs = editMeetingDate.getHours().toString();
  let editMeetingMins = editMeetingDate.getMinutes().toString();

  if (editMeetingHrs < 2) {
    editMeetingHrs = "0" + editMeetingHrs;
  }

  if (editMeetingMins < 2) {
    editMeetingMins = "0" + editMeetingMins;
  }

  return (
    <CustomModal
      heading={
        "Edit " +
        editMeetingHrs +
        ":" +
        editMeetingMins +
        " meeting in room " +
        selectedRoomName
      }
      show={modalState}
      onHide={modalHideHandler}
      onShow={modalShowHandler}
    >
      {/* {JSON.stringify(editingMeeting)} */}
      <FormProvider {...methods}>
        <Form
          formId="editMeetingForm"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <Input
            validations={{
              required: true,
            }}
            ref={ref}
            label="Meeting Name"
            id="editMeetingName"
            type="text"
            name="editMeetingName"
            placeholder="Meeting Name"
            onChange={titleInputChangeHandler}
            value={titleVal}
            invalidText="Please enter a name for the meeting."
          />
          <TextArea
            id="editMeetingDescriptionField"
            name="editMeetingDescriptionField"
            label="Description"
            placeholder="Please describe what this meeting is about"
            rows={3}
            onChange={descInputChangeHandler}
            value={descVal}
            ref={ref}
          />
          <TimeSelect
            id="editMeetingStartTimeSelect"
            name="editMeetingStartTimeSelect"
            label="Start Time"
            startEnd="start"
            invocation="edit"
            onChange={startTimeChangeHandler}
            value={startTimeVal}
            ref={ref}
          />
          <TimeSelect
            id="editMeetingEndTimeSelect"
            name="editMeetingEndTimeSelect"
            label="End Time"
            startEnd="end"
            invocation="edit"
            onChange={endTimeInputChangeHandler}
            value={endTimeVal}
            ref={ref}
          />
          <TextArea
            id="editMeetingAttendeesField"
            name="editMeetingAttendeesField"
            label="Attendees (Enter an email and press 'Enter' or ',')"
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
            id="editNewMeetingSubmitBtn"
            classNames="btn-primary form-btn-first"
          >
            Update Meeting
          </Button>
          <Button
            type="button"
            id="cancelEditMeetingBtn"
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

export default EditMeetingModal;
