import styled from "styled-components";
import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import AsideLogin from "./AsideLogin";
import AsideSignup from "./AsideSignup";

const TotalModal = ({
  handleModal,
  handleSignAndLogin,
  signAndLogin,
  handleNavbar,
  isOn,
}) => {
  return (
    <Modal onClick={handleModal}>
      <ContainerSign onClick={(e) => e.stopPropagation()}>
        {signAndLogin === "signup" ? (
          <>
            <AsideSignup handleSignAndLogin={handleSignAndLogin} isOn={isOn} />
            <Signup handleSignAndLogin={handleSignAndLogin} />
          </>
        ) : (
          <>
            <Login handleNavbar={handleNavbar} isOn={isOn} />
            <AsideLogin handleSignAndLogin={handleSignAndLogin} isOn={isOn} />
          </>
        )}
      </ContainerSign>
    </Modal>
  );
};

const Modal = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ContainerSign = styled.div`
  width: 70%;
  height: 70%;
  display: flex;
  overflow: hidden;
  border-radius: 20px;
`;

export default TotalModal;
