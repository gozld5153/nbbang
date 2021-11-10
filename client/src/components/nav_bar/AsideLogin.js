import React from "react";
import styled from "styled-components";

const AsideLogin = ({ handleSignAndLogin }) => {
  return (
    <AsideContainer>
      <div>Hello, Friend!</div>
      <div>enter your personal details</div>
      <div>and start journey with us</div>
      <SignupBtn onClick={handleSignAndLogin}>Sign up</SignupBtn>
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
export default AsideLogin;
