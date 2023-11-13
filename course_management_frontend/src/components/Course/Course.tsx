import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
import CourseTable from "./CourseComponents/CourseTable";
import { axiosPrivate } from "../../api/axios";
import { useAxiosPrivate } from "../../hooks/useAxiosHook";
import styles from "./styles/Course.module.css";
import PlanTable from "./CourseComponents/PlanTable";
import { useDebounce } from "../../hooks/useDebounce";
import { FaCheck, FaTrash, FaArrowLeft } from "react-icons/fa6";
import ProgressBar from "./CourseComponents/ProgressBar";
import { relative } from "path";
import TermBox from "./CourseComponents/TermBox";
import AuthContext from "../../auth/AuthProvider";
import Modal from "../Modal";

const Wrapper = styled.div``;

const Layout = styled.div`
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

const EditPanel = styled.div`
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
  const [tabIndex, setTabIndex] = useState(0);
  const [listTerm, setListTerm] = useState<Term[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<number>(0);
  const [flipState, setFlipState] = useState<boolean>(false);
  const [allEnrollment, setAllEnrollment] = useState<Enrollment[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [planList, setPlanList] = useState<Course[]>([]);

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
        setSelectedList(response);
      } catch (error) {
        console.log(error);
      }
    };
    loadCourseByTerm();
  }, [selectedTerm]);

  //Gọi API lấy danh sách học kì và tổng môn mỗi kì
  useEffect(() => {
    setSelectedList([]);
    if (tabIndex === 0) {
      setFlipState(false);
      setSelectedTerm(0);
    }
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
    const loadAllEnrollment = async () => {
      try {
        const allEnerolment: Enrollment[] = await axiosPrivate({
          url: "http://localhost:8081/enroll",
          method: "get",
          params: {
            username: auth?.username,
          },
        });

        console.log(`All Enrollment: ${JSON.stringify(allEnerolment)}`);
        setAllEnrollment(allEnerolment);
      } catch (error) {}
    };

    const loadCourse = async () => {
      try {
        const response: Course[] = await axiosPrivate({
          method: "get",
          url: "http://localhost:8081/course",
        });
        const list = response as Course[];
        setCourseList(list);
      } catch (error) {
        console.log(error);
      }
    };

    loadCourse();
    loadAllEnrollment();
  }, []);

  useEffect(() => {
    console.log(`Selected Course: ${JSON.stringify(selectedList)}`);
  }, [selectedList]);

  const onResetHandler = () => {
    setSelectedList([]);
  };

  return (
    <Wrapper className="container-fluid gx-0 m-0 h-100">
      <AnimatePresence initial={false} onExitComplete={() => null}>
        {modalOpen && (
          <Modal
            data={planList}
            isOpen={modalOpen}
            handleClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
      <SideBar></SideBar>
      <Content>
        <Layout className="container-fluid h-100">
          <div className="row h-100">
            <LeftCol className="col-sm-12 col-md-8">
              <CourseTable
                allEnrollment={allEnrollment}
                data={courseList}
                checklist={selectedList}
                setchecklist={setSelectedList}
                query={query}
                setQuery={setQuery}
                selectedTerm={selectedTerm}
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
                      <PlanTable
                        data={selectedList}
                        planList={planList}
                        setPlanList={setPlanList}
                      ></PlanTable>
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
                          onClick={() =>
                            modalOpen ? setModalOpen(false) : setModalOpen(true)
                          }
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
                      justifyContent: "center",
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
                            {listTerm.map((term, i) => {
                              return (
                                <motion.div
                                  key={term.term}
                                  className="col"
                                  initial={{
                                    opacity: 0,
                                    translateX: i % 2 === 0 ? -50 : 50,
                                    translateY: -50,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    translateX: 0,
                                    translateY: 0,
                                  }}
                                  transition={{ duration: 0.3, delay: i * 0.2 }}
                                >
                                  <TermBox
                                    data={term}
                                    selectedTerm={selectedTerm}
                                    setSelectedTerm={setSelectedTerm}
                                  />
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className={styles.back_card}>
                        <EditPanel className="container rounded bg-white p-md-3 d-flex">
                          <StatusBar>
                            <div className={styles.header_text}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <h3 className="text-start">
                                  Term {selectedTerm}
                                </h3>
                                <button
                                  className={styles.back_button}
                                  onClick={() => {
                                    setFlipState(false);
                                    setSelectedTerm(0);
                                  }}
                                >
                                  <FaArrowLeft
                                    style={{ paddingRight: "4px" }}
                                  />
                                  Back
                                </button>
                              </div>
                            </div>
                            <ProgressBar data={selectedList} />
                          </StatusBar>
                          <Divider />
                          <PlanTable
                            data={selectedList}
                            planList={planList}
                            setPlanList={setPlanList}
                          ></PlanTable>
                          <Stack
                            direction="row"
                            style={{
                              display: "flex",
                              justifyContent: "end",
                              paddingTop: "1rem",
                            }}
                          >
                            <Button
                              as={motion.div}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              leftIcon={<FaCheck />}
                              colorScheme="green"
                              variant="solid"
                              onClick={() =>
                                modalOpen
                                  ? setModalOpen(false)
                                  : setModalOpen(true)
                              }
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
                        </EditPanel>
                      </div>
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
