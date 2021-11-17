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
      console.log(`${process.env.REACT_APP_API_URL}`);
      axios //
        .post(`${process.env.REACT_APP_API_URL}/users/signin`, loginInfo, {
          withCredentials: true,
        })
        .then(() => handleNavbar())
        .catch((err) => setErrMsg("You are Wrong!!"));
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
      <div>
        <a href="https://kauth.kakao.com/oauth/authorize?client_id=3bcb5ae48e31dacbf58eb8cbcc65a29e&redirect_uri=http://localhost:3000&response_type=code">
          kakao
        </a>
      </div>
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
    letter-spacing: 0.1rem;
  }
  input {
    width: 14rem;
    height: 2rem;
    letter-spacing: 0.05rem;
    font-size: 1rem;
    font-family: "Anton", sans-serif;
    z-index: 0;
    background-color: #f3f3f4;
    height: 2rem;
    margin: 0.5rem;
    border: 1px solid black;
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
