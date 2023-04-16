import React from "react";

import Button from "../ui/Button";
import Link from "next/link";
import Video from "../ui/Video";

const MyExercises = () => {
  const EXERCISES_DUMMY = [
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
      ],
    },
  ];

  let userExercises = EXERCISES_DUMMY.map((exercise) => {
    return (
      <div className="exerciseContainer" key={exercise.id}>
        <div className="exerciseHeader">
          <Button size="small" title={exercise.type}>
            {exercise.type}
          </Button>

          <div className="exerciseDetails">
            <h4>{exercise.name}</h4>
            <ul className="exerciseActions">
              <li>
                <Link href="#">EDITAR</Link>
              </li>
              <li>
                <Link href="#">EXCLUIR</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="exerciseContent">
          {exercise.videos.map((video) => {
            return (
              <div className="col-xs-1 col-md-2 col-lg-4">
                <Video yt_id={video.yt_id} title={video.title} />
              </div>
            );
          })}
        </div>
      </div>
    );
  });

  return userExercises;
};

export default MyExercises;
