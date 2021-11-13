import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const UserInfo = ({ userInfo }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div onClick={() => navigate("/mypage/profile")}>
        <img src={`${process.env.PUBLIC_URL}/images/bbang.png`}></img>
      </div>
      <div>
        <div>유저네임: {userInfo.username}</div>
        <div>유저이메일: {userInfo.email}</div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid 2px #f3f3f4;
  > :nth-child(1) {
    /* flex-grow: 1; */
    text-align: center;
    height: 150px;
    width: 150px;
    background-color: red;
    border-radius: 50%;
    margin: 0 2rem 0 2rem;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  > :nth-child(2) {
    /* flex-grow: 1; */
    > div {
      margin: 2rem;
    }
  }
`;

export default UserInfo;
