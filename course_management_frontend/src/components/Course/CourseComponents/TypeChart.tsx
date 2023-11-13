import React, { useEffect, useState } from "react";
import TypeBar from "./TypeBar";
import { Type } from "../../../model/TypeAndTotal";

interface componentProps {
  listType: Type[];
}

const TypeChart: React.FC<componentProps> = (props) => {
  const mainType: string[] = ["CN", "CSN", "CNTC", "ĐC", "CSNN"];

  return (
    <div
      style={{
        height: "95%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "0.5rem",
        background: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "0.7rem",
        overflow: "auto",
      }}
    >
      {props.listType.map((type) => type.total != 0 && <TypeBar data={type} />)}
    </div>
  );
};

export default TypeChart;
