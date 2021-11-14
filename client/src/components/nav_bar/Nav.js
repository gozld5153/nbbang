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
            <LoginBtn isLogin={isLogin}>Project</LoginBtn>
            <LoginBtn isLogin={isLogin} onClick={handleMypage}>
              My Page
            </LoginBtn>
            <LoginBtn onClick={handleLogout}>Logout</LoginBtn>
          </>
        ) : (
          <>
            <LoginBtn onClick={handleModal} isLogin={isLogin}>
              <BigWrapper>
                <Wrapper>
                  <Text>Login</Text>
                  <Text>Login</Text>
                  <Text>Login</Text>
                </Wrapper>
              </BigWrapper>
            </LoginBtn>
            <LoginBtn onClick={handleModal} isLogin={isLogin}>
              <BigWrapper>
                <Wrapper>
                  <Text>Sign up</Text>
                  <Text>Sign up</Text>
                  <Text>Sign up</Text>
                </Wrapper>
              </BigWrapper>
            </LoginBtn>
          </>
        )}
      </ContainerBtn>
    </NavBar>
  );
}

const BigWrapper = styled.div`
  display: flex;
  height: inherit;
  overflow: hidden;
`;
const Wrapper = styled.div`
  display: inherit;
  align-items: center;
  position: relative;

  &:hover {
    animation-name: slideMoving;
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-direction: normal;
    animation-iteration-count: infinite;
  }

  @keyframes slideMoving {
    0% {
      left: 0;
    }
    100% {
      left: -100%;
    }
  }
`;
const Text = styled.div`
  text-align: center;
  width: 9.25rem;
  flex-shrink: 0;
`;

const NavBar = styled.div`
  background-color: #f6f2f1;
  position: sticky;
  height: 6rem;
  width: 100%;
  display: flex;
  border-bottom: 5px solid black;
  z-index: ${({ isModal }) => (isModal ? 0 : 1000)};
  top: 0;
`;

const Logo = styled.img`
  width: 13%;
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

const LoginBtn = styled.div`
  height: 100%;
  font-family: "Anton", sans-serif;
  font-size: 1.5rem;
  border-left: 2px solid black;
  width: ${(props) => {
    return props.isLogin ? "10rem" : "150px";
  }};
  display: flex;
`;

