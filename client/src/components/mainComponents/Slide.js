import React, { useState, useEffect } from "react";
import styled from "styled-components";

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
          <h1 style={{ color: "white", fontSize: "2rem", fontWeight: "bold" }}>
            Test 중입니다!
          </h1>
        </ChildrenWrapper>
      </Wrapper>
    </Container>
  );
};

const Dot = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: white;
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
  height: 60vh;
  border-bottom: 2px solid #2e3032;
  /* padding: 2rem; */
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  /* margin: 0 auto; */
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
`;
const Slider = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background-position: center;
  background-size: cover;
  transition: all 0.5s linear;
`;

const ChildrenWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default Slide;
