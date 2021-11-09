import React, { useState } from "react";
import styled from "styled-components";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const [errMsg, setErrMsg] = useState({
    email: "",
    password: "",
    nickname: "",
  });

  const [isChecked, setIsChecked] = useState(false);

  const handleInputValue = (key) => (e) => {
    if (key === "email") {
      if (/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/.test(e.target.value)) {
        setSignupInfo({
          ...signupInfo,
          [key]: e.target.value,
        });
        setErrMsg({ ...errMsg, [key]: null });
      } else {
        setErrMsg({ ...errMsg, [key]: "유효한 이메일형식이 아닙니다." });
      }
    }

    if (key === "password") {
      if (/^[A-Za-z0-9]{4,16}$/.test(e.target.value)) {
        setSignupInfo({
          ...signupInfo,
          [key]: e.target.value,
        });
        setErrMsg({ ...errMsg, [key]: null });
      } else {
        setErrMsg({ ...errMsg, [key]: "4자이상 16자이하로 작성해주세요." });
      }
    }

    if (key === "nickname") {
      if (/^[A-Za-z0-9]{2,8}$/.test(e.target.value)) {
        setSignupInfo({
          ...signupInfo,
          [key]: e.target.value,
        });
        setErrMsg({ ...errMsg, [key]: null });
      } else {
        setErrMsg({ ...errMsg, [key]: "2자이상 10자이하로 작성해주세요." });
      }
    }
  };

  const handleCheckEmail = () => {
    //todo axios 통신요청
  };

  const handleSingup = () => {
    if (errMsg.email || errMsg.password || errMsg.nickname || !isChecked) {
      return;
    } else {
      //todo axios 통신요청
    }
  };

  return (
    <Container>
      <div>Create Account</div>

      <div>
        <input
          type="text"
          placeholder="email"
          onChange={handleInputValue("email")}
        ></input>
        <button onClick={handleCheckEmail}>중복확인</button>
      </div>

      {errMsg.email === "유효한 이메일형식이 아닙니다." ? (
        <div>{errMsg.email}</div>
      ) : null}

      <input
        type="password"
        placeholder="password"
        onChange={handleInputValue("password")}
      ></input>

      {errMsg.password === "4자이상 16자이하로 작성해주세요." ? (
        <div>{errMsg.password}</div>
      ) : null}

      <input
        type="text"
        placeholder="nickname"
        onChange={handleInputValue("nickname")}
      ></input>

      {errMsg.nickname === "2자이상 10자이하로 작성해주세요." ? (
        <div>{errMsg.nickname}</div>
      ) : null}
      <SignupBtn onClick={handleSingup}>Sign up</SignupBtn>
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
  & > :nth-child(2) {
    position: relative;
    button {
      position: absolute;
      width: 4rem;
      height: 2rem;
      margin-top: 0.5rem;
      background-color: #f3f3f4;
      &:hover {
        background-color: #e1e1e1;
        font-weight: bold;
      }
    }
  }
`;

const SignupBtn = styled.button`
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
export default Signup;
