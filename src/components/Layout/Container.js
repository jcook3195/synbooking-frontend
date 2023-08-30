import React from "react";

const Container = (props) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Container;
