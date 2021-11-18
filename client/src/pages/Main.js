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
  const div4 = useRef();
  const div5 = useRef();
  const div6 = useRef();
  const div7 = useRef();

  const [testIdx, setTestIdx] = useState(0);
  let scrollTopPosition = 0;

  const handleMouseWheel = (e) => {
    if (isModal === true) return;
    e.preventDefault();
    const scrollY = window.pageYOffset;
    const wheelMove = e.deltaY;

    const slideTop = 0;
    // containerEle.current.getBoundingClientRect().top +
    // window.pageYOffset -
    // 100;

    const divFtop = Math.round(
      divF.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const divStop = Math.round(
      divS.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const divTtop = Math.round(
      divT.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const div4top = Math.round(
      div4.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const div5top = Math.round(
      div5.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const div6top = Math.round(
      div6.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const div7top = Math.round(
      div7.current.getBoundingClientRect().top + window.pageYOffset - 100
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
      } else if (scrollY < div4top) {
        scrollTopPosition = div4top;
        setTestIdx(4);
      } else if (scrollY < div5top) {
        scrollTopPosition = div5top;
        setTestIdx(5);
      } else if (scrollY < div6top) {
        scrollTopPosition = div6top;
        setTestIdx(6);
      } else if (scrollY < div7top) {
        scrollTopPosition = div7top;
        setTestIdx(7);
      }
    } else if (wheelMove < 0) {
      if (scrollY <= divFtop) {
        scrollTopPosition = slideTop;
        setTestIdx(0);
      } else if (scrollY <= divStop && scrollY > divFtop) {
        scrollTopPosition = divFtop;
        setTestIdx(1);
      } else if (scrollY <= divTtop && scrollY > divStop) {
        scrollTopPosition = divStop;
        setTestIdx(2);
      } else if (scrollY <= div4top && scrollY > divTtop) {
        scrollTopPosition = divTtop;
        setTestIdx(3);
      } else if (scrollY <= div5top && scrollY > div4top) {
        scrollTopPosition = div4top;
        setTestIdx(4);
      } else if (scrollY <= div6top && scrollY > div5top) {
        scrollTopPosition = div5top;
        setTestIdx(5);
      } else if (scrollY <= div7top && scrollY > div6top) {
        scrollTopPosition = div6top;
        setTestIdx(6);
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
    const div4top = Math.round(
      div4.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const div5top = Math.round(
      div5.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const div6top = Math.round(
      div6.current.getBoundingClientRect().top + window.pageYOffset - 100
    );
    const div7top = Math.round(
      div7.current.getBoundingClientRect().top + window.pageYOffset - 100
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
    } else if (idx === 4) {
      setTestIdx(4);
      scrollTopPosition = div4top;
    } else if (idx === 5) {
      setTestIdx(5);
      scrollTopPosition = div5top;
    } else if (idx === 6) {
      setTestIdx(6);
      scrollTopPosition = div6top;
    } else if (idx === 7) {
      setTestIdx(7);
      scrollTopPosition = div7top;
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
    <Container ref={containerEle} isModal={isModal}>
      <>
        {isModal ? (
          <ModalContainer>
            <TotalModal
              handleModal={handleModal}
              handleSignAndLogin={handleSignAndLogin}
              signAndLogin={signAndLogin}
              handleNavbar={handleNavbar}
              isOn={isOn}
            ></TotalModal>
          </ModalContainer>
        ) : null}
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
        <MainContainer ref={div4}>4</MainContainer>
        <MainContainer ref={div5}>5</MainContainer>
        <MainContainer ref={div6}>6</MainContainer>
        <MainContainer ref={div7}>7</MainContainer>
      </>
      <DotContainer>
        {Array(8)
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
  width: 87.5vw;
  /* margin: 0 auto; */
  position: relative;
  height: 100%;
`;

const ModalContainer = styled.div``;
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

const MainContainer = styled.div`
  height: 54.95rem;
  border-bottom: 1px solid black;
`;
