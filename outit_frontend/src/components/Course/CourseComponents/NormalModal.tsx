import React, {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Backdrop from "../../Backdrop";
import styled from "styled-components";
import { motion, color } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import {
  FaBookmark,
  FaCircleQuestion,
  FaFloppyDisk,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { Button, Spinner, Stack } from "@chakra-ui/react";
import { useAxiosPrivate } from "../../../hooks/useAxiosHook";
import { Enrollment } from "../../../model/Enrollment";
import AuthContext from "../../../auth/AuthProvider";
import { AxiosInstance } from "axios";
import { baseURL } from "../../../api/axios";

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
  data: Course[];
  listTerm: Term[];
  axiosPrivate: AxiosInstance;
  onReload: Function;
  selectedTerm: number;
}

const NormalModal: React.FC<modalProps> = (props) => {
  const total = props.data.reduce((sum, item) => (sum += item.total), 0);

  const availableTerm = () => {
    if (props.selectedTerm === 0) {
      const sortedList = props.listTerm.sort((a, b) => a.term - b.term);
      for (let index = 0; index < sortedList.length; index++) {
        let expectedTerm = index + 1;
        if (sortedList[index].term !== expectedTerm) {
          // Missing term found
          return expectedTerm;
        }
      }
      return sortedList.length + 1;
    }
    return props.selectedTerm;
  };

  const isValid = total >= 14 && availableTerm() <= 8 ? true : false;

  const listEnroll: Enrollment[] = props.data.map(
    (course) =>
      new Enrollment(
        course.code,
        course.name,
        course.type,
        availableTerm(),
        course.total
      )
  );
  const [loading, setLoading] = useState(false);
  const { auth } = useContext(AuthContext);
  const [requestCompleted, setRequestCompleted] = useState(false);

  const handleSave = async () => {
    try {
      // Set loading to true before making the API request
      setLoading(true);

      //Update the enrollment by term
      const response: Enrollment[] = await props.axiosPrivate({
        method: "put",
        url: `${baseURL}/enroll`,
        params: {
          username: auth?.username,
          term: availableTerm(),
        },
        data: listEnroll,
      });

      setRequestCompleted(true);
      props.onReload();
    } catch (error) {
    } finally {
      // Set loading to false after the API request is completed (whether it succeeds or fails)
      setLoading(false);
    }
  };

  useEffect(() => {}, []);

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
                    <p>Danh sách môn học của bạn đã cập nhật thành công.</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <>
                {!isValid && availableTerm() <= 8 && (
                  <div
                    className="container flex-grow-1 w-100"
                    style={{ backgroundColor: "white", padding: "1.5rem" }}
                  >
                    <div className="row align-items-center text-center">
                      <FaTriangleExclamation
                        style={{ fontSize: "3.5rem", color: "red" }}
                      />
                      <h3 style={{ fontWeight: "700", color: "red" }}>
                        WARNING
                      </h3>
                      <p>Vui lòng đăng kí đủ 14 tín chỉ để tiếp tục</p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Số tín chỉ hiện tại:
                        </span>{" "}
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
                          onClick={props.handleClose}
                        >
                          Back
                        </Button>
                      </Stack>
                    </div>
                  </div>
                )}
                {!isValid && availableTerm() > 8 && (
                  <div
                    className="container flex-grow-1 w-100"
                    style={{ backgroundColor: "white", padding: "1.5rem" }}
                  >
                    <div className="row align-items-center text-center">
                      <FaTriangleExclamation
                        style={{ fontSize: "3.5rem", color: "red" }}
                      />
                      <h3 style={{ fontWeight: "700", color: "red" }}>
                        WARNING
                      </h3>
                      <p style={{ color: "red" }}>
                        Bạn đã đạt giới hạn 8 học kì vui lòng cập nhật các học
                        kì đã học
                      </p>

                      <Stack width={"100%"} alignItems={"center"}>
                        <Button
                          width={"30%"}
                          bgColor={"black"}
                          _hover={{ bgColor: "black" }}
                          color={"white"}
                          noOfLines={1}
                          transition="filter 0.3s"
                          onClick={props.handleClose}
                        >
                          Back
                        </Button>
                      </Stack>
                    </div>
                  </div>
                )}
                {isValid && (
                  <div
                    className="container w-100"
                    style={{
                      backgroundColor: "white",
                      overflow: "hidden",
                    }}
                  >
                    <div className="row align-items-center text-center">
                      <FaCircleQuestion
                        style={{ fontSize: "3.5rem", color: "orange" }}
                      />
                      <h3 style={{ fontWeight: "700", color: "orange" }}>
                        CONFIRM
                      </h3>
                      {availableTerm() === props.listTerm.length + 1 ? (
                        <p>
                          Bạn có muốn tạo mới và lưu danh sách vào học kì{" "}
                          {availableTerm()}
                        </p>
                      ) : props.selectedTerm === 0 ? (
                        <div>
                          <p>Bạn đang còn thiếu học kì {availableTerm()}</p>
                          <p>
                            {" "}
                            <span style={{ fontWeight: "bold" }}>
                              Danh sách sẽ được lưu vào học kì:
                            </span>{" "}
                            {availableTerm()}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p>
                            Bạn có muốn cập nhật danh sách cho học kì:{" "}
                            {availableTerm()}
                          </p>
                          <p>
                            {" "}
                            <span style={{ fontWeight: "bold" }}>
                              Danh sách sẽ được lưu vào học kì:
                            </span>{" "}
                            {availableTerm()}
                          </p>
                        </div>
                      )}
                      <p>
                        <span style={{ fontWeight: "bold" }}>
                          Số tín chỉ hiện tại:
                        </span>{" "}
                        {total}
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
                )}
              </>
            )}
          </>
        )}
      </Dialog>
    </Backdrop>,
    document.getElementById("portal")!
  );
};

export default NormalModal;
