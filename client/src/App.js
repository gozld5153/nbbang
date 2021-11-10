import React from "react";
import styled from "styled-components";
import Project from './pages/Project'

export default function App() {
  return (
    <Container>
      <Project/>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
  display:flex;
  flex-direction:column;
  width: 100vw;
  min-height: 100vh;
`;