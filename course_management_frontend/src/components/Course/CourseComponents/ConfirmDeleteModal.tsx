import { AxiosInstance } from "axios";
import React, { MouseEventHandler, useContext, useState } from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrop";
import styled from "styled-components";
import { motion } from "framer-motion";
import AuthContext from "../../../auth/AuthProvider";
import { Button, Spinner, Stack } from "@chakra-ui/react";
import { FaTriangleExclamation } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { baseURL } from "../../../api/axios";

const DialogHeader = styled.div`
  width: 100%;
  height: 2rem;
  margin-bottom: 1rem;
  background-color: #ebcf94;
  border-radius: 0.2rem 0.2rem 0 0;
  display: flex;
  justify-content: end;
`;

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

interface modalProps {
  handleClose: MouseEventHandler;
  axiosPrivate: AxiosInstance;
  onReload: Function;
  selectedTerm: number;
}

const ConfirmDeleteModal: React.FC<modalProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const [requestCompleted, setRequestCompleted] = useState(false);

  const handleSave = async () => {
    try {
      // Set loading to true before making the API request
      setLoading(true);

      //Update the enrollment by term
      const response = await props.axiosPrivate({
        method: "delete",
        url: `${baseURL}/enroll`,
        params: {
          username: auth?.username,
          term: props.selectedTerm,
        },
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
        variants={errorAppearance}
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
            <div>
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
                variants={errorAppearance}
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
                    <p>Bạn đã xóa thành công học kì!</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div
                className="container flex-grow-1 w-100"
                style={{ backgroundColor: "white", padding: "1.5rem" }}
              >
                <div className="row align-items-center text-center">
                  <FaTriangleExclamation
                    style={{ fontSize: "3.5rem", color: "red" }}
                  />
                  <h3 style={{ fontWeight: "700", color: "red" }}>WARNING</h3>
                  <p style={{ color: "red" }}>
                    Bạn có muốn xóa học kì hiện tại ?
                  </p>

                  <Stack width={"100%"} alignItems={"center"}>
                    <Button
                      width={"30%"}
                      style={{ backgroundColor: "var(--button-color)" }}
                      color={"white"}
                      noOfLines={1}
                      transition="filter 0.3s"
                      onClick={handleSave}
                    >
                      Confirm
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
            )}
          </>
        )}
      </Dialog>
    </Backdrop>,
    document.getElementById("portal")!
  );
};

export default ConfirmDeleteModal;
