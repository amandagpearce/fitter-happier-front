import React from "react";

import Button from "../ui/Button";
import Link from "next/link";
import Video from "../ui/Video";
import Legend from "../ui/Legend";

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
        <Legend
          actions={true}
          background={true}
          description={exercise.name}
          title={exercise.type}
        />

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
