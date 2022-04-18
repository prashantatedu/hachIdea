import React, { useRef } from "react";
import "./Modal.css";
import ReactDOM from "react-dom";

const Modal = ({ closeModal, children }) => {
  let ref = useRef(null);

  const handleClose = (e) => {
    console.log("modal click", e.target);
    console.log("ref", ref.current);
    if (ref.current.contains(e.target)) {
      //skip closing
      console.log("skip closing");
    } else {
      console.log(" close modal");
      closeModal();
    }
  };

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal" onClick={handleClose}></div>
      <div className="main-content" ref={ref}>
        {children}
      </div>
    </div>,
    document.getElementById("modals")
  );
};

export default Modal;
