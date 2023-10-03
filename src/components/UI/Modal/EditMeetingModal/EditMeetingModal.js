import React, { useEffect, useState, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
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
  const [titleVal, setTitleVal] = useState("");
  const [descVal, setDescVal] = useState("");
  const [startTimeVal, setStartTimeVal] = useState("");
  const [endTimeVal, setEndTimeVal] = useState("");
  const [attendeesVal, setAttendeesVal] = useState("");

  // react-hook-form validations
  const methods = useForm();

  // redux
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.showEditModal);
  const selectedRoomState = useSelector((state) => state.meetings.selectedRoom);
  const selectedRoomName = useSelector(
    (state) => state.meetings.selectedRoomName
  );
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
          console.log(JSON.stringify(res.data));
          setTitleVal(res.data.title);
          setDescVal(res.data.description);
          setAttendeesVal(res.data.attendees);
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

  const attendeesInputChangeHandler = (e) => {
    setAttendeesVal(e.target.value);
  };

  const endTimeInputChangeHandler = (e) => {
    setEndTimeVal(e.target.value);
  };

  const modalHideHandler = () => {
    dispatch(modalActions.hideEditModal());
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
    let roomId = selectedRoomState;
    let meetingName = e.editMeetingName;
    let meetingDescription = e.editMeetingDescriptionField;
    let startDateTime = new Date(
      selectedMeetingDate + " " + e.editMeetingStartTimeSelect
    );
    let endDateTime = new Date(
      selectedMeetingDate + " " + e.editMeetingEndTimeSelect
    );
    let attendees = e.editMeetingAttendeesField;

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

    console.log(config.url);

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
  };

  const startTimeChangeHandler = (e) => {
    // get the selected date from the date picker and the start time, combine them into a new Date and set the state
    let startDateTime = selectedMeetingDate + " " + e.target.value;

    console.log(e.target.value);

    setStartTimeVal(e.target.value);
    dispatch(meetingActions.setSelectedStartTime(startDateTime));
    dispatch(meetingActions.setMeetingStartTime(startDateTime));
    dispatch(meetingActions.setEditingActive(false));
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
            value={titleVal}
            invalidText="Please enter a name for the meeting."
          />
          <TextArea
            id="editMeetingDescriptionField"
            name="editMeetingDescriptionField"
            label="Description"
            placeholder="Please describe what this meeting is about"
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
            label="Attendees"
            placeholder="Add a comma seperated list of emails"
            onChange={attendeesInputChangeHandler}
            value={attendeesVal}
            ref={ref}
          />
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
