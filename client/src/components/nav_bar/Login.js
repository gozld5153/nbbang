import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Login = ({ handleNavbar, isOn }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const handleValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = (event) => {
    if (!loginInfo.email || !loginInfo.password) {
      setErrMsg("Please enter information");
    } else {
      //todo axios 통신요청
      axios //
        .post(`${process.env.REACT_APP_API_URL}/users/signin`, loginInfo, {
          withCredentials: true,
        })
        .then(() => handleNavbar())
        .catch((err) => console.log(err));
    }
  };
  return (
    <Container isOn={isOn}>
      <div>Sign in to Nbbang</div>
      <input
        type="text"
        placeholder="email"
        onChange={handleValue("email")}
        errMsg={errMsg}
      ></input>
      <input
        type="password"
        placeholder="password"
        onChange={handleValue("password")}
        errMsg={errMsg}
      ></input>

      <ErrBox>
        <LoginBtn onClick={handleLogin}>Login</LoginBtn>
        <ErrMsg errMsg={errMsg}>{errMsg}</ErrMsg>
      </ErrBox>
    </Container>
  );
};

const Container = styled.div`
  font-family: "Anton", sans-serif;
  flex: 0 0 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 0;
  background-color: #eeeeee;
  color: #222222;

  > :nth-child(1) {
    font-weight: bold;
    font-size: 3rem;
    margin-bottom: 4rem;
  }
  input {
    font-family: "Anton", sans-serif;
    z-index: 0;
    background-color: #f3f3f4;
    height: 2rem;
    margin: 0.5rem;
  }
`;

const LoginBtn = styled.button`
  font-family: "Anton", sans-serif;
  background-color: #222222;
  color: #efefef;

  height: 2rem;
  width: 4rem;
  /* border-radius: 0.5rem; */
  margin-top: 3rem;
  &:hover {
    font-weight: bold;
  }
`;

const ErrBox = styled.div`
  position: relative;
  display: flex;
  width: 50%;
  justify-content: center;
`;

const ErrMsg = styled.div`
  top: ${({ errMsg }) => (errMsg ? 0 : "1rem")};
  opacity: ${({ errMsg }) => (errMsg ? 1 : 0)};
  transition: all 0.5s linear;
  position: absolute;
`;

export default Login;
