import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import CustomModal from "../CustomModal";
import Form from "../../../Form/Form";
import Input from "../../../Form/Fields/Input/Input";
import Button from "../../Button/Button";
import MeetingTimePicker from "../../../MeetingTimePicker/MeetingTimePicker";
import TextArea from "../../../Form/Fields/TextArea/TextArea";

import { modalActions } from "../../../../store/modalStore";
import { alertActions } from "../../../../store/alertStore";

import "./AddMeetingModal.scss";

const AddMeetingModal = () => {
  // redux
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.showModal);

  const modalHideHandler = () => {
    dispatch(modalActions.hideModal());
  };

  const alertShowHandler = () => {
    dispatch(alertActions.showAlert());
  };

  const alertHideTimeout = () => {
    setTimeout(() => {
      dispatch(alertActions.hideAlert());
    }, 5000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formFields = e.target;

    let loggedInUser = JSON.parse(localStorage.getItem("user"))["userId"];
    let meetingName = formFields[0].value;
    let meetingDescription = formFields[1].value;
    let startDateTime = formFields[2].value;
    let endDateTime = formFields[11].value;
    let attendees = formFields[20].value;

    let data = JSON.stringify({
      user: loggedInUser,
      room: "A",
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
        // show and hide alert after 5 secons
        alertShowHandler();
        alertHideTimeout();
      })
      .catch((err) => {
        console.error(err);
      });
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
        <MeetingTimePicker />
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