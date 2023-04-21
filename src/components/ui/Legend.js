import Link from "next/link";
import React from "react";
import classes from "./Legend.module.css";

const Legend = ({
  title,
  description,
  background,
  actions,
  onDelete,
  onClick,
}) => {
  return (
    <div className={classes.legend}>
      <span className={classes[title]}>{title}</span>
      <div
        className={
          background ? classes.descriptionBackground : classes.description
        }
      >
        <p>{description}</p>
        {actions && (
          <ul>
            <li>
              <Link href="#" onClick={onClick}>
                Editar
              </Link>
            </li>
            <li>
              <Link href="#" onClick={onDelete}>
                Excluir
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Legend;
