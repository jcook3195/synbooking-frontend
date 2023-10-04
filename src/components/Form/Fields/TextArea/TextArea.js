import React from "react";
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";

const TextArea = (props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  // set the form field value
  setValue(props.name, props.value);

  const emailFieldErr = useSelector((state) => state.meetings.emailFieldErr);

  // check if the name of the input is contained in the error object for displaying err class and message
  // const err = Object.keys(errors).includes(props.name) ? true : false;
  const errClass =
    emailFieldErr && props.name === "meetingAttendeesField"
      ? " is-invalid"
      : "";

  return (
    <div className="form-group mb-3">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <textarea
        className={"form-control" + errClass}
        id={props.id}
        rows={props.rows}
        placeholder={props.placeholder}
        name={props.name}
        onKeyDown={props.onKeyDown}
        {...register(props.name, {
          onChange: props.onChange,
        })}
      ></textarea>
      {emailFieldErr && props.name === "meetingAttendeesField" ? (
        <div className="invalid-feedback">{props.invalidText}</div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default TextArea;
