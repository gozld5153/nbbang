import Nav from "../components/Nav";
import styled from "styled-components";
import TotalModal from "../components/TotalModal";
import { useState } from "react";

export default function Main() {
  const Main = styled.div`
    height: 100vh;
  `;

  const [isModal, setIsModal] = useState(false);
  const [signAndLogin, setSignAndLogin] = useState("");

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

  return (
    <Main>
      <Nav handleModal={handleModal} />
      {isModal ? (
        <TotalModal
          handleModal={handleModal}
          handleSignAndLogin={handleSignAndLogin}
          signAndLogin={signAndLogin}
        ></TotalModal>
      ) : (
        <div>작업중입니다.</div>
      )}
    </Main>
  );
}
