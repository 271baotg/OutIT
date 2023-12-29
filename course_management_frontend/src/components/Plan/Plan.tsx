import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Content from "../Content";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Button,
  Heading,
  Highlight,
  List,
  ListIcon,
  ListItem,
  WrapItem,
  position,
} from "@chakra-ui/react";
import {
  FaChalkboardUser,
  FaCircle,
  FaEnvelope,
  FaIdBadge,
  FaIdCard,
} from "react-icons/fa6";
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
import TermLayout from "./PlanComponents/TermLayout";
import { useAxiosPrivate } from "../../hooks/useAxiosHook";
import AuthContext from "../../auth/AuthProvider";
import { FaDotCircle } from "react-icons/fa";
import axios from "axios";
import { Target } from "../../model/Target";
import { getTitle, getTypeColor } from "../../hooks/getTypeColor";
import { AnimatePresence, color } from "framer-motion";
import EditTargetModal from "./PlanComponents/EditTargetModal";
import ConfirmModal from "./PlanComponents/ConfirmModal";
import { BlobOptions } from "buffer";
import { UserModal } from "../../model/UserModal";

const Wrapper = styled.div`
  height: calc(100vh - 83.5px);
  min-height: calc(100vh - 83.5px);
  padding: 2rem;
  margin-left: 10rem;
  transition: var(--transition-speed) ease-out;
  background-color: #ebcf94;

  @media only screen and (max-width: 600px) {
    margin: 0;
  }
`;

const Left = styled.div``;
const Right = styled.div`
  display: flex;
  flex-direction: column;
`;

const Plan = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const [listTerm, setListTerm] = useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<number>();
  const [listCourse, setListCourse] = useState<Course[]>([]);
  const [listTarget, setListTarget] = useState<Target[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [updateTarget, setUpdateTarget] = useState<Target[]>([]);
  const [secondModalOpen, setSecondModalOpen] = useState<boolean>(false);
  const [currentStudent, setCurrentStudent] = useState<UserModal>();

  const updateTargetRef = useRef<Target[]>([]);

  //Lấy danh sách các kì và tổng số tín chỉ mỗi kì
  const loadTerm = async () => {
    try {
      const response: Term[] = await axiosPrivate({
        url: `/enroll/terms/${auth?.username}`,
        method: "get",
      });
      const result = response.sort((a, b) => a.term - b.term);
      setListTerm(result);
    } catch (error) {}
  };

  //Lấy danh sách mục tiêu của sinh viên
  const loadTarget = async () => {
    try {
      const response: Target[] = await axiosPrivate({
        method: "get",
        url: `/students/target`,
        params: {
          username: auth?.username,
        },
      });
      console.log(response);
      setListTarget(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loadUserDetail = async () => {
    try {
      const response: UserModal = await axiosPrivate({
        method: "get",
        url: `/students/detail`,
        params: {
          username: auth?.username,
        },
      });
      console.log(response);
      setCurrentStudent(response);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCourseByTerm = async () => {
    try {
      const response: Course[] = await axiosPrivate({
        url: `/enroll/${auth?.username}`,
        method: "get",
        params: {
          term: selectedTerm,
        },
      });
      console.log(`Term ${selectedTerm}: ${JSON.stringify(response)}`);
      setListCourse(response);
    } catch (error) {
      console.log(error);
    }
  };

  const onTermItemClick = (term: number) => {
    setSelectedTerm(term);
  };

  const loadProfile = () => {};

  const refreshAllState = () => {
    loadTarget();
  };

  useEffect(() => {
    loadCourseByTerm();
  }, [selectedTerm]);

  useEffect(() => {
    loadTerm();
    loadTarget();
    loadUserDetail();
  }, []);

  const handleSecondModal = (newListTarget: Target[]) => {
    setModalOpen(false);
    setSecondModalOpen(true);
    updateTargetRef.current = newListTarget;
  };

  return (
    <Wrapper>
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {modalOpen && (
          <EditTargetModal
            axios={axiosPrivate}
            isOpen={modalOpen}
            handleClose={() => setModalOpen(false)}
            handleSecondModal={handleSecondModal}
            listTarget={listTarget}
          />
        )}
        {secondModalOpen && (
          <ConfirmModal
            isOpen={secondModalOpen}
            handleClose={() => setSecondModalOpen(false)}
            onReload={refreshAllState}
            updateTarget={updateTargetRef.current}
            axiosPrivate={axiosPrivate}
          />
        )}
      </AnimatePresence>
      <Content>
        <div className="row h-100 gx-2" style={{ padding: "0" }}>
          <div className="col-md-9 h-100">
            <Left className="container gx-0 rounded bg-white h-100">
              <div className="row gx-0 h-100">
                <div
                  className="col-md-4 h-100"
                  style={{ backgroundColor: "rgba(217, 217, 217, 0.3)" }}
                >
                  {/* <WrapItem
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "black",
                        border: "2px solid #ddd", // Add your desired border style
                      }}
                      size="2xl"
                      src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nicepng.com%2Fourpic%2Fu2q8i1a9e6i1o0o0_view-user-icon-png-user-circle-icon-png%2F&psig=AOvVaw2mBmc9pOYG35DlsSPSBc2_&ust=1701442623670000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPifquv964IDFQAAAAAdAAAAABAJ"
                    />
                  </WrapItem> */}
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <h3>{currentStudent?.fullName}</h3>
                  </div>
                  <div style={{ padding: "0.5rem" }}>
                    <List
                      spacing={3}
                      style={{
                        padding: 0,
                        lineHeight: "1",
                        fontSize: "0.9rem",
                      }}
                    >
                      <ListItem>
                        <ListIcon as={FaIdCard} color="black.500" />
                        <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
                          MSSV
                        </span>
                        : {currentStudent?.username}
                      </ListItem>
                      <ListItem>
                        <ListIcon as={FaEnvelope} color="black.500" />
                        <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
                          Email
                        </span>
                        : {currentStudent?.email}
                      </ListItem>
                      <ListItem>
                        <ListIcon as={FaChalkboardUser} color="black.500" />
                        <span style={{ fontWeight: "bold", fontSize: "1rem" }}>
                          Khoa
                        </span>
                        : {currentStudent?.className}
                      </ListItem>
                    </List>
                  </div>
                </div>
                <div
                  className="col-md-8 h-100"
                  style={{
                    // position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    marginTop="2rem"
                    height="3rem"
                    fontSize="1.5rem"
                    backgroundColor="var(--heavy-color)"
                    paddingLeft="1rem"
                    display="flex"
                    alignItems="center"
                  >
                    Danh sách học kì
                  </Box>
                  <TermLayout
                    data={listTerm}
                    listCourse={listCourse}
                    onTermClick={onTermItemClick}
                  />
                </div>
              </div>
            </Left>
          </div>
          <div className="col-md-3">
            <Right className="container gx-0 rounded bg-white h-100 ">
              <div style={{ height: "85%" }}>
                <p
                  style={{
                    color: "black",
                    fontWeight: "700",
                    fontSize: "1.2rem",
                    padding: "0.5rem",
                  }}
                >
                  Mục tiêu của bạn
                </p>
                <TableContainer>
                  <Table variant="simple" size="sm" maxWidth="100%">
                    <Thead bgColor={"var(--background-color)"}>
                      <Tr>
                        <Th
                          paddingTop={"1rem"}
                          paddingBottom={"1rem"}
                          fontSize={"0.9rem"}
                          color={"black"}
                        >
                          Tên môn học
                        </Th>
                        <Th
                          paddingTop={"1rem"}
                          paddingBottom={"1rem"}
                          fontSize={"0.9rem"}
                          color={"black"}
                        >
                          Mục tiêu
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {listTarget.map((target) => (
                        <Tr>
                          <Td
                            borderLeft={"none"}
                            borderRight={"none"}
                            textColor={`${getTypeColor(target.type)}`}
                            whiteSpace="pre-line"
                            fontWeight={"700"}
                          >
                            {getTitle(target.type)}
                          </Td>
                          <Td
                            borderLeft={"none"}
                            borderRight={"none"}
                            textColor={"black"}
                            textAlign={"center"}
                          >
                            {target.goal}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "rgba(217, 217, 217, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
              >
                <Button
                  bgColor={"black"}
                  textColor={"white"}
                  _hover={{ bgColor: "#ddd", color: "black" }}
                  marginRight={"1rem"}
                  onClick={() => setModalOpen(true)}
                  position={"unset"}
                >
                  EDIT
                </Button>
              </div>
            </Right>
          </div>
        </div>
      </Content>
    </Wrapper>
  );
};

export default Plan;
