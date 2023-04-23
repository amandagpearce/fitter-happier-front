import React from "react";
import classes from "./StatusMessage.module.css";

const StatusMessage = ({ className, children, type }) => {
  return (
    <div className={`${classes[className]} ${classes[type]}`}>
      <p>{children}</p>
    </div>
  );
};

export default StatusMessage;
