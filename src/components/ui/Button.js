import React from "react";
import classes from "./Button.module.css";

const Button = ({ title, size }) => {
  console.log("aaaa", size);
  return (
    <button
      className={`btn btn-primary ${classes.button} ${classes[size]} ${classes[title]}`}
      data-toggle="button"
      aria-pressed="false"
      autoComplete="on"
      onClick={console.log("clicou")}
    >
      {title}
    </button>
  );
};

export default Button;
