import React from "react";
import styled from "styled-components";

const AsideLogin = ({ handleSignAndLogin, isOn }) => {
  return (
    <AsideContainer isOn={isOn}>
      <div>Hello, Friend!</div>
      <div>enter your personal details</div>
      <div>and start journey with us</div>
      <SignupBtn onClick={handleSignAndLogin}>Sign up</SignupBtn>
    </AsideContainer>
  );
};

const SignupBtn = styled.button`
  font-family: "Anton", sans-serif;
  background-color: #f3f3f4;
  margin-top: 4rem;
  height: 2rem;
  width: 4rem;
  /* border-radius: 0.5rem; */
  color: #222222;
  &:hover {
    background-color: #e1e1e1;
    font-weight: bold;
  }
`;

const AsideContainer = styled.div`
  font-family: "Anton", sans-serif;
  flex: 0 0 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
  color: #ffffff;
  background-color: #222222;
  transition: all 0.5s linear;
  letter-spacing: 0.1rem;
  font-size: 1rem;
  transform: ${(props) => (props.isOn ? "translateX(-100%)" : "")};
  > :nth-child(1) {
    font-size: 3rem;
    margin-bottom: 4rem;
    font-weight: bold;
  }
  > :nth-child(2) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  > :nth-child(3) {
    font-size: 1.2rem;
  }
`;
export default AsideLogin;
