import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavWrapper = styled.nav`
  height: 100%;
  width: 5rem;
  background-color: var(--bar-color);
  transition: width 600ms ease;
  left: 0;
  position: fixed;
  /* Small screens */
  @media only screen and (max-width: 600px) {
    bottom: 0;
    width: 100vw;
    height: 5rem;

    .navbar {
      flex-direction: row;
      .nav-link {
        justify-content: center;
      }
      .logo {
        display: none;
      }
    }
  }

  /* Large screens */
  @media only screen and (min-width: 600px) {
    top: 0;
    width: 5rem;
    height: 100vh;
    .nav-item {
      width: 100%;
    }

    &:hover {
      width: 16rem;
      .nav-item {
        .nav-link {
          .link-text {
            display: inline;
          }
          .logo-text {
            left: 0px;
          }
          .logo svg {
            margin-left: 11rem;
          }
        }
      }
    }
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
    margin-bottom: 1rem;
    margin-top: 1.5rem;
    text-align: center;
    color: var(--text-color);
    font-size: 1.5rem;
    letter-spacing: normal;
    width: 100%;
  }
  .nav-item {
    .nav-link {
      color: var(--text-color);
      display: flex;
      align-items: center;
      height: 5rem;
      filter: grayscale(100%) opacity(0.7);
      transition: var(--transition-speed);

      &:hover {
        filter: grayscale(0%) opacity(1);
        background: var(--heavy-color);
        color: var(--text-color);
      }

      svg {
        height: 1.5rem;
        width: 2rem;
        min-width: 2rem;
        margin: 0 1.5rem;
      }

      .link-text {
        display: none;
        margin-left: 1rem;
        transition: opacity 0.5s, display 0.6s;
      }
    }
  }
`;

const SideBar = () => {
  return (
    <NavWrapper>
      <ul className="navbar">
        <li className="logo">
          <NavLink to="#" className="nav-link">
            OutIT
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="#" className="nav-link">
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
          <NavLink to="#" className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
            <span className="link-text">Course</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="#" className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
            <span className="link-text">Planning</span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="#" className="nav-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
            </svg>
            <span className="link-text">About</span>
          </NavLink>
        </li>
      </ul>
    </NavWrapper>
  );
};

export default SideBar;
