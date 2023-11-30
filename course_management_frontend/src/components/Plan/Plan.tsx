import React from "react";
import styled from "styled-components";
import Content from "../Content";
import { Avatar, AvatarBadge, AvatarGroup, WrapItem } from "@chakra-ui/react";

const Wrapper = styled.div`
  height: calc(100vh - 83.5px);
  min-height: calc(100vh - 83.5px);
  padding: 2rem;
  margin-left: 10rem;
  transition: var(--transition-speed) ease-out;
  background-color: #ebcf94;

  @media only screen and (max-width: 600px) {
    margin: 0;
  }
`;

const Left = styled.div``;
const TermTable = styled.div`
  background-color: orange;
`;
const TargetPanel = styled.div`
  background-color: aqua;
`;

const Plan = () => {
  return (
    <Wrapper>
      <Content>
        <div className="row h-100" style={{ padding: "8px" }}>
          <div className="col-md-9">
            <Left className="container gx-0 rounded bg-white h-100">
              <div className="row gx-0 h-100">
                <div
                  className="col-md-4"
                  style={{ backgroundColor: "rgba(217, 217, 217, 0.3)" }}
                >
                  <WrapItem
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "1rem",
                    }}
                  >
                    <Avatar
                      style={{
                        backgroundColor: "black",
                        border: "2px solid #ddd", // Add your desired border style
                      }}
                      size="2xl"
                      src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.nicepng.com%2Fourpic%2Fu2q8i1a9e6i1o0o0_view-user-icon-png-user-circle-icon-png%2F&psig=AOvVaw2mBmc9pOYG35DlsSPSBc2_&ust=1701442623670000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPifquv964IDFQAAAAAdAAAAABAJ"
                    />
                  </WrapItem>
                </div>
                <div className="col-md-8"></div>
              </div>
            </Left>
          </div>
          <div className="col-md-3"></div>
        </div>
      </Content>
    </Wrapper>
  );
};

export default Plan;
