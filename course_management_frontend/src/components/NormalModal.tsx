import React, { MouseEventHandler } from "react";
import { createPortal } from "react-dom";
import Backdrop from "./Backdrop";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FaTriangleExclamation } from "react-icons/fa6";
import { Button, Stack } from "@chakra-ui/react";

interface modalProps {
  isOpen: Boolean;
  handleClose: MouseEventHandler;
  data: Course[];
}

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
  width: 30%;
  height: 40%;
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
    width: 80%; // Change the width for mobile devices
    height: 35%; // Adjust the height for mobile devices
    border-radius: 0.7rem; // Remove border-radius for mobile devices if needed
    /* Add more mobile-specific styles as needed */
  }
`;

const DialogHeader = styled.div`
  width: 100%;
  height: 2rem;
  background-color: #000000;
  border-radius: 0.2rem 0.2rem 0 0;
  display: flex;
  justify-content: end;
`;

const NormalModal: React.FC<modalProps> = (props) => {
  const total = props.data.reduce((sum, item) => (sum += item.total), 0);
  const isValid = total >= 14 ? true : false;

  return createPortal(
    <Backdrop onClick={props.handleClose}>
      <Dialog
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={errorAppearance}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <DialogHeader></DialogHeader>
        <div
          className="container flex-grow-1 w-100"
          style={{ backgroundColor: "white", overflow: "hidden" }}
        >
          <div className="row align-items-center text-center">
            <FaTriangleExclamation
              style={{ fontSize: "3.5rem", color: "red" }}
            />
            <h3 style={{ fontWeight: "700", color: "red" }}>WARNING</h3>
            <p>Vui lòng đăng kí đủ 14 tín chỉ để tiếp tục</p>
            <p>
              <span style={{ fontWeight: "bold" }}>Số tín chỉ hiện tại:</span>{" "}
              {total}
            </p>
            <Stack width={"100%"} alignItems={"center"}>
              <Button
                width={"30%"}
                bgColor={"black"}
                _hover={{ bgColor: "black" }}
                color={"white"}
                noOfLines={1}
                transition="filter 0.3s"
                // as={motion.div}
                // whileHover={{ scale: 1.1 }}
                // whileTap={{ scale: 0.9 }}
                onClick={props.handleClose}
              >
                Back
              </Button>
            </Stack>
          </div>
        </div>
      </Dialog>
    </Backdrop>,
    document.getElementById("portal")!
  );
};

export default NormalModal;
