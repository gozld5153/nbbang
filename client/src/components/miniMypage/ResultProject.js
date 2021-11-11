import React from "react";
import styled from "styled-components";

const ResultProject = () => {
  return (
    <Container>
      <div>완료된 프로젝트</div>
      <div>
        <ul>
          <li>프로젝트1</li>
          <li>프로젝트1</li>
        </ul>
      </div>
      <div>
        <span>이전</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>다음</span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  border-bottom: 1px solid #f3f3f4;
  > :nth-child(1) {
    margin: 1rem 0 0 1rem;
  }
  > :nth-child(2) {
    width: 60%;
    margin: 2rem auto 0 auto;
    & li {
      border-bottom: 1px solid #f3f3f4;
      padding: 1rem;
    }
  }
  > :nth-child(3) {
    margin-top: 2rem;
    text-align: center;
    & span {
      margin: 0.5rem;
    }
  }
`;

export default ResultProject;
