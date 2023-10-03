import React, { forwardRef } from "react";
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

import "./AddMeetingModal.scss";

const AddMeetingModal = forwardRef((props, ref) => {
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

  const modalHideHandler = () => {
    dispatch(modalActions.hideAddModal());
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
    let meetingName = e.newMeetingName;
    let meetingDescription = e.meetingDescriptionField;
    let startDateTime = new Date(
      selectedMeetingDate + " " + e.meetingStartTimeSelect
    );
    let endDateTime = new Date(
      selectedMeetingDate + " " + e.meetingEndTimeSelect
    );
    let attendees = e.meetingAttendeesField;

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

    console.log(e.meetingEndTimeSelect);

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
      })
      .catch((err) => {
        console.error(err);
        alertShowHandler("danger", "There was an error adding a meeting.");
        alertHideTimeout(5000);
        dispatch(alertActions.showLoader(false));
      });
  };

  const startTimeChangeHandler = (e) => {
    // get the selected date from the date picker and the start time, combine them into a new Date and set the state
    let startDateTime = selectedMeetingDate + " " + e.target.value;

    dispatch(meetingActions.setSelectedStartTime(startDateTime));
    dispatch(meetingActions.setMeetingStartTime(startDateTime));
  };

  return (
    <CustomModal
      heading={"Add a meeting for room " + selectedRoomName}
      show={modalState}
      onHide={modalHideHandler}
    >
      <FormProvider {...methods}>
        <Form
          formId="addMeetingForm"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
        >
          <Input
            validations={{
              required: true,
            }}
            ref={ref}
            label="Meeting Name"
            id="newMeetingName"
            type="text"
            name="newMeetingName"
            placeholder="Meeting Name"
            invalidText="Please enter a name for the meeting."
          />
          <TextArea
            id="meetingDescriptionField"
            name="meetingDescriptionField"
            label="Description"
            placeholder="Please describe what this meeting is about"
            ref={ref}
          />
          <TimeSelect
            id="meetingStartTimeSelect"
            name="meetingStartTimeSelect"
            label="Start Time"
            startEnd="start"
            invocation="add"
            onChange={startTimeChangeHandler}
            ref={ref}
          />
          <TimeSelect
            id="meetingEndTimeSelect"
            name="meetingEndTimeSelect"
            label="End Time"
            startEnd="end"
            invocation="add"
            ref={ref}
          />
          <TextArea
            id="meetingAttendeesField"
            name="meetingAttendeesField"
            label="Attendees"
            placeholder="Add a comma seperated list of emails"
            invocation="add"
            ref={ref}
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
      </FormProvider>
    </CustomModal>
  );
});

export default AddMeetingModal;
