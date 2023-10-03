import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import CustomModal from "../CustomModal";
import Button from "../../Button/Button";

import { modalActions } from "../../../../store/modalStore";
import { alertActions } from "../../../../store/alertStore";

import "./DeleteMeetingModal.scss";

const DeleteMeetingModal = () => {
  // redux
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.modals.showDeleteModal);
  const selectedMeeting = useSelector(
    (state) => state.meetings.selectedMeeting
  );
  const selectedRoomName = useSelector(
    (state) => state.meetings.selectedRoomName
  );
  const selectedEditMeetingDate = useSelector(
    (state) => state.meetings.selectedEditMeetingDate
  );

  const modalHideHandler = () => {
    dispatch(modalActions.hideDeleteModal());
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

  const handleDeleteBtnClick = () => {
    // let loggedInUser = JSON.parse(localStorage.getItem("user"))["userId"];
    dispatch(alertActions.showLoader(true));

    // submit the new meeting
    let config = {
      method: "delete",
      url: "http://localhost:8080/meetings/" + selectedMeeting,
    };

    axios
      .request(config)
      .then((res) => {
        console.log(JSON.stringify(res.data));

        // close the modal after meeting is deleted successfully
        modalHideHandler();
        // show and hide alert after 5 seconds
        alertShowHandler("success", "Meeting was deleted successfully.");
        alertHideTimeout(5000);
        dispatch(alertActions.showLoader(false));
      })
      .catch((err) => {
        console.error(err);
        alertShowHandler("danger", "There was an error deleting the meeting.");
        alertHideTimeout(5000);
        dispatch(alertActions.showLoader(false));
      });
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
        "Delete " +
        editMeetingHrs +
        ":" +
        editMeetingMins +
        " meeting from room " +
        selectedRoomName
      }
      show={modalState}
      onHide={modalHideHandler}
    >
      <h4>Are you sure you want to delete this meeting?</h4>
      <Button
        type="button"
        id="deleteNewMeetingBtn"
        classNames="btn-danger form-btn-first"
        onClick={handleDeleteBtnClick}
      >
        Delete Meeting
      </Button>
      <Button
        type="button"
        id="cancelDeleteMeetingBtn"
        classNames="btn-secondary"
        onClick={modalHideHandler}
      >
        Cancel
      </Button>
    </CustomModal>
  );
};

export default DeleteMeetingModal;
