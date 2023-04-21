import React, { useState } from "react";
import Select from "../ui/Select";
import Button from "../ui/Button";
import ExerciseCalendar from "../ui/Calendar";
import { logExercise } from "@component/lib/exercise";

const ExercisesLogger = ({ exercises }) => {
  let [currentSelectVal, setCurrentSelectVal] = useState("Hoje");

  let DUMMY_PREV_EXERCISES = [
    {
      title: "A",
      start: new Date(2023, 3, 4), // year - month (starting at 0) - day
      end: new Date(2023, 3, 4),
      allDay: true,
    },
    {
      title: "B",
      start: new Date(2023, 3, 5), // year - month (starting at 0) - day
      end: new Date(2023, 3, 4),
      allDay: true,
    },
    {
      title: "C",
      start: new Date(2023, 3, 6), // year - month (starting at 0) - day
      end: new Date(2023, 3, 4),
      allDay: true,
    },
  ];

  const onExerciseLogging = (type, id) => {
    console.log("clicou", type);
    let date, day, month, year, dateLog;
    date = new Date();
    month = date.getMonth();
    year = date.getFullYear();
    day = date.getDate();

    if (currentSelectVal === "Ontem") {
      date.setDate(date.getDate() - 1);
      day = date.getDate();
    }

    dateLog = `${year}-${month}-${day}`;
    console.log("datelog", dateLog);

    const saveLog = async (data) => await logExercise(data);

    try {
      saveLog({
        date: dateLog,
        exercise_id: id,
      });

      DUMMY_PREV_EXERCISES.push({
        title: { type },
        start: new Date(year, month, day), // year - month (starting at 0) - day
        end: new Date(year, month, day),
        allDay: true,
      });

      console.log("DUMM", DUMMY_PREV_EXERCISES);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSelectChange = (value) => {
    console.log("select changed", value);
    setCurrentSelectVal(() => (currentSelectVal = value));
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
                id={exercise.id}
                onClick={() => onExerciseLogging(exercise.type, exercise.id)}
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
        <ExerciseCalendar loggedExercises={DUMMY_PREV_EXERCISES} />
      </div>
    </div>
  );
};

export default ExercisesLogger;
