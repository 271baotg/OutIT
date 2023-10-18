import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  margin-left: 5rem;
  padding: 1rem;
  background-color: var(--background-color);

  @media only screen and (max-width: 600px) {
    margin: 0;
  }
`;

const Content = () => {
  return <Wrapper>Content</Wrapper>;
};

export default Content;
