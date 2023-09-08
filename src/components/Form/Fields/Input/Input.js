import React from "react";

const Input = (props) => {
  return (
    <div className="form-group mb-2">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        className={"form-control " + props.classNames}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
