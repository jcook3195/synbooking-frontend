import React from "react";

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
