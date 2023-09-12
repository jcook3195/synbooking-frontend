import React from "react";
import Alert from "react-bootstrap/Alert";

import "./CustomAlert.scss";

const CustomAlert = (props) => {
  return (
    <>
      <Alert variant={props.type} dismissible>
        {props.children}
      </Alert>
    </>
  );
};

export default CustomAlert;
