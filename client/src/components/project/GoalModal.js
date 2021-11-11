import React from "react";
import styled from "styled-components";

export default function GoalModal() {
  return (
    <Container>
      <ModalContainer></ModalContainer>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  display: ${(props) => (true ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 50vh;
  border: 1px solid black;
  background-color: white;
`;
