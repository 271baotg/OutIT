import { Button } from "@chakra-ui/react";
import React from "react";
import { FaRightFromBracket } from "react-icons/fa6";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const NavWrapper = styled.nav`
  height: calc(100% - 83.5px);
  width: 3rem;
  background-color: var(--background-color);
  transition: width 600ms ease;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add box shadow to the right */
  left: 0;
  top: 0;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* Small screens */
  @media only screen and (max-width: 600px) {
    display: none;
    bottom: 0;
    width: 100vw;
    height: 3rem;
    position: sticky;

    .navbar {
      flex-direction: row;
      .nav-link {
        justify-content: center;
      }
    }
  }

  /* Large screens */
  @media only screen and (min-width: 600px) {
    width: 10rem;
    height: 100%;
    .nav-item {
      width: 100%;
    }

    /* &:hover {
      --content-left-margin: 10rem;
      width: 10rem;
      .nav-item {
        .nav-link {
          .link-text {
            display: inline;
            font-size: 1rem;
          }
          .logo-text {
            left: 0px;
          }
          .logo svg {
            margin-left: 11rem;
          }
        }
      }
    } */
  }

  .navbar {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
  }
  .logo {
    font-weight: bold;
    margin-bottom: 5rem;
    margin-top: 1.5rem;
    text-align: center;
    color: #000000;
    font-size: 1rem;
    letter-spacing: normal;
    width: 100%;
    span {
      color: var(--button-color);
    }
  }
  .nav-item {
    .nav-link {
      color: #000000;
      display: flex;
      align-items: center;
      height: 3rem;
      transition: var(--transition-speed);

      &:hover {
        filter: grayscale(0%) opacity(1);
        background: var(--heavy-color);
        color: white;
      }

      svg {
        height: 1rem;
        width: 1rem;
        min-width: 1rem;
        margin: 0 1rem;
      }
    }
  }
`;

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <NavWrapper>
      <ul className="navbar">
        <li className="logo">
          <NavLink
            style={{ fontSize: "2rem" }}
            to="/dashboard"
            className="nav-link"
          >
            Out<span>IT</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/dashboard" className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
            <span className="link-text">Dashboard</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/course" className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
            </svg>
            <span className="link-text">Course</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/plan" className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
            </svg>
            <span className="link-text">Planning</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/about" className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z" />
            </svg>
            <span className="link-text">About</span>
          </NavLink>
        </li>
      </ul>
      <div
        className="row"
        style={{
          marginBottom: "0.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          leftIcon={<FaRightFromBracket />}
          width={"fit-content"}
          marginRight={"0.5rem"}
          cursor={"pointer"}
          colorScheme="black"
          variant={"outline"}
          onClick={() => {
            sessionStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </Button>
      </div>
    </NavWrapper>
  );
};

export default SideBar;
