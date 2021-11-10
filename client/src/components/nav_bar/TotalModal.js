import styled from "styled-components";
import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import AsideLogin from "./AsideLogin";
import AsideSignup from "./AsideSignup";
import { useState } from "react";
const TotalModal = ({ handleModal, handleSignAndLogin, signAndLogin }) => {
  return (
    <Modal onClick={handleModal}>
      <ContainerSign onClick={(e) => e.stopPropagation()}>
        <LoginContainer>
          {signAndLogin === "signup" ? (
            <AsideSignup handleSignAndLogin={handleSignAndLogin} />
          ) : (
            <Login />
          )}
        </LoginContainer>
        <SignupContainer>
          {signAndLogin === "login" ? (
            <AsideLogin handleSignAndLogin={handleSignAndLogin} />
          ) : (
            <Signup handleSignAndLogin={handleSignAndLogin} />
          )}
        </SignupContainer>
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
  background-color: #ffffff;
  display: flex;
`;

const LoginContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
`;

const SignupContainer = styled.div`
  background-color: #ffffff;
  width: 100%;
`;
export default TotalModal;
