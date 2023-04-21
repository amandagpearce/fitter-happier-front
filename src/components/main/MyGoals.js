import React from "react";
import Select from "../ui/Select";
import Graph from "../ui/Graph";

const MyGoals = () => {
  var DUMMY_EXERCISES = [
    {
      type: "A",
      goal: 5,
      measuredBy: "month",
      achieved: 4,
    },
    {
      type: "B",
      goal: 10,
      measuredBy: "month",
      achieved: 2,
    },
    {
      type: "C",
      goal: 15,
      measuredBy: "month",
      achieved: 7,
    },
    {
      type: "C",
      goal: 15,
      measuredBy: "month",
      achieved: 7,
    },
  ];

  let totalGoals = 0;
  let achievedGoals = 0;

  DUMMY_EXERCISES.map((exercise) => {
    totalGoals = totalGoals + exercise.goal;
    achievedGoals = achievedGoals + exercise.achieved;
  });

  return (
    <React.Fragment>
      <div className="col-12">
        <Select
          id="exercise-goals"
          label="Minhas metas de exercício"
          options={["ÚLTIMO MÊS", "3 MESES"]}
        />
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-4">
          <p>X% de metas atingidas</p>
          <p>
            {achievedGoals}/{totalGoals} Treinos completos
          </p>
        </div>
        <div className="col-xs-9 col-md-6">
          <Graph exercises={DUMMY_EXERCISES} />
        </div>
        <div className="col-xs-3 col-md-2"></div>
      </div>
    </React.Fragment>
  );
};

export default MyGoals;
