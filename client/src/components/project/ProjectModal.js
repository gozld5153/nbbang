import React from "react";
import styled from "styled-components";

export default function ProjectModal({ isProjectOpen }) {
  return (
    <Container isProjectOpen={isProjectOpen}>
      <ModalContainer>
        프로젝트 이름 변경
        프로젝트 마감 기한 변경
        팀장 변경
        프로젝트 팀 초대
      </ModalContainer>
    </Container>
  )
}

const Container = styled.div`
  position:absolute;
  top:0;
  display:${(props) => props.isProjectOpen ? 'flex' : 'none' };
  justify-content:center;
  align-items:center;
  width:100vw;
  height:100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContainer = styled.div`
  display:flex;
  flex-direction:column;
  width:50vw;
  height: 50vh;
  border:1px solid black;
  background-color:white;
`