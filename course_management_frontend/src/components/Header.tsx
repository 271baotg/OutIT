/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styled from "styled-components";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  background-color: #ffffff;
  padding-top: 10px;
  padding-bottom: 10px;
  min-height: 80px;
  color: var(--text-color);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  top: 0;
  position: sticky;
  width: 100%;
  z-index: 1;
`;

const LoginButton = styled.div`
  text-align: center;
  padding: 0.5em;
  appearance: none;
  background-color: var(--button-color);
  border: 0.125em solid #1a1a1a;
  border-radius: 0.95em;
  box-sizing: border-box;
  color: var(--text-color);
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-width: 0;
  outline: none;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: #fff;
    background-color: #1a1a1a;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

const Header = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const handlerLoginButton = () => {
    navigate("/login");
  };

  return (
    <Wrapper className="row gx-0">
      <nav className="navbar navbar-expand-lg col-3">
        <a
          className="navbar-brand fs-2 px-5 col-3 p-0"
          style={{ color: "black" }}
          href="/"
        >
          Out<span style={{ color: "var(--button-color)" }}>IT</span>
        </a>
      </nav>
      {location === "/" ? (
        <div className="col-9 d-flex justify-content-end pe-3">
          <LoginButton onClick={handlerLoginButton} className="fs-4 nav-item">
            Login Now
          </LoginButton>
        </div>
      ) : null}
    </Wrapper>
  );
};

export default Header;
