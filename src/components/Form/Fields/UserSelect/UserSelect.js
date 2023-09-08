import React from "react";
import { useFormContext } from "react-hook-form"; // This is necessary for the parent form. Gives access to child value

const UserSelect = (props) => {
  const { register } = useFormContext(); // initialize useFormContext to give form submit function access to child value

  return (
    <div className="mb-3">
      <label htmlFor={props.id} className="form-label">
        {props.label}
      </label>
      <select
        id={props.id}
        name={props.id}
        className="form-select"
        aria-label={props.label}
        {...register(props.id)} // register this form by its id to the useFormContext
      >
        <option value="1" defaultValue>
          Jordan
        </option>
        <option value="2">Ethan</option>
        <option value="3">Shelby</option>
        <option value="4">Kado</option>
        <option value="5">Eric</option>
      </select>
    </div>
  );
};

export default UserSelect;
