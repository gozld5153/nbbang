import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Signup = ({ handleSignAndLogin }) => {
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [errMsg, setErrMsg] = useState({
    email: "",
    password: "",
    username: "",
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

    if (key === "username") {
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
    if (errMsg.email === null) {
      axios //`${process.env.API_URL}/users/duplication`
        .post(`${process.env.API_URL}/users/duplication`, {
          email: signupInfo.email,
        })
        .then(() => setIsChecked(true))
        .catch((err) => setIsChecked(false));
    }
  };

  const handleSingup = () => {
    if (
      errMsg.email !== null ||
      errMsg.password !== null ||
      errMsg.username !== null
    ) {
      console.log("돌아가!");
      return;
    } else {
      //todo axios 통신요청
      axios
        .post(`${process.env.API_URL}/users/signup`, signupInfo)
        .then((data) => handleSignAndLogin())
        .catch((err) => console.log(err));
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
        {isChecked || signupInfo.email === "" ? null : (
          <div>
            <p>X</p>
          </div>
        )}
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
        placeholder="username"
        onChange={handleInputValue("username")}
      ></input>

      {errMsg.username === "2자이상 10자이하로 작성해주세요." ? (
        <div>{errMsg.username}</div>
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
    div {
      width: 1.5rem;
      height: 1.5rem;
      position: absolute;
      display: grid;
      place-content: center;
      right: 0.8rem;
      top: 0.8rem;
      border: 1px solid red;
      border-radius: 50%;
      color: red;
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
