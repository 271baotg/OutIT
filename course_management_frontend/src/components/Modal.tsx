import { motion } from "framer-motion";
import Backdrop from "../components/Backdrop";
import { MouseEventHandler, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { CloseButton, ModalCloseButton } from "@chakra-ui/react";
import TypeChart from "./Course/CourseComponents/TypeChart";

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
  width: 70%;
  height: 80%;
  background-color: white;
  padding: 0;
  margin: auto;
  border-radius: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; // Ensure this is set to 'relative'

  @media (max-width: 768px) {
    // Adjust the max-width as needed
    width: 90%; // Change the width for mobile devices
    height: 60%; // Adjust the height for mobile devices
    border-radius: 0.7rem; // Remove border-radius for mobile devices if needed
    /* Add more mobile-specific styles as needed */
  }
`;

const DialogHeader = styled.div`
  width: 100%;
  height: 2rem;
  background-color: black;
  border-radius: 0.2rem 0.2rem 0 0;
  display: flex;
  justify-content: end;
`;

const Title = styled.div`
  padding: 1rem;
  width: 100%;
  align-items: center;
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
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <DialogHeader>
          <CloseButton
            colorScheme="orange"
            onClick={props.handleClose}
            size="md"
          />
        </DialogHeader>
        <div
          className="container flex-grow-1 w-100"
          style={{ backgroundColor: "white" }}
        >
          <div className="row">
            <Title>
              <p>
                Please review all your course and credits before moving to next
                step
              </p>
            </Title>
          </div>
          <div className="row" style={{ height: "35%" }}>
            <div className="col" style={{ backgroundColor: "#ddd" }}></div>
          </div>
          <div className="row" style={{ height: "50%" }}>
            <div className="col" style={{ padding: "1rem" }}>
              <TypeChart />
            </div>
          </div>
        </div>
      </Dialog>
    </Backdrop>,
    document.getElementById("portal")!
  );
};

export default Modal;
