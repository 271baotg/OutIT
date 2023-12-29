import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { motion, color } from "framer-motion";
import { FaCheckCircle, FaQuestionCircle } from "react-icons/fa";
import {
  FaBookmark,
  FaCircleQuestion,
  FaFloppyDisk,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { Button, Spinner, Stack } from "@chakra-ui/react";
import { AxiosInstance } from "axios";
import Backdrop from "../../Backdrop";
import AuthContext from "../../../auth/AuthProvider";
import { Target } from "../../../model/Target";

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
  width: 30%;
  height: 48%;
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
  margin-bottom: 1rem;
  background-color: #ebcf94;
  border-radius: 0.2rem 0.2rem 0 0;
  display: flex;
  justify-content: end;
`;

interface modalProps {
  isOpen: Boolean;
  handleClose: MouseEventHandler;
  axiosPrivate: AxiosInstance;
  updateTarget: Target[];
  onReload: Function;
}

const ConfirmModal: React.FC<modalProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const [requestCompleted, setRequestCompleted] = useState(false);

  const handleSave = async () => {
    try {
      // Set loading to true before making the API request
      setLoading(true);

      //Update the enrollment by term
      const response: Target[] = await props.axiosPrivate({
        method: "put",
        url: "/student/target",
        params: {
          username: auth?.username,
        },
        data: props.updateTarget,
      });
      console.log(response);
      setRequestCompleted(true);
      props.onReload();
    } catch (error) {
      console.log(error);
    } finally {
      // Set loading to false after the API request is completed (whether it succeeds or fails)
      setLoading(false);
    }
  };

  return createPortal(
    <Backdrop onClick={props.handleClose}>
      <Dialog
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={bubble}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <DialogHeader></DialogHeader>

        {loading ? (
          <div
            className="text-center"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {" "}
            <div>
              {" "}
              <Spinner
                size="xl"
                thickness="5px"
                speed="0.65s"
                emptyColor="black"
                color="orange"
              />
            </div>
            <p>Saving...</p>
          </div>
        ) : (
          <>
            {requestCompleted ? (
              <motion.div
                variants={bubble}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div
                  className="container w-100"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="row align-items-center text-center">
                    <FaCheckCircle
                      style={{ fontSize: "3.5rem", color: "green" }}
                    />
                    <h3 style={{ fontWeight: "700", color: "green" }}>
                      SUCCESS
                    </h3>
                    <p
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Chúc mừng!
                    </p>
                    <p>Mục tiêu môn học của bạn đã được cập nhật</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                variants={bubble}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div
                  className="container w-100"
                  style={{ backgroundColor: "white" }}
                >
                  <div className="row align-items-center text-center">
                    <FaQuestionCircle
                      style={{ fontSize: "3.5rem", color: "orange" }}
                    />
                    <h3 style={{ fontWeight: "700", color: "orange" }}>
                      CONFIRM
                    </h3>
                    <p
                      style={{ fontWeight: "bold", textTransform: "uppercase" }}
                    >
                      Xác nhận chỉnh sửa
                    </p>
                    <p>Bạn có muốn cập nhật mục tiêu tín chỉ</p>
                    <Stack width={"100%"} alignItems={"center"}>
                      <Button
                        width={"30%"}
                        style={{ backgroundColor: "var(--button-color)" }}
                        color={"white"}
                        noOfLines={1}
                        transition="filter 0.3s"
                        onClick={handleSave}
                      >
                        Save
                      </Button>
                      <Button
                        colorScheme="grey"
                        variant="link"
                        onClick={props.handleClose}
                      >
                        Back
                      </Button>
                    </Stack>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </Dialog>
    </Backdrop>,
    document.getElementById("portal")!
  );
};

export default ConfirmModal;
