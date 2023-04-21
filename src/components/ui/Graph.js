import React from "react";
import classes from "./Graph.module.css";

const Graph = ({ exercises }) => {
  let circles = [];
  let initialRadius = 195;
  let currentRadius = 0;

  exercises.map((circle, index) => {
    if (index === 0) {
      var radius = initialRadius;
      currentRadius = initialRadius;
    } else {
      var radius = currentRadius - 40;
      currentRadius = radius;
    }

    var circleLength = Math.ceil(2 * Math.PI * radius);
    var percentage = Math.ceil((circle.achieved * 100) / circle.goal);
    var strokeDashArray = Math.ceil((percentage * circleLength) / 100);

    circles.push({
      radius,
      circleLength,
      percentage,
      strokeDashArray,
      type: circle.type,
    });
  });

  return (
    <div className={classes.graphsWrapper}>
      {circles.map((circle, index) => {
        return (
          <figure
            key={index}
            className={`${classes.chart}`}
            style={{
              width: circle.radius * 2 + 20,
              height: circle.radius * 2 + 20,
            }}
          >
            <svg
              className={classes.chartSvg}
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className={classes.circleBackground}
                r={circle.radius}
                cx="50%"
                cy="50%"
                strokeWidth="20"
                stroke="white"
                fill="none"
              ></circle>
              <circle
                className={`${classes.circleForeground} ${
                  classes[circle.type]
                }`}
                r={circle.radius}
                cx="50%"
                cy="50%"
                strokeWidth="20"
                stroke="#04c4eb"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${circle.strokeDashArray} ${circle.circleLength}`}
              ></circle>
            </svg>
            <figcaption className={classes.circleFigcaption}>
              {circle.percentage}
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
};

export default Graph;
