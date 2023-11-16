import React, { useEffect, useState } from "react";
import TypeBar from "./TypeBar";
import { Type } from "../../../model/TypeAndTotal";
import styled from "styled-components";

const ChartWrapper = styled.div`
  /* Style the scrollbar track */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Style the scrollbar handle */
  &::-webkit-scrollbar-thumb {
    background-color: #6b6b6b; /* Adjust the color as needed */
    border-radius: 10px;
  }

  /* Style the scrollbar track on hover */
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 10px;
  }

  /* Style the scrollbar handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555; /* Adjust the color as needed */
  }
`;

interface componentProps {
  listType: Type[];
}

const TypeChart: React.FC<componentProps> = (props) => {
  const mainType: string[] = ["CN", "CSN", "CNTC", "ĐC", "CSNN"];

  return (
    <ChartWrapper
      style={{
        height: "80%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "0.5rem",
        background: "#000000",
        border: "1px solid #ddd",
        borderRadius: "0.7rem",
        overflow: "auto",
      }}
    >
      {props.listType
        .reverse()
        .map((type) => type.total != 0 && <TypeBar data={type} />)}
    </ChartWrapper>
  );
};

export default TypeChart;
