import React from "react";
import styled from "styled-components";

export default function Goal({ goalInfo }) {
  const {
    goal_name,
    important,
    deadline,
    agreement,
    file,
    coments,
    id,
    user_id,
  } = goalInfo;

  const importantText = ['사소','보통','중요']

  return (
    <Container>
      <ImportantText>{importantText[important-1]}</ImportantText>
      <GoalName>
        {goal_name}
      </GoalName>
      <DetailContainer>
        <ButtonContainer>
          <IconContainer><Icon src={`${process.env.PUBLIC_URL}/images/agreeDisable.png`} /></IconContainer>
          <IconContainer><Icon src={`${process.env.PUBLIC_URL}/images/comments.png`} />{coments.length}</IconContainer>
          <IconContainer><Icon src={`${process.env.PUBLIC_URL}/images/clip.png`} />{file.length}</IconContainer>
        </ButtonContainer>
        <Deadline>
          {deadline}
        </Deadline>
      </DetailContainer>
    </Container>
  )
}

const Container = styled.div`
  display:flex;
  flex-direction:column;
  height: 10rem;
`;

const ImportantText = styled.div`
`;

const GoalName = styled.div`
`;

const DetailContainer = styled.div`
  display:flex;
  justify-content:space-between;
`;
const ButtonContainer = styled.div`
  display:flex;
`;
const IconContainer = styled.div`
`;
const Icon = styled.img`
  width:1rem;
`;

const Deadline = styled.div`
`;
