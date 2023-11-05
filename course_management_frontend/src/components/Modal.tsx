import { motion } from "framer-motion";
import Backdrop from "../components/Backdrop";
import { MouseEventHandler, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";
import styled from "styled-components";

const dropIn = {
  hidden: {
    x: "-100vw",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    x: "100vw",
    opacity: 0,
  },
};

const errorAppearance = {
  hidden: {
    scale: 0,
    opacity: 0,
  },
  visible: {
    scale: 1.1,
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 10,
      stiffness: 200,
    },
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
};

const Dialog = styled(motion.dialog)`
  width: 50%;
  height: 50%;

  background-color: white;
  margin: auto;
  padding: 0 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; // Ensure this is set to 'relative'
`;

interface modalProps {
  isOpen: Boolean;
  handleClose: MouseEventHandler;
}

const Modal: React.FC<modalProps> = (props) => {
  // useEffect(() => {
  //   // Add or remove the "overflow: hidden" style on the body element
  //   if (props.isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [props.isOpen]);
  return createPortal(
    <Backdrop onClick={props.handleClose}>
      <Dialog
        onClick={(e) => e.stopPropagation()}
        className="modal orange-gradient"
        variants={errorAppearance}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p>This Is The Modal</p>
        <button onClick={props.handleClose}>Close</button>
      </Dialog>
    </Backdrop>,
    document.getElementById("portal")!
  );
};

export default Modal;
