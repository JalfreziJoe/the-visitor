import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";

import "./Modal.css";

const ModalOverlay = props => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={props.submit ? props.submit : event => event.preventDefault()}
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footerContent}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = props => {
  //const noref = React.useRef(null);
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.cancel} />}
      <CSSTransition
        nodeRef={React.useRef(null)}
        in={props.show}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
