import React, { useState, useEffect } from "react";
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
      <AuthBtn>
        <a
          href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/kakao_login_medium_narrow.png`}
          ></img>
        </a>
      </AuthBtn>
      <AuthBtn>
        <a
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&state=${process.env.REACT_APP_NAVER_STATE}`}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/btnG_short.png`}
            style={{ width: "11.5rem", height: "2.5rem" }}
          ></img>
        </a>
      </AuthBtn>
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
  margin-top: 2rem;
  margin-bottom: 1rem;
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

const AuthBtn = styled.div`
  margin-top: 0.5rem;
`;
export default Login;
