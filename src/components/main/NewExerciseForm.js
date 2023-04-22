import React from "react";
import { VALIDATOR_REQUIRE } from "../util/validators";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useForm } from "../../hooks/form-hook";
import Select from "../ui/Select";

const NewExerciseForm = () => {
  const newExerciseSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

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
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2">
          <Select
            id="newExercise"
            label="Selecione o tipo:"
            options={["A", "B", "C"]}
          />
        </div>
        <div className="col-10">
          <Input
            element="input"
            type="text"
            label="Breve título para o seu exercício:"
            id="title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Por favor insira uma descrição válida"
            onInput={inputHandler}
          />
        </div>
      </div>

      <h4>Vídeos:</h4>
      <div className="row">
        <div className="col-10">
          <Input
            element="input"
            type="text"
            label="Youtube ID:"
            validators={[VALIDATOR_REQUIRE()]}
            id="yt_id"
            onInput={inputHandler}
          />
        </div>
        <div className="col-2">
          <Button>+</Button>
        </div>
      </div>

      <Button
        id="newExerciseForm"
        onClick={newExerciseSubmitHandler}
        disabled={!formState.isValid}
      >
        Adicionar exercício
      </Button>
    </React.Fragment>
  );
};

export default NewExerciseForm;
