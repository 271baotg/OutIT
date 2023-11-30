import React, { Children } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  min-width: 100%;
  transition: var(--transition-speed) ease-out;
  @media only screen and (max-width: 600px) {
    margin: 0;
  }
`;

const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Content;
