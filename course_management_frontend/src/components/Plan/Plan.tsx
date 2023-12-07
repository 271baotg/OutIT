import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Content from "../Content";
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
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
  FaEnvelope,
  FaIdBadge,
  FaIdCard,
} from "react-icons/fa6";
import TermLayout from "./PlanComponents/TermLayout";
import { useAxiosPrivate } from "../../hooks/useAxiosHook";
import AuthContext from "../../auth/AuthProvider";

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
const TermTable = styled.div`
  background-color: orange;
`;
const TargetPanel = styled.div`
  background-color: aqua;
`;

const Plan = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);
  const [listTerm, setListTerm] = useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<number>();
  const [listCourse, setListCourse] = useState<Course[]>([]);

  //Lấy danh sách các kì và tổng số tín chỉ mỗi kì
  const loadTerm = async () => {
    try {
      const response: Term[] = await axiosPrivate({
        url: `http://localhost:8081/enroll/terms/${auth?.username}`,
        method: "get",
      });
      const result = response.sort((a, b) => a.term - b.term);
      setListTerm(result);
    } catch (error) {
      console.log(error);
    }
  };

  const loadCourseByTerm = async () => {
    try {
      const response: Course[] = await axiosPrivate({
        url: `http://localhost:8081/enroll/${auth?.username}`,
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

  useEffect(() => {
    loadCourseByTerm();
  }, [selectedTerm]);

  useEffect(() => {
    loadTerm();
  }, []);

  return (
    <Wrapper>
      <Content>
        <div className="row h-100" style={{ padding: "8px" }}>
          <div className="col-md-9 h-100">
            <Left className="container gx-0 rounded bg-white h-100">
              <div className="row gx-0 h-100">
                <div
                  className="col-md-4 h-100"
                  style={{ backgroundColor: "rgba(217, 217, 217, 0.3)" }}
                >
                  <WrapItem
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
                  </WrapItem>
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <h3>Trần Gia Bảo</h3>
                  </div>
                  <div style={{ padding: "0.5rem" }}>
                    <List spacing={3} style={{ padding: 0, lineHeight: "1" }}>
                      <ListItem>
                        <ListIcon as={FaIdCard} color="black.500" />
                        <span style={{ fontWeight: "bold" }}>MSSV</span>:
                        21521862
                      </ListItem>
                      <ListItem>
                        <ListIcon as={FaEnvelope} color="black.500" />
                        <span style={{ fontWeight: "bold" }}>Email</span>:
                        21521862@gm.uit.edu.vn
                      </ListItem>
                      <ListItem>
                        <ListIcon as={FaChalkboardUser} color="black.500" />
                        <span style={{ fontWeight: "bold" }}>Khoa</span>: CNPM
                      </ListItem>
                    </List>
                  </div>
                </div>
                <div
                  className="col-md-8 h-100"
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    marginTop="2rem"
                    height="3rem"
                    fontSize="1.5rem"
                    backgroundColor="gray.300"
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
          <div className="col-md-3"></div>
        </div>
      </Content>
    </Wrapper>
  );
};

export default Plan;
