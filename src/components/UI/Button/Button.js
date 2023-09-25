import React from "react";

import "./Button.scss";

const Button = (props) => {
  return (
    <button
      type={props.type}
      id={props.id}
      className={"btn " + props.classNames}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
