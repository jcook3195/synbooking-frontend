import React from "react";

import "./AvailabilityCircle.scss";

const AvailabilityCircle = (props) => {
  return <span class={"availability-circle " + props.availability}></span>;
};

export default AvailabilityCircle;
