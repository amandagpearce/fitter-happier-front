import React from "react";
import classes from "./Legend.module.css";
import Input from "./Input";
import { VALIDATOR_REQUIRE } from "../util/validators";
import { useForm } from "../../hooks/form-hook";
import Button from "./Button";

const Legend = ({
  title,
  description,
  background,
  actions,
  onDelete,
  onClick,
  editMode,
  onDataChange,
}) => {
  const [formState, inputHandler] = useForm(
    // formState and inputHandler are returned in the hook
    {
      newTitle: {
        value: title,
        isValid: true,
      },
    },
    false
  );

  const onSubmitTitle = (event) => {
    event.preventDefault();
    console.log(
      "formState.inputs.newTitle.isValid",
      formState.inputs.newTitle.isValid
    );
    if (formState.inputs.newTitle.isValid) {
      onDataChange(formState.inputs.newTitle.value);
    }
  };

  return (
    <div className={classes.legend}>
      <span className={classes[title]}>{title}</span>
      <div
        className={
          background ? classes.descriptionBackground : classes.description
        }
      >
        {editMode && (
          <form onSubmit={onSubmitTitle}>
            <Input
              id="newTitle"
              element="input"
              type="text"
              label=""
              className="legendInput"
              value={description}
              valid={true}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="O título não pode ser vazio."
              onInput={inputHandler}
            />
          </form>
        )}
        {!editMode && <p>{description}</p>}

        {actions && (
          <ul>
            <li>
              {!editMode && (
                <Button title="exerciseAction" onClick={onClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </Button>
              )}
              {editMode && (
                <Button
                  type="submit"
                  onClick={onSubmitTitle}
                  title="exerciseAction"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                </Button>
              )}
            </li>
            <li>
              <Button title="exerciseAction" onClick={onDelete}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                </svg>
              </Button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Legend;
