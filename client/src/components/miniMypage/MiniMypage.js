import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import MiniProject from "./MiniProject";
import ResultProject from "./ResultProject";
import styled, { keyframes } from "styled-components";

const MiniMypage = ({
  userInfo,
  isMypage,
  userData,
  handleMypage,
  invited,
  handleInvitedList,
  preview,
}) => {
  const [progress, setProgress] = useState([]);
  const [complete, setComplete] = useState([]);
  const [progressMembers, setProgressMember] = useState([]);
  const [completeMembers, setCompleteMember] = useState([]);
  useEffect(() => {
    // console.log(userData);
    let userDataClone = { ...userData };
    let newProgress = [];
    let newComplete = [];
    let newProgressMembers = [];
    let newCompleteMembers = [];

    if (!userDataClone.data.progress && !userDataClone.data.complete) {
      return;
    } else if (
      !userDataClone.data.progress.length &&
      userDataClone.data.complete !== 0
    ) {
      for (let i = 0; i < 3; i++) {
        if (userDataClone.data.complete.length <= i) continue;
        newComplete.push(userDataClone.data.complete[i].projectName);
        newCompleteMembers.push(userDataClone.data.complete[i].members);
      }
    } else if (
      userDataClone.data.progress.length !== 0 &&
      !userDataClone.data.complete
    ) {
      for (let i = 0; i < 3; i++) {
        if (userDataClone.data.progress.length <= i) continue;
        newProgress.push(userDataClone.data.progress[i].projectName);
        newProgressMembers.push(userDataClone.data.progress[i].members);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        if (userDataClone.data.complete.length > i) {
          newComplete.push(userDataClone.data.complete[i].projectName);
          newCompleteMembers.push(userDataClone.data.complete[i].members);
        }
        if (userDataClone.data.progress.length > i) {
          newProgress.push(userDataClone.data.progress[i].projectName);
          newProgressMembers.push(userDataClone.data.progress[i].members);
        }
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
        <UserInfo
          userInfo={userInfo}
          handleMypage={handleMypage}
          invited={invited}
          handleInvitedList={handleInvitedList}
          preview={preview}
        />
        <MiniProject
          progress={progress}
          members={progressMembers}
          handleMypage={handleMypage}
        />
        <ResultProject
          complete={complete}
          members={completeMembers}
          handleMypage={handleMypage}
        />
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
