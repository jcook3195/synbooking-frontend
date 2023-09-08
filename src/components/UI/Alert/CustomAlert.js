import React from "react";
import Alert from "react-bootstrap/Alert";

const CustomAlert = (props) => {
  return (
    <>
      <Alert variant={props.type}>{props.children}</Alert>
    </>
  );
};

export default CustomAlert;
