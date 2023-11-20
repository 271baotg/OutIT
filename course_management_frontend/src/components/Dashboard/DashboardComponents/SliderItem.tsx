import React from "react";
import styled from "styled-components";
import TypeBar from "../../Course/CourseComponents/TypeBar";
import ConstraintProgress from "./ConstraintProgress";

const Card = styled.div`
  height: 150px;
  width: 95%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const SliderItem = () => {
  return (
    <Card className="container rounded bg-white d-flex">
      <p style={{ fontWeight: "bold", fontSize: "1rem" }}>
        Chuyên đề tốt nghiệp
      </p>
      <p>
        14 / <span style={{ fontWeight: "bold" }}>18</span>
      </p>
      <ConstraintProgress />
    </Card>
  );
};

export default SliderItem;
