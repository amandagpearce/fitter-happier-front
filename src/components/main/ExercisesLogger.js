import React from "react";
import Select from "../ui/Select";
import Button from "../ui/Button";
import Calendar from "react-calendar";

const ExercisesLogger = ({ exercises }) => {
  return (
    <div className="row">
      <div className="exercises-logger-content col-8 row">
        <div className="exercise-selector col-2 ">
          <Select
            options={["Ontem", "Hoje"]}
            label="Fiz o exercício:"
            id="exercise-logger"
          />
        </div>

        {exercises.map((exercise) => {
          return (
            <div className="col-sm-2 col-md-2 col-xl-2" key={exercise.id}>
              <Button title={exercise.type} size="large">
                {exercise.type}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="col-xs-12 col-md-4">
        <Calendar />
      </div>
    </div>
  );
};

export default ExercisesLogger;
