import React from "react";
import { useSelector } from "react-redux";

import "./Loader.scss";

const Loader = () => {
  // redux
  const showLoaderState = useSelector((state) => state.alerts.showLoader);

  const getLoaderContent = () => {
    return (
      <div className="loader-container">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };

  return <>{showLoaderState ? getLoaderContent() : <></>}</>;
};

export default Loader;
