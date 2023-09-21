import React from "react";

const BookedMeeting = (props) => {
  return (
    <div className="upcoming-meeting">
      <p className="upcoming-meeting-desc">
        {props.user} | {props.startTime} - {props.endTime}
      </p>
    </div>
  );
};

export default BookedMeeting;
