import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import axios from "axios";
import { BsMailbox2 } from "react-icons/bs";
import { GiExitDoor } from "react-icons/gi";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const UserInfo = ({
  userInfo,
  handleMypage,
  invited,
  handleInvitedList,
  preview,
}) => {
  const navigate = useNavigate();
  const [changeForm, setChangeForm] = useState(false);
  const handleMoveMypage = () => {
    navigate("/mypage/profile");
    handleMypage();
  };

  const handleInvited = () => {
    setChangeForm(!changeForm);
  };

  const handleAcceptInvite = (obj) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/project/addmember/${obj.projectId}/${userInfo.id}`,
        {
          color: obj.color,
        }
      )
      .then(() => handleInvitedList())
      .catch((err) => console.log(err.response));
  };
  const handleRejectInvite = (obj) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/invite/${obj.inviteId}`)
      .then(() => handleInvitedList())
      .catch((err) => console.log(err.response));
  };

  return (
    <Container>
      {changeForm ? (
        <>
          <InviteBtn onClick={handleInvited}>
            <GiExitDoor size="40px" />
          </InviteBtn>
          <InviteContainer>
            {!invited.data || invited.data.length === 0 ? (
              <MsgDiv>받은 초대가 없습니다.</MsgDiv>
            ) : (
              <InviteListBox>
                {invited.data.map((obj) => {
                  return (
                    <div>
                      {obj.captainName} 님이 당신을 초대하였습니다.
                      <button onClick={() => handleAcceptInvite(obj)}>
                        <AiFillCheckCircle size="1.2rem" />
                      </button>
                      <button onClick={() => handleRejectInvite(obj)}>
                        <AiFillCloseCircle size="1.2rem" />
                      </button>
                    </div>
                  );
                })}
              </InviteListBox>
            )}
          </InviteContainer>
        </>
      ) : (
        <>
          <InviteBtn onClick={handleInvited}>
            <BsMailbox2 size="40px" />
          </InviteBtn>
          {!invited.data || invited.data.length === 0 ? null : (
            <NumberOfInvite>{invited.data.length}</NumberOfInvite>
          )}
          <ImgContainer onClick={handleMoveMypage}>
            <img src={preview} alt="" />
          </ImgContainer>
          <UserInfoContainer>
            <div>
              <div>{userInfo.username}</div>
            </div>
            <div>
              <div>{userInfo.email}</div>
            </div>
          </UserInfoContainer>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border-bottom: solid 2px #2e3032;
  padding-left: 2rem;
  color: #2e3032;
  &:hover {
    background: #ddd;
  }
`;
const ImgContainer = styled.div`
  flex-shrink: 0;
  text-align: center;
  height: 100px;
  width: 100px;
  /* background-color: #191123; */
  border-radius: 50%;
  margin: 0 1rem 0 1rem;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 50%;
  }
`;
const UserInfoContainer = styled.div`
  width: 100%;
  > div {
    word-break: break-all;
    margin: 1rem;
    font-weight: bold;
    font-size: 1.3rem;
  }

  div:nth-of-type(2) {
    font-style: italic;
    color: gray;
  }
`;

const InviteBtn = styled.button`
  position: absolute;
  top: 1.3rem;
  right: 4.5rem;
`;

const NumberOfInvite = styled.div`
  position: absolute;
  top: 1.55rem;
  right: 1rem;
  width: 2.5rem;
  height: 2rem;
  text-align: center;
  line-height: 2rem;
  color: #efefef;
  font-family: "Anton", sans-serif;
  background-color: red;
  border-radius: 10px;
  &::before {
    z-index: -1;
    content: "";
    position: absolute;
    left: -4px;
    bottom: 7px;
    display: block;
    width: 1rem;
    height: 1rem;
    background-color: red;
    transform: rotate(45deg);
  }
`;

const InviteContainer = styled.div`
  position: relative;
`;
const MsgDiv = styled.div`
  font-weight: bold;
  font-size: 2rem;
  color: #2e3032;
`;

const InviteListBox = styled.div`
  position: absolute;
  height: 120px;
  width: 450px;
  overflow: auto;
  top: 20px;
  left: 50%;
  transform: translate(-50%, -50%);
  > div {
    margin: 0.5rem;
    font-size: 1.2rem;
    font-weight: 500;
    > button {
      margin-left: 0.5rem;
    }
  }
`;
export default UserInfo;
