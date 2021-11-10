import styled, { keyframes } from "styled-components";
import TotalModal from "../components/nav_bar/TotalModal";
import Nav from "../components/nav_bar/Nav";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
=======
>>>>>>> 16df946dacf12ecf4b830e87f13588da3aebd2a4

export default function Main() {
  const [isModal, setIsModal] = useState(false);
  const [signAndLogin, setSignAndLogin] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isMypage, setIsMypage] = useState(false);
  const [switchBtn, setSwitchBtn] = useState(false);

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
    setSwitchBtn(true);
    setIsMypage(!isMypage);
  };

  // 토큰이 유효하면 로그인 상태 유지 아니면 로그아웃
  useEffect(async () => {
    axios
      .post("http://localhost:80/users/signin", null, {
        withCredentials: true,
      })
      .then(() => {
        setIsLogin(true);
      })
      .catch(() => setIsLogin(false));
  }, []);

  return (
    <Container>
      <Nav handleModal={handleModal} isLogin={isLogin} />
      {isModal ? (
        <TotalModal
          handleModal={handleModal}
<<<<<<< HEAD
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
            {switchBtn ? (
              <MiniMypage
                className={isMypage ? "add" : "hide"}
                isMypage={isMypage}
              >
                테스트중
              </MiniMypage>
            ) : null}
          </>
        )}
      </Container>
    </BrowserRouter>
=======
          handleSignAndLogin={handleSignAndLogin}
          signAndLogin={signAndLogin}
          handleNavbar={handleNavbar}
        ></TotalModal>
      ) : (
        <>
          <div>작업중입니다.</div>
          <MiniMypage>테스트중</MiniMypage>
        </>
      )}
    </Container>
>>>>>>> 16df946dacf12ecf4b830e87f13588da3aebd2a4
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
  position: fixed;
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
