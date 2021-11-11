import React from "react";
import styled from "styled-components";

const AsideSignup = ({ handleSignAndLogin }) => {
  return (
    <AsideContainer>
      <div>Welcome Back!</div>
      <div>To keep connected with us please</div>
      <div>login with your personal info</div>
      <SignupBtn onClick={handleSignAndLogin}>Login</SignupBtn>
    </AsideContainer>
  );
};

const SignupBtn = styled.button`
  background-color: #f3f3f4;
  margin-top: 4rem;
  height: 2rem;
  width: 4rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: #e1e1e1;
    font-weight: bold;
  }
`;

const AsideContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > :nth-child(1) {
    font-size: 3rem;
    margin-bottom: 4rem;
    font-weight: bold;
  }
  > :nth-child(2) {
    margin-bottom: 2rem;
  }
`;
export default AsideSignup;
