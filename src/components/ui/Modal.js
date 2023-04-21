import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import classes from "./Modal.module.css";

const ModalOverlay = ({
  className,
  style,
  header,
  headerClass,
  onSubmit,
  contentClass,
  children,
  footer,
  footerClass,
}) => {
  console.log("header", header);
  const content = (
    <div className={`${classes.modal} ${classes[className]}`} style={style}>
      <header className={`${classes.modal__header} ${classes[headerClass]}`}>
        <h2>{header}</h2>
      </header>
      <form
        onSubmit={
          onSubmit ? onSubmit : (event) => event.preventDefault() // if the onSubmit function is provided is up to it to preventDefault, otherwise it is prevented here
        }
      >
        <div className={`${classes.modal__content} ${classes[contentClass]}`}>
          {children}
        </div>
        <footer className={`${classes.modal__footer} ${classes[footerClass]}`}>
          {footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-portal")
  );
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
