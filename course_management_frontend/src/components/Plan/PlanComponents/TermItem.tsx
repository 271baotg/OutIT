import { Center, Divider } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TermItem = () => {
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            lineHeight: "1",
            fontSize: "1.5rem",
            fontWeight: "700",
            paddingLeft: "1rem",
            margin: 0,
          }}
        >
          HỌC KÌ 1
        </p>
        <div style={{ backgroundColor: "rgba(217, 217, 217, 0.3)" }}>
          <p
            style={{
              padding: "0.8rem",
              lineHeight: "1",
              margin: 0,
            }}
          >
            Số tín chỉ: 20
          </p>
        </div>
      </div>
      <Divider marginTop={0} borderWidth={2} bg={"rgba(217, 217, 217, 0.3)"} />
    </Wrapper>
  );
};

export default TermItem;
