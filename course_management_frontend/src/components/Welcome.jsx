/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import background from "../Images/welcome.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: var(--main-color);
`;

const LearnMoreButton = styled.div`
  width: auto;
  padding: 1em 2em;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--text-color);
  transition: all 1000ms;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  outline: 2px solid var(--text-color);

  &:hover {
    color: #ffffff;
    transform: scale(1.05);
    outline: 2px solid var(--text-color);
    box-shadow: 4px 5px 17px -4px var(--second-color);
  }

  &:before {
    content: "";
    position: absolute;
    left: -50px;
    top: 0;
    width: 0;
    height: 100%;
    background-color: var(--button-color);
    transform: skewX(45deg);
    z-index: -1;
    transition: width 1000ms;
  }

  &:hover:before {
    width: 250%;
  }
`;

const Content = styled.div`
  margin-top: 150px;
`;

const TextHighlight = styled.span`
  color: var(--button-color);
`;
const Welcome = () => {
  return (
    <Wrapper className="container-fluid p-0 m-0">
      <Header></Header>
      <Content className="container-fluid row">
        <div className="col-lg-6 p-5 mt-4">
          <h1 className="display-3">
            Welcome to <TextHighlight>OutIT</TextHighlight>, a website help you
            get Out of UIT faster.
          </h1>

          <div className="d-flex">
            <LearnMoreButton>Create Account </LearnMoreButton>
          </div>
        </div>

        <div className="container-fluid col-lg-6 d-flex justify-content-center align-items-baseline">
          <img className="mw-100" src={background} alt="" />
        </div>
      </Content>
    </Wrapper>
  );
};

export default Welcome;
