import classes from "./Card.module.css";

function Card(props) {
  console.log(props.className);
  return (
    <div className={`${classes.card} ${classes[props.className]}`}>
      {props.children}
    </div>
  );
}

export default Card;
