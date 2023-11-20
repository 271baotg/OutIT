import React from "react";
import styled from "styled-components";
import SideBar from "../SideBar";
import Content from "../Content";
import ConstraintSlider from "./DashboardComponents/ConstraintSlider";

const Wrapper = styled.div`
  height: 100%;
  margin-left: 10rem;
  padding: 2rem;
  transition: var(--transition-speed) ease-out;
  background-color: #ddd;

  @media only screen and (max-width: 600px) {
    margin: 0;
  }
`;

const ConstraintWidget = styled.div``;

const Dashboard = () => {
  return (
    <div
      className="container-fluid gx-0 m-0"
      style={{ height: "calc(100vh - 83.5px)" }}
    >
      <Wrapper>
        <ConstraintWidget className="row">
          <ConstraintSlider />
        </ConstraintWidget>
        <div className="row">
          <div className="col-md-8"></div>
          <div className="col-md-4"></div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Dashboard;
