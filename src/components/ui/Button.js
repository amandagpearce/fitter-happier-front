import React from "react";
import classes from "./Button.module.css";

const Button = ({ title, size, children, onClick }) => {
  return (
    <button
      className={`btn btn-primary ${classes.button} ${classes[size]} ${classes[title]}`}
      data-toggle="button"
      aria-pressed="false"
      autoComplete="on"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
