import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form"; // This library adds field validation and makes submitting forms easier
import { useDispatch } from "react-redux";

import Form from "../components/Form/Form";
import UserSelect from "../components/Form/Fields/UserSelect/UserSelect";
import Button from "../components/UI/Button/Button";

import { authActions } from "../store/authStore";

const Landing = () => {
  const methods = useForm(); // initialize useform methods
  const navigate = useNavigate();

  // redux
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(authActions.login());
  };

  const users = ["Jordan", "Ethan", "Shelby", "Kado"];

  const handleOnSubmit = (e) => {
    // get the value of the user selected in the drop down and use that value to get a matching user name from the array
    const userId = e.userSelect;
    const userName = users[e.userSelect - 1];

    // set local storage to persist login on page refresh
    localStorage.setItem("user", JSON.stringify({ userId, userName }));

    // redux login dispatch
    loginHandler();

    // go to room selection
    navigate("/");
  };

  useEffect(() => {
    // check if someone is logged in, if so then redirect
    const loggedInUser = localStorage.getItem("user");

    // if someone is logged in on page load then go to room selection
    if (loggedInUser) {
      navigate("/");
    }
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-6 m-auto">
          <FormProvider {...methods}>
            <Form
              action=""
              id="userSelectForm"
              classNames=""
              onSubmit={methods.handleSubmit(handleOnSubmit)} // the methods.handleSubmit() is from 'react-hook-form', does some magic in the background to make form submission cleaner. Pass it your own custom form submission function
            >
              <UserSelect id="userSelect" label="Users:" />
              <Button type="submit" id="submitLogin" classNames="btn-primary">
                Login
              </Button>
            </Form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default Landing;
