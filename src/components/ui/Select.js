import React from "react";
import classes from "./Select.module.css";

const Select = ({ options }) => {
  const selectOptions = options.map((option) => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  });

  return (
    <select
      className={`${classes.selectElement} form-select form-select-sm`}
      aria-label="Me exercitei hoje ou ontem?"
    >
      {selectOptions}
    </select>
  );
};

export default Select;
