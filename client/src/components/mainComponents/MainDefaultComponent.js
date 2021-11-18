import React, { useState } from "react";
import styled from "styled-components";

export default function MainDefaultComponent({
  title,
  numberColor,
  backgroundColor,
  imageArr,
  underText,
  idx,
}) {
  const [page, setPage] = useState(0);
  const handlePage = (direction) => {
    if (direction === "up" && page !== 0) {
      setPage(page - 1);
    }
    if (direction === "down" && page !== imageArr.length - 1) {
      setPage(page + 1);
    }
  };
  return (
    <Container>
      <ContentContainer>
        <ContentFrame backgroundColor={backgroundColor}>
          <NumberComponent numberColor={numberColor}>0{idx}</NumberComponent>
          <InnerBox>
            <ContentBox>
              <Content>
                <span>{title[0]}</span>
                {title.map((el, idx) => {
                  if (idx > 0) {
                    return <p>{el}</p>
                  }
                })
                }
              </Content>
            </ContentBox>
            <ImgFrame>
              <ImgButton
                onClick={() => handlePage("up")}
                src={`${process.env.PUBLIC_URL}/images/back.png`}
              />
              <ImgButton
                onClick={() => handlePage("down")}
                src={`${process.env.PUBLIC_URL}/images/front.png`}
              />
              <ImgBox page={page}>
                {imageArr.map((el) => (
                  <ImgContent src={el} />
                ))}
              </ImgBox>
            </ImgFrame>
          </InnerBox>
        </ContentFrame>
        <UnderText>{underText}</UnderText>
      </ContentContainer>
    </Container>
  );
};

const Center = styled.div`
  display: flex;
  justify-content:center;
  align-items:center;
`;

const Container = styled(Center)`
  width: 100%;
  height: 54.95rem;
  display: flex;
  color: #35353d;
  border-bottom: 2px solid #2e3032;
`;


const ContentContainer = styled.div`
  padding-right: 25.6rem;
`;

const ContentFrame = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 60rem;
  height: 32rem;
  border-radius: 0.1rem;
  background-color: ${(props) => props.backgroundColor};
`;
const NumberComponent = styled.div`
  position: absolute;
  top: -8rem;
  left: 2rem;
  font-size: 20rem;
  font-family: "Teko", sans-serif;
  color: ${(props) => props.numberColor};
`;
const InnerBox = styled.div`
  display: flex;
  align-items: center;
`;
const ContentBox = styled.div`
  width: 50rem;
  height: 30rem;
  background-color: #656565;
`;
const Content = styled.div`
  margin: 8rem 1rem 1rem 1.5rem;

  span {
    font-size: 4rem;
    margin-bottom: 1rem;
    padding-left: 0.5rem;
  }

  p {
    font-size: 2rem;
    margin:0.5rem 0;
  }
`;

const ImgFrame = styled.div`
  position: relative;
  height: 25rem;
  width: 35.6rem;
  overflow: hidden;
  background-color: white;
`;
const ImgBox = styled.div`
  position: relative;
  top: ${(props)=> `-${(props.page*25)}rem`};
  display: flex;
  flex-direction: column;
`;
const ImgContent = styled.img`
  height: 25rem;
  width: 35.6rem;
`;
const ImgButton = styled.img`
  position: absolute;
  width: 2rem;
  z-index: 9999;
  cursor: pointer;

  :first-child {
    bottom: 0;
    right: 1.7rem;
  }

  :nth-child(2) {
    bottom: 0;
    right: 0rem;
  }
`;

const UnderText = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color:gray;
  padding: 1rem 0 0 10rem;
`;