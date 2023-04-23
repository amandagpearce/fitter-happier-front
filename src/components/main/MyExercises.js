import React, { useState } from "react";

import Button from "../ui/Button";
import Video from "../ui/Video";
import Legend from "../ui/Legend";
import Modal from "../ui/Modal";
import Card from "../ui/Card";

import NewExerciseForm from "./NewExerciseForm";
import { changeExerciseTitle, deleteVideo } from "@component/lib/exercise";

const MyExercises = ({ exercises, onDataChange }) => {
  let userExercises;
  const [newExerciseModal, setNewExerciseModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editMode1, setEditMode1] = useState(false);
  const [editMode2, setEditMode2] = useState(false);
  const [editMode3, setEditMode3] = useState(false);
  const [deleteExercise, setDeleteExercise] = useState();

  const onNewExerciseHandler = () => {
    setNewExerciseModal(true);
  };

  const closeModalHandler = () => {
    setNewExerciseModal(false);
  };

  const showDeleteWarningHandler = (exerciseId) => {
    setDeleteExercise(exerciseId);
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setDeleteExercise(undefined);
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);

    console.log("DELETING exercise id", deleteExercise);
  };

  // Not good should redo
  const onEditHandler = (id) => {
    if (id === 1) {
      setEditMode1(true);
    } else if (id === 2) {
      setEditMode2(true);
    } else {
      setEditMode3(true);
    }
  };

  const onTitleChangeHandler = (id, newTitle) => {
    var data = {
      exercise_id: id,
      newTitle: newTitle,
    };

    const saveTitle = async (data) => {
      const response = await changeExerciseTitle(data);
      if (response.status === 200) {
        onDataChange();
      }
    };

    try {
      saveTitle(data);
    } catch (error) {
      console.log("error", error);
    }

    if (id === 1) {
      setEditMode1(false);
    } else if (id === 2) {
      setEditMode2(false);
    } else {
      setEditMode3(false);
    }
  };

  const onDeleteVideoHandler = (data) => {
    const delVideo = async (data) => {
      const response = await deleteVideo(data);
      console.log(response.status);
      if (response.status === 200) {
        onDataChange();
      }
    };

    try {
      delVideo(data);
    } catch (error) {
      console.log("error", error);
    }

    if (data.exercise_id === 1) {
      setEditMode1(false);
    } else if (data.exercise_id === 2) {
      setEditMode2(false);
    } else {
      setEditMode3(false);
    }
  };

  if (exercises) {
    userExercises = exercises.map((exercise) => {
      var editModeVar;
      // bad, should research and redo
      if (exercise.id === 1) {
        editModeVar = editMode1;
      } else if (exercise.id === 2) {
        editModeVar = editMode2;
      } else {
        editModeVar = editMode3;
      }

      return (
        <div className="exerciseContainer" key={exercise.id}>
          <Legend
            actions={true}
            onDelete={() => showDeleteWarningHandler(exercise.id)}
            onClick={() => onEditHandler(exercise.id)}
            onDataChange={(newTitle) =>
              onTitleChangeHandler(exercise.id, newTitle)
            }
            editMode={editModeVar}
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
                  <Video
                    id={video.id}
                    editMode={editModeVar}
                    yt_id={video.yt_id}
                    title={video.title}
                    exercise_Id={exercise.id}
                    onDataChange={(data) => onDeleteVideoHandler(data)}
                  />
                </div>
              );
            })}

            <div
              className="col-xs-1 col-md-2 col-lg-4 col-xl-3"
              style={{ display: "grid" }}
            >
              <Button title="addNewVideo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-plus-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
                <br />
                Adicionar vídeo
              </Button>
            </div>
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
              className="bi bi-x-lg"
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
        className="deleteExerciseModal"
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Tem certeza?"
        footerClass="deleteExercise__modal-actions"
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
        <Card className="deleteExercise">
          <p>
            Você realmente quer excluir todo o exercício? <br />
            Essa ação não pode ser desfeita.
          </p>
        </Card>
      </Modal>

      {exercises && userExercises}
      <Button onClick={onNewExerciseHandler} size={"large"} title={"add"}>
        Novo exercício
      </Button>
    </React.Fragment>
  );
};

export default MyExercises;
