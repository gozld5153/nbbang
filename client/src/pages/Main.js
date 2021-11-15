import styled, { keyframes } from "styled-components";
import TotalModal from "../components/nav_bar/TotalModal";
import Slide from "../components/mainComponents/Slide";
import image1 from "../components/mainComponents/img/image1.png";
import image2 from "../components/mainComponents/img/image2.jpg";
import image3 from "../components/mainComponents/img/image3.png";
import MainComponent from "../components/mainComponents/MainComponent";
import { useEffect, useRef, useState } from "react";

export default function Main({
  isModal,
  handleModal,
  handleSignAndLogin,
  signAndLogin,
  handleNavbar,
  isOn,
}) {
  const containerEle = useRef();
  const divF = useRef();
  const divS = useRef();
  const divT = useRef();
  const [testIdx, setTestIdx] = useState(0);
  let scrollTopPosition = 0;

  const handleMouseWheel = (e) => {
    if (isModal === true) return;
    e.preventDefault();
    const scrollY = window.pageYOffset;
    const wheelMove = e.deltaY;

    const slideTop =
      containerEle.current.getBoundingClientRect().top +
      window.pageYOffset -
      100;

    const divFtop = Math.round(
      divF.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const divStop = Math.round(
      divS.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const divTtop = Math.round(
      divT.current.getBoundingClientRect().top + window.pageYOffset - 100
    );

    // console.log(`컨테이너 상단 위치: ${slideTop}`);
    // console.log(`첫번째 div 상단 위치: ${divFtop}`);
    // console.log(`두번째 div 상단 위치: ${divStop}`);
    // console.log(`세번째 div 상단 위치: ${divTtop}`);

    if (wheelMove > 0) {
      if (scrollY < slideTop) {
        scrollTopPosition = slideTop;
        setTestIdx(0);
      } else if (scrollY < divFtop) {
        scrollTopPosition = divFtop;
        setTestIdx(1);
      } else if (scrollY < divStop) {
        scrollTopPosition = divStop;
        setTestIdx(2);
      } else if (scrollY < divTtop) {
        scrollTopPosition = divTtop;
        setTestIdx(3);
      }
    } else if (wheelMove < 0) {
      if (scrollY <= divFtop) {
        scrollTopPosition = slideTop;
        setTestIdx(0);
      } else if (scrollY <= divStop && scrollY > divFtop) {
        scrollTopPosition = divFtop;
        setTestIdx(1);
      } else if (scrollY > divStop) {
        scrollTopPosition = divStop;
        setTestIdx(2);
      }
    }

    window.scroll({ top: scrollTopPosition, behavior: "smooth" });
  };

  const handleScroll = (idx) => {
    const slideTop =
      containerEle.current.getBoundingClientRect().top +
      window.pageYOffset -
      100;

    const divFtop = Math.round(
      divF.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const divStop = Math.round(
      divS.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const divTtop = Math.round(
      divT.current.getBoundingClientRect().top + window.pageYOffset - 100
    );

    if (idx === 0) {
      setTestIdx(0);
      scrollTopPosition = slideTop;
    } else if (idx === 1) {
      setTestIdx(1);
      scrollTopPosition = divFtop;
    } else if (idx === 2) {
      setTestIdx(2);
      scrollTopPosition = divStop;
    } else if (idx === 3) {
      setTestIdx(3);
      scrollTopPosition = divTtop;
    }
    window.scroll({ top: scrollTopPosition, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("wheel", handleMouseWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleMouseWheel, { passive: false });
    };
  }, [isModal]);

  return (
    <Container ref={containerEle}>
      {isModal ? (
        <TotalModal
          handleModal={handleModal}
          handleSignAndLogin={handleSignAndLogin}
          signAndLogin={signAndLogin}
          handleNavbar={handleNavbar}
          isOn={isOn}
        ></TotalModal>
      ) : (
        <>
          <Slide images={[image1, image2, image3]}></Slide>
          <MainContainer ref={divF}>
            <MainComponent />
          </MainContainer>
          <MainContainer ref={divS}>
            <MainComponent />
          </MainContainer>
          <MainContainer ref={divT}>
            <MainComponent />
          </MainContainer>
        </>
      )}
      <DotContainer>
        {Array(4)
          .fill(0)
          .map((_, idx) => (
            <Dot
              isActive={testIdx === idx}
              onClick={() => handleScroll(idx)}
            ></Dot>
          ))}
      </DotContainer>
    </Container>
  );
}

const Container = styled.div`
  /* margin: 7vh auto 0 auto; */
  width: 80vw;
  /* height: 100%; */
  margin: 0 auto;
  position: relative;
  /* white-space: nowrap; */
  /* overflow-x: hidden; */
  /* border: 1px solid blue; */
`;

const DotContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 1.5%;
  top: 50%;
  transform: translateY(-50%);
`;
const Dot = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #142f43;
  opacity: ${(props) => (props.isActive ? 1 : 0.4)};
  margin: 1rem;
  cursor: pointer;
`;

const MainContainer = styled.div``;
