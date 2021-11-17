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
  setUpdate,
  update,
  progress,
  complete,
  progressMembers,
  completeMembers,
}) => {
  return (
    <Container className={isMypage ? "add" : "hide"} isMypage={isMypage}>
      <MiniContainer>
        <UserInfo
          userInfo={userInfo}
          handleMypage={handleMypage}
          invited={invited}
          handleInvitedList={handleInvitedList}
        />
        <MiniProject
          progress={progress}
          members={progressMembers}
          handleMypage={handleMypage}
          setUpdate={setUpdate}
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
