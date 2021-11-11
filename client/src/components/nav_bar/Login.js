import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Login = ({ handleNavbar }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");

  const handleValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = () => {
    if (!loginInfo.email || !loginInfo.password) {
      setErrMsg("정보를 입력하세요!");
    } else {
      //todo axios 통신요청
      axios //`${process.env.API_URL}/users/signin`
        .post(`http://localhost:80/users/signin`, loginInfo, {
          withCredentials: true,
        })
        .then(() => handleNavbar())
        .catch((err) => console.log(err));
    }
  };
  return (
    <Container>
      <div>Sign in to Nbbang</div>
      <input
        type="text"
        placeholder="email"
        onChange={handleValue("email")}
      ></input>
      <input
        type="password"
        placeholder="password"
        onChange={handleValue("password")}
      ></input>
      <div>{errMsg}</div>
      <LoginBtn onClick={handleLogin}>Login</LoginBtn>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > :nth-child(1) {
    font-weight: bold;
    font-size: 3rem;
    margin-bottom: 4rem;
  }
  input {
    background-color: #f3f3f4;
    height: 2rem;
    margin: 0.5rem;
  }
`;

const LoginBtn = styled.button`
  background-color: #f3f3f4;
  margin-right: 2rem;
  height: 2rem;
  width: 4rem;
  border-radius: 0.5rem;
  margin-top: 3rem;
  &:hover {
    background-color: #e1e1e1;
    font-weight: bold;
  }
`;

export default Login;
