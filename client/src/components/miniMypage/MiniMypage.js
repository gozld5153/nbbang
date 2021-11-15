import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import MiniProject from "./MiniProject";
import ResultProject from "./ResultProject";
import styled, { keyframes } from "styled-components";

const MiniMypage = ({ userInfo, isMypage, userData }) => {
  const [progress, setProgress] = useState([]);
  const [complete, setComplete] = useState([]);
  const [members, setMember] = useState([]);
  useEffect(() => {
    let newProgress = [];
    let newComplete = [];
    let newMembers = [];

    for (let i = 0; i < 3; i++) {
      newProgress.push(userData[i].project_name);
      newComplete.push(userData[i].project_name);
      newMembers.push(userData[i].users);
    }
    setProgress(newProgress);
    setComplete(newComplete);
    setMember(newMembers);
  }, []);
  return (
    <Container className={isMypage ? "add" : "hide"} isMypage={isMypage}>
      <MiniContainer>
        <UserInfo userInfo={userInfo} />
        <MiniProject progress={progress} members={members} />
        <ResultProject complete={complete} members={members} />
      </MiniContainer>
    </Container>
  );
};

export default MiniMypage;

const moveLeft = keyframes`
  0% {
    transform: scaleY(0)
  }
  50% {
    transform: scaleY(50%)
  }
  100% {
    transform: scaleY(100%)
  }
`;

const moveHide = keyframes`
  0% {
    transform: scaleY(100%)
  }
  50% {
    transform: scaleY(50%)
  }
  100% {
    transform: scaleY(0)
  }
`;

const Container = styled.div`
  position: absolute;
  height: 80vh;
  width: 470px;
  transform-origin: top;
  top: 6rem;
  right: 0;
  background-color: #f6f2f1;
  border-left: 4px solid black;
  border-bottom: 3px solid black;
  &.hide {
    animation: ${moveHide} 0.4s linear forwards;
  }
  &.add {
    animation: ${moveLeft} 0.5s linear forwards;
  }
`;

const MiniContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  > :nth-child(1) {
    flex: 30%;
  }
  > :nth-child(2) {
    flex: 35%;
  }
  > :nth-child(3) {
    flex: 35%;
  }
`;
