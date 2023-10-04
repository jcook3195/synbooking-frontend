import React from "react";
import { useSelector } from "react-redux";
import { useFormContext } from "react-hook-form";

const Input = (props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  // set the form field value
  setValue(props.name, props.value);

  const titleFieldErr = useSelector((state) => state.meetings.titleFieldErr);

  // check if the name of the input is contained in the error object for displaying err class and message
  // const err = Object.keys(errors).includes(props.name) ? true : false;
  const errClass = titleFieldErr ? " is-invalid" : "";

  return (
    <div className="form-group mb-2">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        className={"form-control " + props.classNames + errClass}
        placeholder={props.placeholder}
        onChange={props.onChange}
        {...register(props.name, {
          onChange: props.onChange,
        })}
      />
      {titleFieldErr && (
        <div className="invalid-feedback">{props.invalidText}</div>
      )}
    </div>
  );
};

export default Input;
