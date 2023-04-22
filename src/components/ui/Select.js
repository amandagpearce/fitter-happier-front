import React from "react";
import classes from "./Select.module.css";

const Select = ({ options, label, id, onChange, name }) => {
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
        name={name}
        className={`${classes.selectElement} form-select form-select-sm`}
        aria-label="Me exercitei hoje ou ontem?"
        onChange={(event) => onChange(event.target.value)}
      >
        {selectOptions}
      </select>
      {label && (
        <label className={classes.selectLabel} htmlFor={id}>
          {label}
        </label>
      )}
    </React.Fragment>
  );
};

export default Select;
