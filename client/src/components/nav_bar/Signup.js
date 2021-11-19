import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { FcCheckmark } from "react-icons/fc";

const Signup = ({ handleSignAndLogin, isOn }) => {
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

  const [showErr, setShowErr] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleInputValue = (key) => (e) => {
    if (key === "email") {
      if (/^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+$/.test(e.target.value)) {
        setSignupInfo({
          ...signupInfo,
          [key]: e.target.value,
        });
        setShowErr("");
        setErrMsg({ ...errMsg, [key]: null });
      } else {
        setErrMsg({
          ...errMsg,
          [key]: `It's not an email`,
        });
      }
    }

    if (key === "password") {
      if (/^[^\s]{4,16}$/.test(e.target.value)) {
        setSignupInfo({
          ...signupInfo,
          [key]: e.target.value,
        });
        setShowErr("");
        setErrMsg({ ...errMsg, [key]: null });
      } else {
        setErrMsg({
          ...errMsg,
          [key]: "Please write the password in 4 to 16 letters",
        });
      }
    }

    if (key === "username") {
      if (/^[A-Za-z0-9]{2,8}$/.test(e.target.value)) {
        setSignupInfo({
          ...signupInfo,
          [key]: e.target.value,
        });
        setShowErr("");
        setErrMsg({ ...errMsg, [key]: null });
      } else {
        setErrMsg({
          ...errMsg,
          [key]:
            "Please write the username in 2 to 10 English and Numerical Characters",
        });
      }
    }
  };

  const handleCheckEmail = () => {
    //todo axios 통신요청
    if (errMsg.email === null) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/users/duplication`, {
          email: signupInfo.email,
        })
        .then((data) => {
          console.log(data);
          setIsChecked(true);
        })
        .catch((err) => {
          console.log(err.response);
          setIsChecked(false);
          setShowErr("It's a duplicate email.");
        });
    }
  };

  const handleSingup = () => {
    if (errMsg.email === "" || errMsg.password === "" || errMsg.username === "")
      return setShowErr("Please enter information");
    if (errMsg.email !== null) return setShowErr(errMsg.email);
    if (isChecked === false) return setShowErr("Check the email duplicate");
    if (errMsg.password !== null) return setShowErr(errMsg.password);
    if (errMsg.username !== null) return setShowErr(errMsg.username);

    //todo axios 통신요청
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/signup`, signupInfo)
      .then((data) => handleSignAndLogin())
      .catch((err) => console.log(err));
  };

  return (
    <Container isOn={isOn}>
      <div>Create Account</div>

      <div>
        <input
          type="text"
          placeholder="email"
          onChange={handleInputValue("email")}
        ></input>
        <button onClick={handleCheckEmail}>중복확인</button>
        {isChecked ? (
          // || signupInfo.email === ""
          <div>
            <FcCheckmark />
          </div>
        ) : null}
      </div>

      <input
        type="password"
        placeholder="password"
        onChange={handleInputValue("password")}
      ></input>

      <input
        type="text"
        placeholder="username"
        onChange={handleInputValue("username")}
      ></input>

      <ErrBox>
        <SignupBtn onClick={handleSingup}>Sign up</SignupBtn>
        <ErrMsg showErr={showErr}>{showErr}</ErrMsg>
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
  background-color: #efefef;
  color: #222222;
  > :nth-child(1) {
    font-weight: bold;
    font-size: 3rem;
    margin-bottom: 4rem;
    letter-spacing: 0.1rem;
  }
  input {
    width: 20rem;
    height: 3rem;
    letter-spacing: 0.05rem;
    font-size: 1rem;
    font-family: "Anton", sans-serif;
    background-color: #f3f3f4;
    margin: 0.5rem;
    z-index: 0;
    border: 1px solid gray;
    padding: 0 0.5rem;
  }

  input:focus {
    border: 1px solid black;
  }

  & > :nth-child(2) {
    position: relative;
    button {
      font-family: "Noto Sans KR", sans-serif;
      position: absolute;
      width: 4rem;
      height: 2.8rem;
      /* font-size: 0.9rem; */
      font-weight: 600;
      margin-top: 0.5rem;
      background-color: #222222;
      color: #efefef;
      &:hover {
        font-weight: bold;
      }
    }
    div {
      width: 2.2rem;
      height: 2.2rem;
      position: absolute;
      display: grid;
      place-content: center;
      right: 0.8rem;
      top: 0.8rem;
      border: 1px solid green;
      border-radius: 50%;
      color: green;
      font-size: 1.2rem;
    }
  }
`;

const SignupBtn = styled.button`
  font-family: "Anton", sans-serif;
  background-color: #222222;
  color: #efefef;
  height: 3rem;
  width: 5rem;
  /* border-radius: 0.5rem; */
  margin-top: 3rem;
  font-size: 1.2rem;
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
  position: absolute;
  transition: all 0.5s linear;
  top: ${({ showErr }) => (showErr ? 0 : "0.4rem")};
  opacity: ${({ showErr }) => (showErr ? 1 : 0)};
  white-space: nowrap;
`;
export default Signup;
