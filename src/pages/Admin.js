import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";

import Button from "../components/UI/Button/Button";

import { alertActions } from "../store/alertStore";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // check if someone is logged in, if so then redirect
    const loggedInUser = localStorage.getItem("user");

    // if someone is logged in on page load then go to room selection
    if (!loggedInUser) {
      navigate("/landing");
    }
  });

  const goToDashBtnClickHandler = () => {
    navigate("/");
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

  const delMeetingsBtnClickHandler = () => {
    dispatch(alertActions.showLoader(true));

    let config = {
      method: "delete",
      url: "http://localhost:8080/meetings",
    };

    axios
      .request(config)
      .then((res) => {
        console.log(JSON.stringify(res.data));

        // show and hide alert after 5 seconds
        alertShowHandler("success", "All meetings have been deleted.");
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

  return (
    <div className="d-flex justify-content-center m-5">
      <div className="button-col d-flex flex-column">
        <Button
          type="button"
          id="goToDashBtn"
          classNames="btn-primary m-2"
          onClick={goToDashBtnClickHandler}
        >
          Dashboard
        </Button>
        <Button
          type="button"
          id="delAllMeetingsBtn"
          classNames="btn-danger m-2"
          onClick={delMeetingsBtnClickHandler}
        >
          DELETE ALL MEETINGS
        </Button>
      </div>
    </div>
  );
};

export default Admin;
