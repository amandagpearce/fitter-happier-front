import React, { useState } from "react";
import { VALIDATOR_REQUIRE } from "../util/validators";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useForm } from "../../hooks/form-hook";
import Select from "../ui/Select";
import Card from "../ui/Card";

const NewExerciseForm = () => {
  const [formState, inputHandler] = useForm(
    // formState and inputHandler are returned in the hook
    {
      exerciseTitle: {
        value: "",
        isValid: false,
      },
      1: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const [fields, setFields] = useState([
    <div className="col-6">
      <Input
        element="input"
        type="text"
        label="Video ID:"
        identifier={1}
        key={1}
        id={1}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Por favor insira um ID válido."
        onInput={inputHandler}
      />
    </div>,
    <div className="col-6">
      <Input
        element="input"
        type="text"
        label="Title:"
        key={2}
        id={2}
        identifier={2}
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Por favor insira um ID válido."
        onInput={inputHandler}
      />
    </div>,
  ]);

  let onFieldDuplicate = (e) => {
    e.preventDefault();
    setFields([
      ...fields,
      <div className="col-6">
        <Input
          element="input"
          type="text"
          label="Video ID:"
          key={fields.length + 1}
          id={fields.length + 1}
          identifier={fields.length + 1}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor insira um ID válido."
          onInput={inputHandler}
        />
      </div>,
      <div className="col-6">
        <Input
          element="input"
          type="text"
          label="Title:"
          key={fields.length + 2}
          id={fields.length + 2}
          identifier={fields.length + 2}
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Por favor insira um título válido."
          onInput={inputHandler}
        />
      </div>,
    ]);
  };

  const newExerciseSubmitHandler = (event) => {
    event.preventDefault();
    console.log("formState", formState);
  };

  return (
    <React.Fragment>
      <Card className="newExerciseModal">
        <div className="row">
          <div className="col-2">
            <Select
              name="Selecione o exercício"
              id="newExercise"
              options={["A", "B", "C"]}
            />
          </div>
          <div className="col-10">
            <Input
              element="input"
              type="text"
              label="Título:"
              placeholder=""
              id="exerciseTitle"
              identifier="newExerciseTitle"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Por favor insira uma descrição válida"
              onInput={inputHandler}
            />
          </div>
        </div>

        <h4>Vídeos:</h4>
        <div className="row" style={{ maxHeight: "180px", overflowY: "auto" }}>
          <div className="col-10" style={{ paddingRight: "0" }}>
            <div className="row">{fields}</div>
          </div>

          <div className="col-2 row">
            <Button onClick={onFieldDuplicate} title="addVideo">
              +
            </Button>
          </div>
        </div>

        <Button
          disabled={!formState.isValid}
          onClick={newExerciseSubmitHandler}
          size={"large"}
          title={"modalAdd"}
        >
          Adicionar exercício
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default NewExerciseForm;
