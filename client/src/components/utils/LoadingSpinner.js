import React from "react";
import styled, { keyframes } from "styled-components";
const LoadingNotice = () => {
  return (
    <LoadingSpinnerContainer>
      <svg className="loading-circle">
        <circle cx="50%" cy="50%" r="50"></circle>
      </svg>

      <LoadingNoticePhrase>
        <h2>로딩 중 ...</h2>
      </LoadingNoticePhrase>
      <img src={`${process.env.PUBLIC_URL}/images/nbbang-logo.png`} alt="" />
    </LoadingSpinnerContainer>
  );
};

const loadingCircle = keyframes`
0% {
  stroke-dashoffset: 160;
}
75% {
  stroke-dashoffset: -150;
}
100% {
  stroke-dashoffset: -152;
}
`;

const loadingSpin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;
const LoadingSpinnerContainer = styled.div`
  width: 100%;
  height: 81vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    text-align: center;
    font-size: 3rem;
    font-weight: bold;
  }
  .loading-circle {
    animation: ${loadingSpin} 4s infinite;
    width: 200px;
    height: 200px;
  }
  .loading-circle circle {
    stroke: black;
    stroke-width: 8;
    fill: transparent;
    stroke-dasharray: 155;
    stroke-dashoffset: 20;
    animation: ${loadingCircle} 2s infinite;
  }
  img {
    width: 200px;
    margin: 20px auto;
  }
`;

const LoadingNoticePhrase = styled.div`
  width: 100%;
  margin: 20px auto;
`;

export default LoadingNotice;
