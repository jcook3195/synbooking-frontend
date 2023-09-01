import React from "react";

import "./AvailabilityCircle.scss";

const AvailabilityCircle = (props) => {
  return <span className={"availability-circle " + props.availability}></span>;
};

export default AvailabilityCircle;
