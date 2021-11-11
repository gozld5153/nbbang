import React from "react";
import UserInfo from "./UserInfo";
import MiniProject from "./MiniProject";
import ResultProject from "./ResultProject";
import styled, { keyframes } from "styled-components";

const MiniMypage = ({ userInfo, isMypage }) => {
  return (
    <Container className={isMypage ? "add" : "hide"} isMypage={isMypage}>
      <MiniContainer>
        <UserInfo userInfo={userInfo} />
        <MiniProject />
        <ResultProject />
      </MiniContainer>
    </Container>
  );
};

export default MiniMypage;

const moveLeft = keyframes`
  0% {
    transform: translateX(0)
  }
  50% {
    transform: translateX(-50%)
  }
  100% {
    transform: translateX(-100%)
  }
`;

const moveHide = keyframes`
  0% {
    transform: translateX(0)
  }
  50% {
    transform: translateX(50%)
  }
  100% {
    transform: translateX(100%)
  }
`;

const Container = styled.div`
  position: fixed;
  height: 93vh;
  width: 30%;

  right: ${(props) => (props.isMypage ? "-30%" : "0")};
  top: 7vh;
  background-color: greenyellow;
  &.hide {
    animation: ${moveHide} 0.4s linear forwards;
  }
  &.add {
    animation: ${moveLeft} 0.4s linear forwards;
  }
`;

const MiniContainer = styled.div`
  width: 100%;
  height: 100%;
  > div {
    height: calc(100% / 3);
  }
  /* > :nth-child(1) {
    background-color: red;
  } */
  > :nth-child(2) {
    /* background-color: blue; */
  }
`;
