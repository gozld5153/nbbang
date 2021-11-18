import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const Slide = ({ images = [] }) => {
  const [curSlide, setCurSlide] = useState(0);

  function nextSlide(idx) {
    setCurSlide(idx);
  }

  useEffect(() => {
    const idx = curSlide >= images.length - 1 ? 0 : curSlide + 1;
    const timer = setTimeout(() => {
      setCurSlide(idx);
    }, 3000);
    return () => clearTimeout(timer);
  }, [curSlide]);

  return (
    <Container>
      <Wrapper>
        {images.map((image, index) => (
          <Slider
            key={index}
            style={{
              backgroundImage: `url(${image})`,
              marginLeft: index === 0 ? `-${curSlide * 100}%` : undefined,
            }}
          ></Slider>
        ))}
        <IndicatorWrapper>
          {Array(images.length)
            .fill(1)
            .map((_, i) => {
              return (
                <Dot isActive={curSlide === i} onClick={() => nextSlide(i)} />
              );
            })}
        </IndicatorWrapper>
        <ChildrenWrapper>
          {/* <h1 style={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}>
            Test 중입니다!
          </h1> */}
        </ChildrenWrapper>
      </Wrapper>
      <BigWrapper>
        <TextDiv>
          <div>NBBANG</div>
          <div>NBBANG</div>
          <div>NBBANG</div>
          <div>NBBANG</div>
          <div>NBBANG</div>
        </TextDiv>
      </BigWrapper>
    </Container>
  );
};

const Dot = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: #222222;
  opacity: ${(props) => (props.isActive ? 1 : 0.4)};
  margin: 1rem;
  cursor: pointer;
`;

const IndicatorWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Container = styled.div`
  /* width: 88vw; */
  height: 54.95rem;
  border-bottom: 2px solid #2e3032;
  /* padding: 2rem; */
`;

const Wrapper = styled.div`
  width: 100%;
  height: 30.95rem;

  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
  /* border-radius: 20px; */
`;
const Slider = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transition: all 0.5s linear;
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SlideMoving2 = keyframes`
      0% {
      left: 0;
    }
    100% {
      left: -1227px;
    }
`;

const BigWrapper = styled.div`
  margin-top: 1.5rem;
  margin-right: 0.2rem;
  display: flex;
  height: inherit;
  overflow: hidden;
  cursor: pointer;
  height: 14rem;
`;

const TextDiv = styled.div`
  width: 20rem;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  position: relative;
  /* background-color: blue; */
  animation-name: ${SlideMoving2};
  animation-duration: 10s;
  animation-timing-function: linear;
  animation-direction: normal;
  animation-iteration-count: infinite;
  > div {
    font-family: "Anton", sans-serif;
    font-size: 10rem;
    letter-spacing: 1rem;
    margin: 0 1.5rem 0 1.5rem;
  }
  > :nth-child(2) {
    color: white;
    -webkit-text-stroke: 0.1rem black;
  }
  > :nth-child(4) {
    color: white;
    -webkit-text-stroke: 0.1rem black;
    margin-left: 1rem;
  }
`;

export default Slide;
