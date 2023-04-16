import React from "react";
import Select from "../ui/Select";
import Graph from "../ui/Graph";

const MyGoals = () => {
  return (
    <React.Fragment>
      <div className="col-12">
        <div className="col-xs-12 col-lg-2">
          <Select
            id="exercise-goals"
            label="Minhas metas de exercício"
            options={["ÚLTIMO MÊS", "3 MESES", "6 MESES", "1 ANO"]}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12 col-md-4">
          <p>X% de metas atingidas</p>
          <p>x/x Treinos completos</p>
        </div>
        <div className="col-xs-9 col-md-6">
          <div
            className="graphs-wrapper"
            style={{
              width: "410px",
              height: "410px",
              position: "relative",
            }}
          >
            <Graph />
          </div>
        </div>
        <div className="col-xs-3 col-md-2"></div>
      </div>
    </React.Fragment>
  );
};

export default MyGoals;
