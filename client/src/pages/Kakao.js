import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled, { keyframes } from "styled-components";
const Kakao = ({ handleNavbar }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get("code");
    console.log(authorizationCode);
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/oauth/kakao`,
        {
          code: authorizationCode,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        navigate("/");
        handleNavbar();
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <Container>
      <TextContainer>Loading...</TextContainer>
      <svg viewBox="-70 -10 200 200">
        <circle cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    </Container>
  );
};

const loadingCircle = keyframes`
0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }

`;

const loadingSpin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
export default Kakao;

const Container = styled.div`
  position: relative;
  &:nth-child(1) {
    animation: ${loadingSpin} 2s linear infinite;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;
  }
  &:nth-child(2) {
    opacity: 0.5;
    stroke: black;
    stroke-linecap: round;
    animation: ${loadingCircle} 1.5s ease-in-out infinite;
  }
`;

const TextContainer = styled.div`
  text-align: center;
  opacity: 1;
  font-size: 12rem;
  margin-top: 2rem;
  font-family: "Anton", sans-serif;
`;
