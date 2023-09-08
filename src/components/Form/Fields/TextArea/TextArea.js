import React from "react";

const TextArea = (props) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <textarea
        className="form-control"
        id={props.id}
        rows="3"
        placeholder={props.placeholder}
      ></textarea>
    </div>
  );
};

export default TextArea;
