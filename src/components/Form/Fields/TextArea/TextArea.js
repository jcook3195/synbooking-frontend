import React from "react";
import { useFormContext } from "react-hook-form";

const TextArea = (props) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  // set the form field value
  setValue(props.name, props.value);

  // check if the name of the input is contained in the error object for displaying err class and message
  const err = Object.keys(errors).includes(props.name) ? true : false;
  const errClass = err ? " is-invalid" : "";

  return (
    <div className="form-group mb-3">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <textarea
        className={"form-control" + errClass}
        id={props.id}
        rows="3"
        placeholder={props.placeholder}
        name={props.name}
        onKeyDown={props.onKeyDown}
        {...register(props.name, {
          onChange: props.onChange,
        })}
      ></textarea>
      {err && <div className="invalid-feedback">{props.invalidText}</div>}
    </div>
  );
};

export default TextArea;
