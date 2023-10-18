import React from "react";
import styled from "styled-components";
import SideBar from "../SideBar";
import Content from "../Content";

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
  background-color: var(--heavy-color);
`;
const RightCol = styled.div`
  background-color: #fff;
`;

const Course = () => {
  return (
    <Wrapper className="container-fluid gx-0 m-0 h-100">
      <SideBar></SideBar>
      <Content>
        <Layout className="container-fluid h-100">
          <h1 className="mb-lg">Course</h1>
          <Widget className="row"></Widget>
          <div className="row h-100">
            <LeftCol className="col-sm-12 col-md-6"></LeftCol>
            <RightCol className="col-sm-12 col-md-6"></RightCol>
          </div>
        </Layout>
      </Content>
    </Wrapper>
  );
};

export default Course;
