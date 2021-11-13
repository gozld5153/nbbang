import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { set } from "date-fns/esm";

export default function Nav({
  handleModal,
  isLogin,
  handleMypage,
  handleOffMypage,
  isModal,
}) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/signout`, null, {
        withCredentials: true,
      })
      .then(() => {
        removeCookie("access_token");
        window.location.replace("/");
      });
  };

  return (
    <NavBar isModal={isModal}>
      <Logo
        src={`${process.env.PUBLIC_URL}/images/logo.png`}
        onClick={() => {
          handleOffMypage();
          navigate("/");
        }}
      />
      <ContainerBtn>
        {isLogin ? (
          <>
            <BtnSlideBox isLogin={isLogin}>새 프로젝트</BtnSlideBox>
            <BtnSlideBox isLogin={isLogin} onClick={handleMypage}>
              마이 페이지
            </BtnSlideBox>
            <BtnSlideBox onClick={handleLogout}>Logout</BtnSlideBox>
          </>
        ) : (
          <>
            <BtnSlideBox onClick={handleModal} isLogin={isLogin}>
              Login
            </BtnSlideBox>
            <BtnSlideBox onClick={handleModal} isLogin={isLogin}>
              Sign up
            </BtnSlideBox>
          </>
        )}
      </ContainerBtn>
    </NavBar>
  );
}

const NavBar = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  border-bottom: 5px solid black;
  z-index: ${({ isModal }) => (isModal ? 0 : 1000)};
  top: 0;
  background-color: #ffffff;
`;

const Logo = styled.img`
  width: 20%;
  height: 100%;
  object-fit: fill;
  cursor: pointer;
`;

const ContainerBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const BtnSlideBox = styled.button`
  width: 6.5rem;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-left: 2px solid black;
  /* gap: 2rem; */
`;
