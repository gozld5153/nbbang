import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ResultProject = ({ complete, members, handleMypage }) => {
  const navigate = useNavigate();
  const handleMoveMypage = () => {
    navigate("/mypage/project-done");
    handleMypage();
  };
  return (
    <Container>
      {complete.length > 0 ? (
        <>
          <div>완료한 프로젝트</div>
          <div>
            <ul>
              {complete.map((project, idx) => (
                <li key={idx} onClick={handleMoveMypage}>
                  <p>{project}</p>
                  {members[idx].map((name, idx) => (
                    <span key={idx}>{name.username} &nbsp;</span>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>완료한 프로젝트가 없습니다.</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  border-bottom: 2px solid #2e3032;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > :nth-child(1) {
    font-weight: bold;
    font-size: 2rem;
    color: #2e3032;
  }
  > :nth-child(2) {
    width: 80%;
    margin: 1rem auto 0 auto;
    & li {
      cursor: pointer;
      color: #2e3032;
      font-weight: 500;
      border-bottom: 1px solid #2e3032;
      padding: 1rem 1rem 0.5rem 1rem;
      display: flex;
      justify-content: space-between;
      &:hover {
        font-weight: bold;
      }
      > p {
        margin-bottom: 0.5rem;
      }
    }
  }
`;

export default ResultProject;
