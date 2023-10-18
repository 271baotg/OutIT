import React from "react";
import styled from "styled-components";
import SideBar from "../SideBar";
import Content from "../Content";

const Dashboard = () => {
  return (
    <div className="container-fluid gx-0 m-0 h-100">
      <SideBar />
      <Content />
    </div>
  );
};

export default Dashboard;
