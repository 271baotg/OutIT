import React from "react";
import styled from "styled-components";
import EnrollmentTable from "../../Dashboard/DashboardComponents/EnrollmentTable";
import TermCourseTable from "./TermCourseTable";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  &:first-child {
    margin-left: 0;
  }
`;

const ScrollableDiv = styled.div`
  width: 100%;
  overflow: auto;
  scrollbar-width: thin; // For Firefox
  scrollbar-color: #161616 lightgray; // For Firefox
  &::-webkit-scrollbar {
    width: 2px; // For Chrome and Safari
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0a0a0a; // For Chrome and Safari
  }
  &::-webkit-scrollbar-track {
    background-color: lightgray; // For Chrome and Safari
  }
`;

interface componentProps {
  data: Term;
  listCourse: Course[];
}
const TermDetail: React.FC<componentProps> = (props) => {
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(217, 217, 217, 0.3)",
        }}
      >
        <p
          style={{
            lineHeight: "1",
            padding: "0.8rem",
            fontSize: "1.5rem",
            fontWeight: "700",
            margin: 0,
          }}
        >
          HỌC KÌ {props.data.term}
        </p>
      </div>
      <div
        style={{
          padding: "0.8rem",
          margin: 0,
        }}
      >
        <p>
          <strong>Tổng số tín chỉ: </strong>
          {props.data.total}
        </p>
        <p>
          <strong>Danh sách môn học: </strong>
        </p>
      </div>
      <ScrollableDiv>
        <TermCourseTable data={props.listCourse} />
      </ScrollableDiv>
    </Wrapper>
  );
};

export default TermDetail;
