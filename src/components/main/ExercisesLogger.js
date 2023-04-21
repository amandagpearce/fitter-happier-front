import React, { useState } from "react";
import Select from "../ui/Select";
import Button from "../ui/Button";
import ExerciseCalendar from "../ui/Calendar";

const ExercisesLogger = ({ exercises }) => {
  let [currentSelectVal, setCurrentSelectVal] = useState("Hoje");

  const onExerciseLogging = (type) => {
    console.log("clicou", type);
  };

  const onSelectChange = (value) => {
    console.log("select changed", value);
  };

  return (
    <div className="row">
      <div className="exercises-logger-content col-8 row">
        <div className="exercise-selector col-2 ">
          <Select
            options={["Hoje", "Ontem"]}
            label="Fiz o exercício:"
            id="exercise-logger"
            onChange={onSelectChange}
          />
        </div>

        {exercises.map((exercise) => {
          return (
            <div className="col-sm-2 col-md-2 col-xl-2" key={exercise.id}>
              <Button
                onClick={() => onExerciseLogging(exercise.type)}
                title={exercise.type}
                size="large"
              >
                {exercise.type}
              </Button>
            </div>
          );
        })}
      </div>

      <div className="col-xs-12 col-md-4">
        <ExerciseCalendar />
      </div>
    </div>
  );
};

export default ExercisesLogger;
