import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { login } from "../api/authservice";

const Wrapper = styled.div`
  height: 100%;
`;

const LoginPanel = styled.div`
  background-color: var(--main-color);
  color: var(--text-color);
  padding: 100px 40px;

  .form-group {
    position: relative;
    display: block;
    margin: 0;
    padding: 0;
  }

  .form-style {
    padding: 10px 20px;
    padding-left: 55px;
    height: 56px;
    width: 100%;
    font-weight: 500;
    border-radius: 8px;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.5px;
    outline: none;
    color: var(--text-color);
    background-color: #fff;
    border: none;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
  }
  .form-style:focus,
  .form-style:active {
    border: none;
    outline: none;
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
  }

  .input-icon {
    position: absolute;
    top: 0;
    left: 18px;
    height: 48px;
    font-size: 24px;
    line-height: 48px;
    text-align: left;
    color: #ffeba7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }

  .form-group input:-ms-input-placeholder {
    color: var(--text-color);
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input::-moz-placeholder {
    color: var(--text-color);
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input:-moz-placeholder {
    color: var(--text-color);
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input::-webkit-input-placeholder {
    color: var(--text-color);
    opacity: 0.7;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input:focus:-ms-input-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input:focus::-moz-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input:focus:-moz-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
  .form-group input:focus::-webkit-input-placeholder {
    opacity: 0;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
`;

const LoginButton = styled.button`
  align-items: center;
  background-color: var(--button-color);
  border: 2px solid #111;
  border-radius: 8px;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-family: Inter, sans-serif;
  font-size: 20px;
  font-weight: 500;
  height: 48px;
  justify-content: center;
  line-height: 24px;
  max-width: 100%;
  padding: 0 25px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover:after {
    transform: translate(0, 0);
  }

  &:active {
    background-color: var(--text-color);
    outline: 0;
  }

  &:hover {
    outline: 0;
    &:after {
      background-color: #111;
      border-radius: 8px;
      content: "";
      display: block;
      height: 48px;
      left: 0;
      width: 100%;
      position: absolute;
      top: -2px;
      transform: translate(8px, 8px);
      transition: transform 0.2s ease-out;
      z-index: -1;
    }
  }

  @media (min-width: 768px) {
    .button-56 {
      padding: 0 40px;
    }
  }
`;

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      console.log(response.data);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    setError("");
  }, [username, password]);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <Wrapper className="container-fluid m-0 p-0">
      <div className="row vh-100 m-0">
        <div className="col-md-6 d-none d-md-block p-0"></div>

        <LoginPanel className="col-md-6  m-0 row">
          <div className="col-3"></div>
          <div className="col-6">
            <h1 className="display-6 text-center">Let's you sign in!</h1>
            <br />
            <form onSubmit={submitHandler}>
              <label>Username</label>
              <div className="form-group">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="number"
                  name="studentID"
                  value={username}
                  ref={usernameRef}
                  className="form-style"
                  placeholder="Your StudentID"
                  autoComplete="off"
                />
                <i className="input-icon uil uil-at"></i>
              </div>

              <label className="mt-5">Password</label>
              <div className="form-group mt-2">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  ref={passwordRef}
                  className="form-style"
                  placeholder="Your Password"
                  autoComplete="off"
                />
                <i className="input-icon uil uil-lock-alt"></i>
              </div>
              <div className="d-flex flex-column mt-4">
                <LoginButton type="submit">Login Now</LoginButton>
              </div>
            </form>
          </div>

          <div className="col-3 "></div>
        </LoginPanel>
      </div>
    </Wrapper>
  );
};

export default Login;
