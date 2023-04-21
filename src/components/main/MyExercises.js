import React, { useState } from "react";

import Button from "../ui/Button";
import Video from "../ui/Video";
import Legend from "../ui/Legend";
import Modal from "../ui/Modal";

import NewExerciseForm from "./NewExerciseForm";

const MyExercises = () => {
  const EXERCISES_DUMMY = [
    {
      id: 1,
      name: "item 1",
      tags: ["Patinação"],
      type: "A",
      videos: [
        {
          title: "Titulo do video aqui",
          yt_id: "J944DiH4wTg",
        },
        {
          title: "Titulo do video aqui",
          yt_id: "J944DiH4wTg",
        },
        {
          title: "Titulo do video aqui",
          yt_id: "J944DiH4wTg",
        },
        {
          title: "Titulo do video aqui",
          yt_id: "J944DiH4wTg",
        },
        {
          title: "Titulo do video aqui",
          yt_id: "J944DiH4wTg",
        },
      ],
    },
    {
      id: 2,
      name: "item 2",
      tags: ["Patinação"],
      type: "B",
      videos: [
        {
          title: "Titulo do video aqui",
          yt_id: "J944DiH4wTg",
        },
        {
          title: "Titulo do video aqui",
          yt_id: "J944DiH4wTg",
        },
        {
          title: "Titulo do video aqui",
          yt_id: "J944DiH4wTg",
        },
      ],
    },
    {
      id: 3,
      name: "item 3",
      tags: ["Patinação"],
      type: "C",
      videos: [
        {
          title: "Titulo do video aqui",
          yt_id: "J944DiH4wTg",
        },
        {
          title: "Titulo do video aqui",
          yt_id: "J944DiH4wTg",
        },
        {
          title: "Titulo do video aqui",
          yt_id: "J944DiH4wTg",
        },
      ],
    },
  ];

  const [NewExerciseModal, setNewExerciseModal] = useState(false);
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

  let userExercises = EXERCISES_DUMMY.map((exercise) => {
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

  return (
    <React.Fragment>
      <Modal
        show={NewExerciseModal}
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

      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Tem certeza?"
        footerClass="place-item__modal-actions"
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

      {userExercises}
      <Button onClick={onNewExerciseHandler} size={"large"} title={"add"}>
        Novo exercício
      </Button>
    </React.Fragment>
  );
};

export default MyExercises;
