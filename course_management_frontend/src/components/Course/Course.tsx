import React, { useContext, useEffect, useState } from "react";
import {
  Progress,
  Button,
  Stack,
  Flex,
  calc,
  TabIndicator,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styled from "styled-components";
import SideBar from "../SideBar";
import Content from "../Content";
import CourseTable from "./CourseTable";
import { axiosPrivate } from "../../api/axios";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import styles from "./Course.module.css";
import PlanTable from "./PlanTable";
import { useDebounce } from "../../hooks/useDebounce";
import { FaCheck, FaTrash } from "react-icons/fa6";
import ProgressBar from "./ProgressBar";
import { relative } from "path";
import TermBox from "./TermBox";
import AuthContext from "../../auth/AuthProvider";

const Wrapper = styled.div``;

const Layout = styled.div`
  padding-top: 2rem;
  h1 {
    margin-bottom: 2rem;
  }
`;

const Widget = styled.div`
  height: 10rem;
  background-color: var(--text-color);
`;

const LeftCol = styled.div`
  background-color: #fff;
  height: 100%;
`;
const RightCol = styled.div`
  background-color: #fff;
  height: 100%;
`;

const Card = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-height: "calc(100% - 3rem)";
  transform-style: preserve-3d;
  transition: all 0.5s ease;
  text-align: center;
  font-weight: 700;
  font-size: 0.937rem;
  text-transform: uppercase;
  border: 2px solid #34444c;
  box-shadow: 4px 4px 0 #34444c;

  /* &:hover {
    transform: rotateY(180deg);
  } */
`;

const InfoPanel = styled.div`
  display: flex; /* Use flexbox to control child elements */
  flex-direction: column; /* Stack child elements vertically */
  background-color: #ddd;
  width: 100%;
  height: 100%;
  max-height: "calc(100% - 3rem)";
  padding: 2rem;
  color: #212529;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
  font-family: montserrat, sans-serif;
  line-height: 1.6;
  box-sizing: border-box;
  text-align: center;
  font-weight: 700;
  font-size: 0.937rem;
  text-transform: uppercase;
  border: 2px solid #34444c;
  background: #fff;
  box-shadow: 4px 4px 0 #34444c;
`;

const StatusBar = styled.div`
  width: 100%;
  align-items: center;

  justify-content: space-between;
`;

const Divider = styled.hr`
  background-color: #fff;
  margin: 1rem 0;
`;

const Course = () => {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [selectedList, setSelectedList] = useState<Course[]>([]);
  const { auth } = useContext(AuthContext);
  const axiosPrivate = useAxiosPrivate();
  const [query, setQuery] = useState<string>("");
  const debounce = useDebounce<string>(query, 500);
  const [currentValue, setCurrentValue] = useState(70);
  const [tabIndex, setTabIndex] = useState(0);
  const [listTerm, setListTerm] = useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<number>(0);
  const [flipState, setFlipState] = useState<boolean>(false);

  const getTranslateY = () => {
    if (flipState) {
      return "rotateY(180deg)";
    }
  };

  useEffect(() => {
    if (selectedTerm !== 0) {
      setFlipState(true);
      console.log(selectedTerm);
    }
  }, [selectedTerm]);

  //Gọi API lấy danh sách học kì và tổng môn mỗi kì
  useEffect(() => {
    setSelectedList([]);
    if (tabIndex === 1) {
      const loadTerm = async () => {
        try {
          const response: Term[] = await axiosPrivate({
            url: `http://localhost:8081/enroll/terms/${auth?.username}`,
            method: "get",
          });
          setListTerm(response);

          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };

      loadTerm();
    }
  }, [tabIndex]);

  //Gọi API Search sử dụng Debounce
  useEffect(() => {
    const search = async (query: string) => {
      try {
        if (query === "") {
          const loadCourse = async () => {
            try {
              const response: Course[] = await axiosPrivate({
                method: "get",
                url: "http://localhost:8081/course",
              });
              console.log(response);
              const list = response as Course[];
              setCourseList(list);
            } catch (error) {
              console.log(error);
            }
          };

          loadCourse();
          return;
        }

        const response: Course[] = await axiosPrivate({
          method: "get",
          url: "http://localhost:8081/course/search",
          params: {
            query: query,
          },
        });
        console.log("Search result: " + JSON.stringify(response));
        setCourseList(response);
      } catch (error) {
        console.log(error);
      }
    };
    search(query);
  }, [debounce]);

  //Gọi API lấy toàn bộ danh sách môn học
  useEffect(() => {
    const loadCourse = async () => {
      try {
        const response: Course[] = await axiosPrivate({
          method: "get",
          url: "http://localhost:8081/course",
        });
        console.log(response);
        const list = response as Course[];
        setCourseList(list);
      } catch (error) {
        console.log(error);
      }
    };

    loadCourse();
  }, []);

  const onResetHandler = () => {
    setSelectedList([]);
  };

  return (
    <Wrapper className="container-fluid gx-0 m-0 h-100">
      <SideBar></SideBar>
      <Content>
        <Layout className="container-fluid h-100">
          <h1 className="mb-lg">Course</h1>
          <Widget className="row"></Widget>
          <div className="row h-100">
            <LeftCol className="col-sm-12 col-md-8">
              <CourseTable
                data={courseList}
                checklist={selectedList}
                setchecklist={setSelectedList}
                query={query}
                setQuery={setQuery}
              />
            </LeftCol>
            <RightCol className="col-sm-12 col-md-4">
              <Tabs
                onChange={(index) => setTabIndex(index)}
                defaultIndex={0}
                variant="enclosed"
                style={{
                  marginTop: "3rem",
                  maxHeight: "80%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <TabList>
                  <Tab
                    _selected={{ backgroundColor: "orange" }}
                    className={styles.tab_label}
                  >
                    New Plan
                  </Tab>

                  <Tab
                    _selected={{ backgroundColor: "orange" }}
                    className={styles.tab_label}
                  >
                    Edit mode
                  </Tab>
                </TabList>
                <TabPanels
                  style={{ flex: 1, maxHeight: "calc(100% - 2rem - 2px" }}
                >
                  <TabPanel
                    style={{
                      padding: 0,
                      height: "calc(100% - 3rem)",
                      display: "flex",
                    }}
                  >
                    <InfoPanel className="container rounded mt-5 bg-white p-md-3 d-flex">
                      <StatusBar>
                        <div className={styles.header_text}>
                          <div>
                            <h3 className="text-start">Your Plan</h3>
                            <ProgressBar data={selectedList} />
                          </div>
                        </div>
                      </StatusBar>
                      <Divider />
                      <PlanTable data={selectedList}></PlanTable>
                      <Stack
                        direction="row"
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          paddingTop: "1rem",
                        }}
                      >
                        <Button
                          leftIcon={<FaCheck />}
                          colorScheme="green"
                          variant="solid"
                        >
                          Create Plan
                        </Button>
                        <Button
                          onClick={onResetHandler}
                          rightIcon={<FaTrash />}
                          colorScheme="red"
                          variant="outline"
                        >
                          Reset
                        </Button>
                      </Stack>
                    </InfoPanel>
                  </TabPanel>
                  <TabPanel
                    style={{
                      padding: 0,
                      height: "calc(100% - 3rem)",
                      display: "flex",
                      position: "relative",
                    }}
                  >
                    <Card
                      className="container rounded mt-5 p-0 bg-white d-flex"
                      style={{ transform: getTranslateY() }}
                    >
                      <div className={styles.front_card}>
                        <h3>Please select your term</h3>
                        <div className="fluid-container">
                          <div
                            className="row row-cols-3 px-4 gy-2"
                            style={{ height: "30%" }}
                          >
                            {listTerm.map((term) => {
                              return (
                                <div className="col">
                                  <TermBox
                                    data={term}
                                    selectedTerm={selectedTerm}
                                    setSelectedTerm={setSelectedTerm}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className={styles.back_card}></div>
                    </Card>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </RightCol>
          </div>
        </Layout>
      </Content>
    </Wrapper>
  );
};

export default Course;
