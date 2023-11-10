import React from "react";
import TypeBar from "./TypeBar";

const TypeChart = () => {
  return (
    <div
      style={{
        height: "95%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "0.5rem",
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "0.7rem",
        overflow: "auto",
      }}
    >
      <TypeBar />
      <TypeBar />
      <TypeBar />
      <TypeBar />
      <TypeBar />
    </div>
  );
};

export default TypeChart;
