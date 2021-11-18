import React from "react";
import styled from "styled-components";

const AsideSignup = ({ handleSignAndLogin, isOn }) => {
  return (
    <AsideContainer isOn={isOn}>
      <div>Welcome Back!</div>
      <div>To keep connected with us please</div>
      <div>login with your personal info</div>
      <SignupBtn onClick={handleSignAndLogin}>Login</SignupBtn>
    </AsideContainer>
  );
};

const SignupBtn = styled.button`
  font-family: "Anton", sans-serif;
  background-color: #f3f3f4;
  margin-top: 4rem;
  height: 3rem;
  width: 5rem;
  font-size: 1.2rem;
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
  position: relative;
  z-index: 10;
  color: #ffffff;
  background-color: #222222;

  letter-spacing: 0.1rem;
  font-size: 1rem;
  transition: all 0.5s linear;
  left: ${(props) => (props.isOn ? "50%" : "0")};
  > :nth-child(1) {
    font-size: 3rem;
    margin-bottom: 8rem;

    font-weight: bold;
  }
  > :nth-child(2) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  > :nth-child(3) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;
export default AsideSignup;
