import classes from "./Card.module.css";

function Card({ className, children, title }) {
  return (
    <div className={`${classes.card} ${classes[className]}`}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
}

export default Card;
