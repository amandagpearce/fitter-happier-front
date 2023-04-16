import React from "react";
import classes from "./Select.module.css";

const Select = ({ options, label, id }) => {
  const selectOptions = options.map((option) => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  });

  return (
    <React.Fragment>
      <select
        id={id}
        className={`${classes.selectElement} form-select form-select-sm`}
        aria-label="Me exercitei hoje ou ontem?"
      >
        {selectOptions}
      </select>
      <label className={classes.selectLabel} for={id}>
        {label}
      </label>
    </React.Fragment>
  );
};

export default Select;
