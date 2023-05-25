import React, { useState } from "react";
import Select from "../ui/Select";
import Button from "../ui/Button";
import { logExercise } from "@component/lib/exercise";
import StatusMessage from "../ui/StatusMessage";
import ExerciseCalendar from "../ui/Calendar";

const ExercisesLogger = ({ exercises }) => {
  let [currentSelectVal, setCurrentSelectVal] = useState("Hoje");
  const [showRequestMessage, setShowRequestMessage] = useState({
    show: false,
    message: undefined,
    type: undefined,
  });

  const onExerciseLogging = async (type, id) => {
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

    const saveLog = async (data) => {
      const response = await logExercise(data);

      if (!response) {
        setShowRequestMessage({
          show: true,
          message: "Erro ao cadastrar treino :(",
          type: "error",
        });

        setTimeout(() => {
          setShowRequestMessage({
            show: false,
            message: undefined,
            type: undefined,
          });
        }, 1800);
      } else {
        setShowRequestMessage({
          show: true,
          message: "Salvo com sucesso!",
          type: "success",
        });

        setTimeout(() => {
          setShowRequestMessage({
            show: false,
            message: undefined,
            type: undefined,
          });
        }, 1800);
      }
    };

    try {
      saveLog({
        date: dateLog,
        exercise_id: id,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSelectChange = (value) => {
    setCurrentSelectVal(() => (currentSelectVal = value));
  };

  let content;

  if (exercises.length) {
    var logExerciseButtons = exercises.map((exercise) => {
      return (
        <div className="col-3" key={exercise.id}>
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
    });

    content = (
      <React.Fragment>
        <div className="exercise-selector col-2 ">
          <Select
            options={["Hoje", "Ontem"]}
            label="Fiz o exercício:"
            id="exercise-logger"
            onChange={onSelectChange}
          />
        </div>
        <div className="exercises-logger-content col-6 row">
          {logExerciseButtons}
          {showRequestMessage.show && (
            <StatusMessage
              type={showRequestMessage.type}
              className="requestMessage"
            >
              {showRequestMessage.message}
            </StatusMessage>
          )}
        </div>

        <div className="exercises-calendar col-4 row ms-auto g-0">
          <ExerciseCalendar />
        </div>
      </React.Fragment>
    );
  }

  return <div className="row">{content}</div>;
};

export default ExercisesLogger;
