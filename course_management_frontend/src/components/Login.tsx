/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { login } from "../api/authservice";
import AuthContext from "../auth/AuthProvider";
import { FaInfoCircle } from "react-icons/fa";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import background from "../Images/login_background.svg";

const Wrapper = styled.div`
  height: calc(100vh - 85px);
`;

const Content = styled.div`
  height: 100%;
`;

const LoginPanel = styled.div`
  background-color: var(--main-color);
  color: var(--text-color);
  padding-top: 100px;
  padding-left: 40px;
  padding-right: 40px;

  .instructions {
    font-size: 16px;
    letter-spacing: 0.5px;
    border-radius: 0.5rem;
    background: #000;
    color: #fff;
    padding: 0.5rem;
    position: relative;
    bottom: -10px;
  }

  .offscreen {
    position: absolute;
    left: -9999px;
  }

  .hide {
    display: none;
  }

  .valid {
    color: limegreen;
    margin-left: 0.25rem;
  }

  .invalid {
    color: red;
    margin-left: 0.25rem;
  }

  .instructions > svg {
    margin-right: 0.25rem;
  }

  .errmsg {
    background-color: lightpink;
    color: firebrick;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

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
    font-size: 16px;
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
  const navigate = useNavigate();
  const location = useLocation();

  const USER_REGEX = /^[0-9]{8}$/;
  const PWD_REGEX = /^(?!.*\s).{8,24}$/;

  const { auth, setAuth } = useContext(AuthContext);
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const [validName, setValidUsername] = useState<boolean>(false);
  const [userFocus, setUserFocus] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);

  const submitHandler = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      console.log(response.data.token);
      setAuth({
        username: username,
        password: password,
        token: response.data.token,
      });
      alert("You're succesfully signed in !");
      navigate("/dashboard");
    } catch (error) {
      setError(JSON.stringify(error));
      console.log(error);
    }
  };

  useEffect(() => {
    setError("");
  }, [username, password]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (usernameRef.current != null) {
      usernameRef.current.focus();
    }
    if (auth)
      navigate("/dashboard", { state: { from: location }, replace: true });
  }, []);

  return (
    <Wrapper className="container-fluid p-0">
      <Content className="row m-0">
        <div className="col-md-6 d-none d-md-block p-5  text-center">
          <img className="mw-100" src={background} alt="" />
        </div>

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
                  type="text"
                  name="studentID"
                  value={username}
                  ref={usernameRef}
                  className="form-style"
                  placeholder="Your StudentID"
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  autoComplete="off"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <i className="input-icon uil uil-at"></i>
                <p
                  id="uidnote"
                  className={
                    userFocus && username && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FaInfoCircle></FaInfoCircle>
                  Only 8 character.
                  <br />
                  Having format: 21xxxxxx, 20xxxxxx,...
                  <br />
                  Only input number, no text included.
                </p>
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
                  aria-invalid={validPassword ? "false" : "true"}
                  aria-describedby="passwordnote"
                  autoComplete="off"
                  onFocus={() => setPasswordFocus(true)}
                  onBlur={() => setPasswordFocus(false)}
                />
                <i className="input-icon uil uil-lock-alt"></i>
                <p
                  id="passwordnote"
                  className={
                    passwordFocus && password && !validPassword
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FaInfoCircle></FaInfoCircle>
                  8 to 24 characters.
                  <br />
                  Do not contains blank space.
                  <br />
                </p>
              </div>
              <div className="d-flex flex-column mt-4">
                <LoginButton type="submit">Login Now</LoginButton>
              </div>
            </form>
          </div>

          <div className="col-3 "></div>
        </LoginPanel>
      </Content>
    </Wrapper>
  );
};

export default Login;
