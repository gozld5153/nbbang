import React from "react";
import styled from "styled-components";

const MainComponent = () => {
  return (
    <Container>
      <TitleContainer>
        <div>혼자 먹는 빵은 지겨워!</div>
        <div></div>
      </TitleContainer>
      <Description>
        <div>언제까지 혼자 먹을꺼야?</div>
        <div>같이 먹자</div> <div>N빵!</div>
      </Description>
    </Container>
  );
};

export default MainComponent;

const Container = styled.div`
  width: 100%;
  height: 54.95rem;
  margin: 1rem auto;
  display: flex;
  color: #35353d;
  border-bottom: 2px solid #2e3032;
`;

const TitleContainer = styled.div`
  flex: 60%;
  display: flex;
  flex-direction: column;

  > :nth-child(1) {
    display: grid;
    place-items: center;
    flex: 30%;
    font-size: 3rem;
    font-weight: bold;
  }
  > :nth-child(2) {
    flex: 70%;
    background-image: url(${`${process.env.PUBLIC_URL}/images/bbang.png`});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const Description = styled.div`
  flex: 40%;
  font-size: 2rem;
  font-weight: 500;
  display: grid;
  place-items: center;
  > :nth-child(3) {
    font-size: 5rem;
    font-weight: bold;
  }
`;
