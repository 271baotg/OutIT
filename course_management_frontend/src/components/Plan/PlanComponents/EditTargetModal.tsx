import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Backdrop from "../../Backdrop";
import { Target } from "../../../model/Target";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Button, CloseButton } from "@chakra-ui/react";
import { getTitle } from "../../../hooks/getTypeColor";
import styles from "../styles/EditTargetModal.module.css";
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
import { FaSave } from "react-icons/fa";
import { AxiosInstance } from "axios";
import AuthContext from "../../../auth/AuthProvider";

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

const TableWrapper = styled.div`
  &::-webkit-scrollbar {
    width: 1px; // For Chrome and Safari
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0a0a0a; // For Chrome and Safari
  }
  &::-webkit-scrollbar-track {
    background-color: lightgray; // For Chrome and Safari

    border-radius: 0.7rem;
  }
`;

const Dialog = styled(motion.dialog)`
  width: 60%;
  height: 75%;
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
interface componentProps {
  isOpen: boolean;
  handleClose: MouseEventHandler;
  listTarget: Target[];
  axios: AxiosInstance;
}
const EditTargetModal: React.FC<componentProps> = (props) => {
  const { auth } = useContext(AuthContext);
  const [currentTarget, setCurrentTarget] = useState<Target[]>(
    props.listTarget
  );
  var allType = [
    "CN",
    "CSN",
    "ĐC",
    "CĐTN",
    "ĐA",
    "CNTC",
    "TTTN",
    "KLTN",
    "CSNN",
    "NN",
  ];
  useEffect(() => {
    refreshTarget();
  }, [props.listTarget]);

  const refreshTarget = () => {
    const remainingTarget = allType
      .filter(
        (value) => !props.listTarget.map((obj) => obj.type).includes(value)
      )
      .map((type) => new Target(type, 0, 0));

    setCurrentTarget((prevTarget) => [...prevTarget, ...remainingTarget]);
  };

  const inputValueRef = useRef<number>();
  const handleInputChange = (e: any, type: string) => {
    inputValueRef.current = Number(e.target.value);
    const newCurrentTarget = currentTarget.map((value) => {
      return value.type === type
        ? { ...value, goal: inputValueRef.current! }
        : value;
    });

    setCurrentTarget(newCurrentTarget);
  };

  useEffect(() => {
    console.log(currentTarget);
  }, [currentTarget]);

  //Update mục tiêu tín chỉ
  const updateTarget = async () => {
    try {
      const response: Target[] = await props.axios({
        method: "put",
        url: "http://localhost:8081/student/target",
        params: {
          username: auth?.username,
        },
        data: currentTarget,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
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
          <div className="row" style={{ height: "80%" }}>
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
                  height: "70%",
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
                    fontWeight: "700",
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
                  height: "70%",
                  boxShadow: "0 6px 6px hsl(0deg 0% 0% / 0.3)",
                  borderRadius: "0.7rem",
                }}
              >
                <TableWrapper
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
                  {currentTarget.map((target) => (
                    <div className="row gx-0" style={{}}>
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
                        <div className={styles.input_wrapper}>
                          <input
                            type="number"
                            autoComplete="off"
                            placeholder="0"
                            name="text"
                            defaultValue={target.goal}
                            onChange={(e) => handleInputChange(e, target.type)}
                            className={styles.input}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </TableWrapper>
                <div
                  style={{
                    width: "100%",
                    height: "10%",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    fontSize: "0.8rem",
                    textAlign: "center",
                    fontWeight: "700",
                  }}
                >
                  Bảng mục tiêu sau điều chỉnh
                </div>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{
              flexGrow: 1,
              backgroundColor: "rgba(217, 217, 217, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <Button
              onClick={updateTarget}
              as={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              leftIcon={<FaSave />}
              width={"fit-content"}
              marginRight={"0.5rem"}
              cursor={"pointer"}
              colorScheme="green"
              variant="solid"
            >
              Save
            </Button>
          </div>
        </div>
      </Dialog>
    </Backdrop>
  );
};

export default EditTargetModal;
