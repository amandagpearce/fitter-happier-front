import Link from "next/link";
import React from "react";
import classes from "./Legend.module.css";

const Legend = ({ title, description, background, actions }) => {
  return (
    <div>
      <span className={classes[title]}>{title}</span>
      <div>
        <p
          className={
            background ? classes.descriptionBackground : classes.description
          }
        >
          {description}
        </p>
        {actions && (
          <ul>
            <li>
              <Link href="#">Editar</Link>
            </li>
            <li>
              <Link href="#">Excluir</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Legend;
