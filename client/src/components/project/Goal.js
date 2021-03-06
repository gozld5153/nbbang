import React from "react";
import styled from "styled-components";

export default function Goal({ goalInfo, member, myLike }) {
  // 기능 클리어
  const {
    goalName,
    important,
    deadline,
    Likes,
    state,
    Files,
    Comments,
    id,
    userId,
  } = goalInfo;

  const importantText = ["사소", "보통", "중요"];
  const colorpick = () => {
    if (member.filter((el) => el.id === userId)[0]) {
      return member.filter((el) => el.id === userId)[0].color;
    }
  };
  return (
    <Container color={colorpick()}>
      <ImportantText state={importantText[important - 1]}>
        {importantText[important - 1]}
      </ImportantText>
      <GoalName>{goalName}</GoalName>
      <DetailContainer>
        <ButtonContainer>
          {state !== "todo" ? (
            <>
              <IconContainer>
                <Icon
                  src={
                    Likes >= member.length / 2
                      ? `${process.env.PUBLIC_URL}/images/agreeClear.png`
                      : myLike.includes(id)
                      ? `${process.env.PUBLIC_URL}/images/agreeActive.png`
                      : `${process.env.PUBLIC_URL}/images/agreeDisable.png`
                  }
                />
                {Likes}
              </IconContainer>
              <IconContainer>
                <Icon src={`${process.env.PUBLIC_URL}/images/comments.png`} />
                {Comments}
              </IconContainer>
              <IconContainer>
                <Icon src={`${process.env.PUBLIC_URL}/images/clip.png`} />
                {Files}
              </IconContainer>
            </>
          ) : null}
        </ButtonContainer>
        <Deadline>{deadline}</Deadline>
      </DetailContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.3rem;
  border-bottom: ${(props) => `0.2rem solid ${props.color}`};
  padding: 0.5rem;
  cursor: pointer;
`;

const ImportantText = styled.div`
  color: ${(props) => (props.state === "중요" ? "red" : "black")};
  font-weight: 600;
  margin-left: 0.5rem;
`;

const GoalName = styled.div`
  font-size: 2.6rem;
  font-family: Architects + Daughter;
  font-weight: 600;
  margin-bottom: 0.7rem;
`;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 0.5rem;
`;
const ButtonContainer = styled.div`
  display: flex;
`;
const IconContainer = styled.div``;
const Icon = styled.img`
  position: relative;
  top: 0.1rem;
  width: 1rem;
  margin-left: 0.2rem;
`;

const Deadline = styled.div`
  position: relative;
  top: 0.2rem;
`;
