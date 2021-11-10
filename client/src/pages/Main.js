import styled from "styled-components";
import TotalModal from "../components/nav_bar/TotalModal";
import Nav from "../components/nav_bar/Nav";
import { useState, useEffect } from "react";

export default function Main() {
  const Main = styled.div`
    height: 100vh;
  `;

  const [isModal, setIsModal] = useState(false);
  const [signAndLogin, setSignAndLogin] = useState("");
  const [isLogin, setIsLogin] = useState(false);

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

  useEffect(() => {
    if (document.cookie) {
      setIsLogin(true);
    }
  }, []);

  return (
    <Main>
      <Nav handleModal={handleModal} isLogin={isLogin} />
      {isModal ? (
        <TotalModal
          handleModal={handleModal}
          handleSignAndLogin={handleSignAndLogin}
          signAndLogin={signAndLogin}
          handleNavbar={handleNavbar}
        ></TotalModal>
      ) : (
        <div>작업중입니다.</div>
      )}
    </Main>
  );
}
