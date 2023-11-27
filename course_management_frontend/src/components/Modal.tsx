import { motion } from "framer-motion";
import Backdrop from "../components/Backdrop";
import { MouseEventHandler, SetStateAction, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Button, CloseButton, ModalCloseButton, Stack } from "@chakra-ui/react";
import TypeChart from "./Course/CourseComponents/TypeChart";
import { Type } from "../model/TypeAndTotal";
import CourseTable from "./Course/CourseComponents/CourseTable";
import ModalCourseTable from "./Course/CourseComponents/ModalCourseTable";
import { FaCheck } from "react-icons/fa6";
import { FaArrowAltCircleRight, FaTrash } from "react-icons/fa";

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
  width: 60%;
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

const Title = styled.div`
  padding: 1rem;
  width: 100%;
  align-items: center;
`;

interface modalProps {
  isOpen: Boolean;
  handleClose: MouseEventHandler;
  isSecondModalOpen: Boolean;
  handleSecondModal: MouseEventHandler;
  data: Course[];
}

const Modal: React.FC<modalProps> = (props) => {
  const mainType = ["CN", "CSN", "CSNN", "ĐC", "CNTC"];
  const [typeList, setTypeList] = useState<Type[]>([]);
  const [displayType, setDisplayType] = useState<Type[]>([
    { type: "others", total: 0 },
  ]);

  useEffect(() => {
    props.data.map((course) => {
      const existingType = typeList.some((item) => item.type === course.type);
      if (existingType) {
        typeList?.map((item) =>
          item.type === course.type
            ? { ...item, total: (item.total += course.total) }
            : item
        );
      } else {
        const temp: Type = new Type(course.type, course.total);
        typeList.push(temp);
      }
    });
  }, []);

  useEffect(() => {
    console.log("Type List" + JSON.stringify(typeList));
  }, [typeList]);
  useEffect(() => {
    console.log("Display Type: " + JSON.stringify(displayType));
  }, [displayType]);

  useEffect(() => {
    let updateList: Type[] = [];
    typeList.forEach((item) => {
      const isMainType = mainType.some((element) => item.type === element);
      if (isMainType) {
        updateList.push(item);
      } else {
        const updatedDisplay = displayType.map((element) =>
          element.type === "others"
            ? { ...element, total: (element.total += item.total) }
            : element
        );
        setDisplayType(updatedDisplay);
      }
    });
    setDisplayType([...displayType, ...updateList]);
  }, [typeList]);

  return createPortal(
    <Backdrop onClick={props.handleClose}>
      <Dialog
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
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
          className="container flex-grow-1 w-100"
          style={{ backgroundColor: "white", overflow: "hidden" }}
        >
          <div className="row">
            <Title>
              <p>
                Please review all your course and credits before moving to next
                step
              </p>
            </Title>
          </div>
          <div
            className="row"
            style={{ height: "35%", padding: "0 1rem 1rem 1rem" }}
          >
            <div
              className="col"
              style={{
                maxHeight: "100%",
                borderRadius: "10px", // Set border radius for the div
                padding: "1rem",
              }}
            >
              <ModalCourseTable data={props.data}></ModalCourseTable>
            </div>
          </div>
          <div
            className="row"
            style={{ height: "65%", padding: "0 1rem 1rem 1rem" }}
          >
            <div className="col" style={{ maxHeight: "80%" }}>
              <TypeChart listType={displayType} />
              <Stack
                direction="row"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  paddingTop: "1rem",
                }}
              >
                <Button
                  style={{ backgroundColor: "var(--button-color)" }}
                  color={"white"}
                  variant="solid"
                  onClick={props.handleClose}
                >
                  Back
                </Button>
                <Button
                  as={motion.div}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  leftIcon={<FaArrowAltCircleRight />}
                  colorScheme="green"
                  variant="solid"
                  onClick={props.handleSecondModal}
                >
                  Continue
                </Button>
              </Stack>
            </div>
          </div>
        </div>
      </Dialog>
    </Backdrop>,
    document.getElementById("portal")!
  );
};

export default Modal;
