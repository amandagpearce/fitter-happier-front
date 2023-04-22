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
      title: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const input = (
    <Input
      element="input"
      type="text"
      label="Video ID:"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Por favor insira um ID válido."
      onInput={inputHandler}
    />
  );

  const [fields, setFields] = useState([input]);

  let onFieldDuplicate = (e) => {
    e.preventDefault();
    setFields([...fields, input]);
  };

  const newExerciseSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  const onInputAddHandler = (event) => {
    setInputNumber((prevNumber) => prevNumber++);
    console.log("inputNumber", inputNumber);
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
              id="title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Por favor insira uma descrição válida"
              onInput={inputHandler}
            />
          </div>
        </div>

        <h4>Vídeos:</h4>
        <div className="row" style={{ maxHeight: "180px", overflowY: "auto" }}>
          <div className="col-10" style={{ paddingRight: "0" }}>
            {fields}
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
