import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideBar from "../SideBar";
import Content from "../Content";
import CourseTable from "./CourseTable";
import { axiosPrivate } from "../../api/axios";
import { useAxiosPrivate } from "../../api/useAxiosHook";
import styles from "./Course.module.css";
import PlanTable from "./PlanTable";

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

const InfoPanel = styled.div`
  display: flex; /* Use flexbox to control child elements */
  flex-direction: column; /* Stack child elements vertically */
  background-color: #ddd;
  width: 100%;
  min-height: 80%;
  max-height: 80%;
  margin-top: 3rem;
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
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Divider = styled.hr`
  background-color: #fff;
  margin: 1rem 0;
`;

const Course = () => {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const response: Course[] = await axiosPrivate({
          method: "get",
          url: "http://localhost:8081/course",
        });
        console.log(response);
        const list = response as Course[];
        console.log("List course: " + list);
        setCourseList(list);
      } catch (error) {
        console.log(error);
      }
    };

    loadCourse();
  }, []);

  useEffect(() => {
    console.log("Course list: " + JSON.stringify(courseList));
  }, [courseList]);

  return (
    <Wrapper className="container-fluid gx-0 m-0 h-100">
      <SideBar></SideBar>
      <Content>
        <Layout className="container-fluid h-100">
          <h1 className="mb-lg">Course</h1>
          <Widget className="row"></Widget>
          <div className="row h-100">
            <LeftCol className="col-sm-12 col-md-8">
              <CourseTable data={courseList} />
            </LeftCol>
            <RightCol className="col-sm-12 col-md-4">
              <InfoPanel className="container rounded mt-5 bg-white p-md-5 d-flex">
                <StatusBar>
                  <div className={styles.header_text}>
                    <div>
                      <h3>Your Plan</h3>
                      <div>
                        <span>Current: 23</span>
                      </div>
                    </div>
                  </div>
                </StatusBar>
                <Divider />
                <PlanTable></PlanTable>
              </InfoPanel>
            </RightCol>
          </div>
        </Layout>
      </Content>
    </Wrapper>
  );
};

export default Course;
