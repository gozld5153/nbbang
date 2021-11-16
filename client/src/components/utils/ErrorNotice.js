import React from "react";
import styled from "styled-components";

const ErrorPage = ({ page }) => {
  const whatPage = page === "inprogress" ? "진행중인" : "완료한";
  const whatColor = page === "inprogress" ? "#b6da03" : " #00bfff";
  return (
    <ErrorPageWrapper whatColor={whatColor}>
      <h1>
        <strong>{whatPage}</strong> 프로젝트가 없습니다
      </h1>
      <img src={`${process.env.PUBLIC_URL}/images/nbbang-logo.png`} alt="" />
    </ErrorPageWrapper>
  );
};

const ErrorPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 250px;
  font-size: 4rem;
  h1 {
    text-align: center;
  }
  strong {
    margin-bottom: 30px;
    font-weight: bold;
    color: ${(props) => props.whatColor};
    display: block;
  }

  img {
    width: 300px;
    margin-top: 50px;
    margin-left: 330px;
  }
`;

export default ErrorPage;
