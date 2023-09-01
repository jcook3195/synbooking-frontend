import React from "react";

const Form = (props) => {
  return (
    <form
      action={props.formAction}
      id={props.formId}
      className={props.formClassNames}
      onSubmit={props.onSubmit}
    >
      {props.children}
    </form>
  );
};

export default Form;
