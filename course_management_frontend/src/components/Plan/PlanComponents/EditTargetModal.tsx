import React, { MouseEventHandler } from "react";
import Backdrop from "../../Backdrop";
import { Target } from "../../../model/Target";
import styled from "styled-components";
import { motion } from "framer-motion";
import { CloseButton } from "@chakra-ui/react";
import { getTitle } from "../../../hooks/getTypeColor";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

interface componentProps {
  isOpen: boolean;
  handleClose: MouseEventHandler;
  listTarget: Target[];
}

const bubble = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      damping: 15,
      stiffness: 80,
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
};

const Dialog = styled(motion.dialog)`
  width: 60%;
  height: 70%;
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
    height: 85%; // Adjust the height for mobile devices
    border-radius: 0.7rem; // Remove border-radius for mobile devices if needed
    /* Add more mobile-specific styles as needed */
  }
`;

const DialogHeader = styled.div`
  width: 100%;
  height: 2rem;
  background-color: #ebcf94;
  border-radius: 0.2rem 0.2rem 0 0;
  display: flex;
  justify-content: end;
`;

const EditTargetModal: React.FC<componentProps> = (props) => {
  return (
    <Backdrop onClick={props.handleClose}>
      <Dialog
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={bubble}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
      >
        <DialogHeader>
          <CloseButton
            colorScheme="orange"
            onClick={props.handleClose}
            size="md"
          />
        </DialogHeader>
        <div
          className="container w-100 flex-grow-1"
          style={{
            backgroundColor: "white",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <p>Thay đổi các mục tiêu về tín chỉ của bạn:</p>
          </div>
          <div className="row h-100">
            <div
              className="col-md-6"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  padding: "0.5rem",
                  backgroundColor: "white",
                  position: "relative",
                  height: "80%",
                  boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
                  borderRadius: "0.7rem",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    maxHeight: "80%",
                    overflow: "auto",
                  }}
                >
                  <div
                    className="row p-0 gx-0"
                    style={{
                      height: "10%",
                      borderBottom: "1px rgba(217, 217, 217, 0.3) solid",
                    }}
                  >
                    <div
                      className="col-md-8 text-center"
                      style={{ fontWeight: "700" }}
                    >
                      Loại tín chỉ
                    </div>
                    <div
                      className="col-md-4 text-center"
                      style={{ fontWeight: "700" }}
                    >
                      Số lượng
                    </div>
                  </div>
                  {props.listTarget.map((target) => (
                    <div
                      className="row gx-0"
                      style={{
                        borderBottom: "1px rgba(217, 217, 217, 0.3) solid",
                      }}
                    >
                      <div
                        className="col-md-8 p-1"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {getTitle(target.type)}
                      </div>
                      <div
                        className="col-md-4 text-md-center p-1"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {target.goal}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "10%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    fontSize: "0.8rem",
                    textAlign: "center",
                  }}
                >
                  Bảng mục tiêu hiện tại của bạn
                </div>
              </div>
            </div>
            <div
              className="col-md-6"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  padding: "0.5rem",
                  backgroundColor: "white",
                  position: "relative",
                  height: "80%",
                  boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
                  borderRadius: "0.7rem",
                }}
              ></div>
            </div>
          </div>
        </div>
      </Dialog>
    </Backdrop>
  );
};

export default EditTargetModal;
