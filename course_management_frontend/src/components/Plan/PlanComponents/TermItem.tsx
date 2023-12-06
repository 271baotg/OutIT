import { Center, Divider } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import TypeTag from "./TypeTag";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const TypeLane = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  background-color: #ffffff;
  align-items: center;
`;

interface componentProps {
  data: Term;
}

const TermItem: React.FC<componentProps> = (props) => {
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
          HỌC KÌ {props.data.term}
        </p>
        <div style={{ backgroundColor: "rgba(217, 217, 217, 0.3)" }}>
          <p
            style={{
              padding: "0.8rem",
              lineHeight: "1",
              margin: 0,
            }}
          >
            Số tín chỉ: {props.data.total}
          </p>
        </div>
      </div>
      <Divider
        marginTop={0}
        marginBottom={0}
        borderWidth={2}
        bg={"rgba(217, 217, 217, 0.3)"}
      />
      <TypeLane>
        <div
          style={{
            width: "100%",
            display: "inline",
            flexWrap: "wrap",
          }}
        >
          {props.data.listType.map((type, i) => (
            <TypeTag data={type}></TypeTag>
          ))}
        </div>
      </TypeLane>
    </Wrapper>
  );
};

export default TermItem;
