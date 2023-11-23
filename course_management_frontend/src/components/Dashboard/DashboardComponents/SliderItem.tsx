import React from "react";
import styled from "styled-components";
import TypeBar from "../../Course/CourseComponents/TypeBar";
import ConstraintProgress from "./ConstraintProgress";
import { Target } from "../../../model/Target";
import { FaCircleCheck } from "react-icons/fa6";
import { Divider, Link } from "@chakra-ui/react";

const Card = styled.div`
  height: 150px;
  width: 95%;
  padding: 1rem;
  margin-top: 6px;
  margin-bottom: 6px;
  box-shadow: 0 6px 6px hsl(0deg 0% 0% / 0.3);
  display: flex;
  flex-direction: column;
`;

interface componentProps {
  data: Target;
}

const SliderItem: React.FC<componentProps> = (props) => {
  const getTitle = () => {
    if (props.data.type == "CN") return "CHUYÊN NGHÀNH";
    if (props.data.type == "CSN") return "CƠ SỞ NGHÀNH";
    if (props.data.type == "ĐC") return "ĐẠI CƯƠNG";
    if (props.data.type == "CNTC") return "CHUYÊN NGHÀNH TỰ CHỌN";
    if (props.data.type == "CSNN") return "CƠ SỞ NHÓM NGHÀNH";
    if (props.data.type == "CĐTN") return "CHUYÊN ĐỀ TỐT NGHIỆP";
    if (props.data.type == "TTDN") return "THỰC TẬP TỐT NGHIỆP";
    if (props.data.type == "ĐA") return "ĐỒ ÁN";
    else return "CÁC MÔN KHÁC";
  };

  return (
    <Card className="container rounded bg-white d-flex mx-2">
      <p style={{ fontWeight: "bold", fontSize: "1rem" }}>{getTitle()}</p>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>
          {props.data.total} /{" "}
          <span style={{ fontWeight: "bold" }}>{props.data.goal}</span>
        </p>
        {props.data.total >= props.data.goal && <FaCircleCheck color="green" />}
      </div>
      <ConstraintProgress data={props.data} />
      <Link color="teal.500">Xem chi tiết</Link>
    </Card>
  );
};

export default SliderItem;
