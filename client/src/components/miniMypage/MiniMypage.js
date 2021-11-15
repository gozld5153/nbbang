import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import MiniProject from "./MiniProject";
import ResultProject from "./ResultProject";
import styled, { keyframes } from "styled-components";

const MiniMypage = ({ userInfo, isMypage, userData }) => {
  const [progress, setProgress] = useState([]);
  const [complete, setComplete] = useState([]);
  const [progressMembers, setProgressMember] = useState([]);
  const [completeMembers, setCompleteMember] = useState([]);
  useEffect(() => {
    let newProgress = [];
    let newComplete = [];
    let newProgressMembers = [];
    let newCompleteMembers = [];

    if (
      userData.data.progress.length === 0 &&
      userData.data.complete.length === 0
    ) {
      return;
    } else if (
      userData.data.progress.length === 0 &&
      userData.data.complete.length !== 0
    ) {
      for (let i = 0; i < 3; i++) {
        newComplete.push(userData.data.complete[i].projectName);
        newCompleteMembers.push(userData.data.complete[i].members);
      }
    } else if (
      userData.data.progress.length !== 0 &&
      userData.data.complete.length === 0
    ) {
      for (let i = 0; i < 3; i++) {
        newProgress.push(userData.data.progress[i].projectName);
        newProgressMembers.push(userData.data.progres[i].members);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        newProgress.push(userData.data.progress[i].projectName);
        newComplete.push(userData.data.complete[i].projectName);
        newProgressMembers.push(userData.data.progres[i].members);
        newCompleteMembers.push(userData.data.complete[i].members);
      }
    }

    setProgress(newProgress);
    setComplete(newComplete);
    setProgressMember(newProgressMembers);
    setCompleteMember(newCompleteMembers);
  }, []);
  return (
    <Container className={isMypage ? "add" : "hide"} isMypage={isMypage}>
      <MiniContainer>
        <UserInfo userInfo={userInfo} />
        <MiniProject progress={progress} members={progressMembers} />
        <ResultProject complete={complete} members={completeMembers} />
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
  z-index: 990;
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
