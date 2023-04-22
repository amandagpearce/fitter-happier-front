import React, { useState } from "react";

import Button from "../ui/Button";
import Video from "../ui/Video";
import Legend from "../ui/Legend";
import Modal from "../ui/Modal";

import NewExerciseForm from "./NewExerciseForm";

const MyExercises = ({ exercises }) => {
  let userExercises;
  const [newExerciseModal, setNewExerciseModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const onNewExerciseHandler = () => {
    setNewExerciseModal(true);
  };

  const closeModalHandler = () => {
    setNewExerciseModal(false);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("DELETING");
  };

  if (exercises) {
    userExercises = exercises.map((exercise) => {
      return (
        <div className="exerciseContainer" key={exercise.id}>
          <Legend
            actions={true}
            onDelete={showDeleteWarningHandler}
            onClick={onNewExerciseHandler}
            background={true}
            description={exercise.name}
            title={exercise.type}
          />

          <div className="exerciseContent row">
            {exercise.videos.map((video, counter) => {
              return (
                <div
                  key={counter}
                  className="col-xs-1 col-md-2 col-lg-4 col-xl-3"
                >
                  <Video yt_id={video.yt_id} title={video.title} />
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  }

  return (
    <React.Fragment>
      <Modal
        show={newExerciseModal}
        onCancel={closeModalHandler}
        header="Adicionar novo exercício"
        contentClass="newExercise__modal-content"
        footerClass="newExercise__modal-actions"
        footer={
          <Button title="closeModal" onClick={closeModalHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </Button>
        }
      >
        <div className="newExercise col-12">
          <NewExerciseForm />
        </div>
      </Modal>

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Tem certeza?"
        footerClass="newExercise__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancelar
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Excluir
            </Button>
          </React.Fragment>
        }
      >
        <p>Você realmente quer excluir? Essa ação não pode ser desfeita.</p>
      </Modal>

      {exercises && userExercises}
      <Button onClick={onNewExerciseHandler} size={"large"} title={"add"}>
        Novo exercício
      </Button>
    </React.Fragment>
  );
};

export default MyExercises;
