import React from "react";
import { useSelector, useDispatch } from "react-redux";
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

const AddMeetingModal = () => {
  // redux
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.showModal);
  const selectedRoomState = useSelector((state) => state.meetings.selectedRoom);
  const selectedStartTime = useSelector(
    (state) => state.meetings.selectedStartTime
  );
  const selectedMeetingDate = useSelector(
    (state) => state.meetings.selectedMeetingDate
  );

  const modalHideHandler = () => {
    dispatch(modalActions.hideModal());
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
    e.preventDefault();
    const formFields = e.target;

    //let loggedInUser = JSON.parse(localStorage.getItem("user"))["userId"];
    let roomId = selectedRoomState;
    let meetingName = formFields[0].value;
    let meetingDescription = formFields[1].value;
    let startDateTime = new Date(
      selectedMeetingDate + " " + formFields[2].value
    );
    let endDateTime = new Date(selectedMeetingDate + " " + formFields[3].value);
    let attendees = formFields[4].value;

    let data = JSON.stringify({
      //user: loggedInUser,
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

    axios
      .request(config)
      .then((res) => {
        console.log(JSON.stringify(res.data));

        // close the modal after meeting is added successfully
        modalHideHandler();
        // show and hide alert after 5 seconds
        alertShowHandler("success", "Meeting was added successfully.");
        alertHideTimeout(5000);
      })
      .catch((err) => {
        console.error(err);
        alertShowHandler("danger", "There was an error adding a meeting.");
        alertHideTimeout(5000);
      });
  };

  const onChangeHandler = (e) => {
    // get the selected date from the date picker and the start time, combine them into a new Date and set the state
    let startDateTime = selectedMeetingDate + " " + e.target.value;

    dispatch(meetingActions.setSelectedStartTime(startDateTime));
    dispatch(meetingActions.setMeetingStartTime(startDateTime));
  };

  return (
    <CustomModal
      heading="Add a Meeting"
      show={modalState}
      onHide={modalHideHandler}
    >
      <Form formId="addMeetingForm" onSubmit={handleFormSubmit}>
        <Input
          label="Meeting Name"
          id="newMeetingName"
          type="text"
          name="newMeetingName"
          placeholder="Meeting Name"
        />
        <TextArea
          id="meetingDescriptionField"
          label="Description"
          placeholder="Please describe what this meeting is about"
        />
        <TimeSelect
          id="meetingStartTimeSelect"
          label="Start Time"
          startEnd="start"
          onChange={onChangeHandler}
        />
        <TimeSelect
          id="meetingEndTimeSelect"
          label="End Time"
          startEnd="end"
          startTime={selectedStartTime}
        />
        <TextArea
          id="meetingAttendeesField"
          label="Attendees"
          placeholder="Add a comma seperated list of emails"
        />
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
    </CustomModal>
  );
};

export default AddMeetingModal;
