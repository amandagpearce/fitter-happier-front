import React, { useState } from "react";
import Select from "../ui/Select";
import Button from "../ui/Button";
import ExerciseCalendar from "../ui/Calendar";
import { logExercise } from "@component/lib/exercise";
import Modal from "../ui/Modal";
import NewExerciseForm from "./NewExerciseForm";

const ExercisesLogger = ({ exercises }) => {
  let [currentSelectVal, setCurrentSelectVal] = useState("Hoje");
  const [newExerciseModal, setNewExerciseModal] = useState(false);

  //   let DUMMY_PREV_EXERCISES = [
  //     {
  //       title: "A",
  //       start: new Date(2023, 3, 4), // year - month (starting at 0) - day
  //       end: new Date(2023, 3, 4),
  //       allDay: true,
  //     },
  //     {
  //       title: "B",
  //       start: new Date(2023, 3, 5), // year - month (starting at 0) - day
  //       end: new Date(2023, 3, 4),
  //       allDay: true,
  //     },
  //     {
  //       title: "C",
  //       start: new Date(2023, 3, 6), // year - month (starting at 0) - day
  //       end: new Date(2023, 3, 4),
  //       allDay: true,
  //     },
  //   ];

  const onNewExerciseHandler = () => {
    setNewExerciseModal(true);
  };
  const closeModalHandler = () => {
    setNewExerciseModal(false);
  };

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

      //   DUMMY_PREV_EXERCISES.push({ // TODO: - updating this wont't update calendar
      //     title: { type },
      //     start: new Date(year, month, day), // year - month (starting at 0) - day
      //     end: new Date(year, month, day),
      //     allDay: true,
      //   });
    } catch (error) {
      console.log("error", error);
    }
  };

  const onSelectChange = (value) => {
    console.log("select changed", value);
    setCurrentSelectVal(() => (currentSelectVal = value));
  };

  let content;

  if (exercises.length) {
    var logExerciseButtons = exercises.map((exercise) => {
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
        <div className="exercises-logger-content col-10 row">
          {logExerciseButtons}
        </div>
      </React.Fragment>
    );
  } else {
    content = (
      <React.Fragment>
        <Modal
          animation={false}
          show={newExerciseModal}
          onCancel={closeModalHandler}
          header="Novo exercício"
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<Button onClick={closeModalHandler}>Cancelar</Button>}
        >
          <div className="newExercise col-12">
            <NewExerciseForm />
          </div>
        </Modal>

        <Button onClick={onNewExerciseHandler} size={"large"} title={"add"}>
          Novo exercício
        </Button>
      </React.Fragment>
    );
  }

  return (
    <div className="row">
      {content}

      {/* <div className="col-xs-12 col-md-4">
        <ExerciseCalendar loggedExercises={DUMMY_PREV_EXERCISES} />
      </div> */}
    </div>
  );
};

export default ExercisesLogger;
