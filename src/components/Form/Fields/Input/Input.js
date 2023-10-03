import React from "react";
import { useFormContext } from "react-hook-form";

const Input = (props) => {
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
    <div className="form-group mb-2">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        className={"form-control " + props.classNames + errClass}
        placeholder={props.placeholder}
        onChange={props.onChange}
        {...register(props.name, props.validations, {
          onChange: props.onChange,
        })}
      />
      {err && <div className="invalid-feedback">{props.invalidText}</div>}
    </div>
  );
};

export default Input;
