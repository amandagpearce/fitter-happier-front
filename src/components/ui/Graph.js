import React from "react";
import classes from "./Graph.module.css";

const Graph = () => {
  return (
    <React.Fragment>
      <figure
        className={`${classes.chart}`}
        style={{
          width: "410px",
          height: "410px",
        }}
      >
        <svg
          className={classes.chartSvg}
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={classes.circleBackground}
            r="195"
            cx="50%"
            cy="50%"
            strokeWidth="20"
            stroke="white"
            fill="none"
          ></circle>
          <circle
            className={classes.circleForeground}
            r="195"
            cx="50%"
            cy="50%"
            strokeWidth="20"
            stroke="#04c4eb"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="606 630"
          ></circle>
        </svg>
      </figure>

      <figure
        className={`${classes.chart} ${classes.secondChart}`}
        style={{
          width: "345px",
          height: "345px",
        }}
      >
        <svg
          className={classes.chartSvg}
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={classes.circleBackground}
            r="160"
            cx="50%"
            cy="50%"
            strokeWidth="20"
            stroke="white"
            fill="none"
          ></circle>
          <circle
            className={classes.circleForeground}
            r="160"
            cx="50%"
            cy="50%"
            strokeWidth="20"
            stroke="#62a5f9"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="506 530"
          ></circle>
        </svg>
      </figure>

      <figure
        className={`${classes.chart} ${classes.thirdChart}`}
        style={{
          width: "275px",
          height: "275px",
        }}
      >
        <svg
          className={classes.chartSvg}
          role="img"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className={classes.circleBackground}
            r="125"
            cx="50%"
            cy="50%"
            strokeWidth="20"
            stroke="white"
            fill="none"
          ></circle>
          <circle
            className={classes.circleForeground}
            r="125"
            cx="50%"
            cy="50%"
            strokeWidth="20"
            stroke="#dd7df5"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="415 530"
          ></circle>
        </svg>
      </figure>
    </React.Fragment>
  );
};

export default Graph;
