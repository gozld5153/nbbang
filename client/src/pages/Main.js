import styled, { keyframes } from "styled-components";
import TotalModal from "../components/nav_bar/TotalModal";
import Nav from "../components/nav_bar/Nav";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Main() {
  const [isModal, setIsModal] = useState(false);
  const [signAndLogin, setSignAndLogin] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isMypage, setIsMypage] = useState(false);

  const handleNavbar = () => {
    setIsLogin(true);
    setIsModal(!isModal);
  };

  const handleSignAndLogin = () => {
    if (signAndLogin === "login") {
      setSignAndLogin("signup");
    } else {
      setSignAndLogin("login");
    }
  };

  const handleModal = (e) => {
    if (e.target.innerHTML === "Login") {
      setSignAndLogin("login");
    } else {
      setSignAndLogin("signup");
    }
    setIsModal(!isModal);
  };

  const handleMypage = () => {
    setIsMypage(!isMypage);
  };

  // 토큰이 유효하면 로그인 상태 유지 아니면 로그아웃
  // useEffect(async () => {

  //   }
  // }, []);

  return (
    <BrowserRouter>
      <Container>
        <Nav
          handleModal={handleModal}
          isLogin={isLogin}
          handleMypage={handleMypage}
        />
        {isModal ? (
          <TotalModal
            handleModal={handleModal}
            handleSignAndLogin={handleSignAndLogin}
            signAndLogin={signAndLogin}
            handleNavbar={handleNavbar}
          ></TotalModal>
        ) : (
          <>
            <div>작업중입니다.</div>
            <MiniMypage
              className={isMypage ? "add" : "hide"}
              isMypage={isMypage}
            >
              테스트중
            </MiniMypage>
          </>
        )}
      </Container>
    </BrowserRouter>
  );
}
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
  height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const MiniMypage = styled.div`
  position: absolute;
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
