import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const UserInfo = ({ userInfo, handleMypage }) => {
  const navigate = useNavigate();
  const handleMoveMypage = () => {
    navigate("/mypage/profile");
    handleMypage();
  };
  return (
    <Container>
      <div onClick={handleMoveMypage}>
        <img src={`${process.env.PUBLIC_URL}/images/bbang.png`} alt="" />
      </div>
      <div>
        <div>
          <div>{userInfo.username}</div>
        </div>
        <div>
          <div>{userInfo.email}</div>
        </div>
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
  border-bottom: solid 2px #2e3032;
  color: #2e3032;

  > :nth-child(1) {
    flex-shrink: 0;
    text-align: center;
    height: 150px;
    width: 150px;
    background-color: #191123;
    border-radius: 50%;
    margin: 0 1rem 0 1rem;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  > :nth-child(2) {
    width: 100%;
    > div {
      word-break: break-all;
      margin: 2rem;
      font-weight: bold;
      font-size: 1rem;
    }
  }
`;

export default UserInfo;
