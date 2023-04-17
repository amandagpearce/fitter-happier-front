import React from "react";
import Select from "../ui/Select";
import Button from "../ui/Button";

const ExercisesLogger = ({ exercises }) => {
  return (
    <div className={`exercises-logger-content row`}>
      <div className="exercise-selector col-2">
        <Select
          options={["Ontem", "Hoje"]}
          label="Fiz o exercício:"
          id="exercise-logger"
        />
      </div>

      {exercises.map((exercise) => {
        return (
          <div className="col-sm-2 col-md-2 col-xl-1" key={exercise.id}>
            <Button title={exercise.type} size="large">
              {exercise.type}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default ExercisesLogger;
