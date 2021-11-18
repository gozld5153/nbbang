import styled, { keyframes } from "styled-components";
import TotalModal from "../components/nav_bar/TotalModal";
import Slide from "../components/mainComponents/Slide";
import image1 from "../components/mainComponents/img/image1.jpg";
import image2 from "../components/mainComponents/img/image2.png";
import image3 from "../components/mainComponents/img/image3.png";
import MainDefaultComponent from "../components/mainComponents/MainDefaultComponent";
import { useEffect, useRef, useState } from "react";
import { ImArrowUp } from "react-icons/im";
export default function Main({
  isModal,
  handleModal,
  handleSignAndLogin,
  signAndLogin,
  handleNavbar,
  isOn,
  isLogin,
}) {
  const title = ["Top", "생성", "수정", "초대", "목표", "변경", "완료", "확인"];
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
    const slideTop = 0;

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
        <MainContainer ref={divF} isActive={testIdx === 1}>
          <MainDefaultComponent
            testIdx={testIdx}
            idx={1}
            title={[
              "프로젝트 만들기",
              " - nav의 Create 버튼을 눌러서 프로젝트 페이지로 진입.",
            ]}
            underText="일단 버튼을 누르라. 그럼 길이 열릴것이다 - 한태규"
            numberColor="black"
            backgroundColor="#6D9886"
            imageArr={[
              `${process.env.PUBLIC_URL}/images/MainGIF/main1.gif`,
              `${process.env.PUBLIC_URL}/images/bbang.png`,
            ]}
          />
        </MainContainer>
        <MainContainer ref={divS} isActive={testIdx === 2}>
          <MainDefaultComponent
            testIdx={testIdx}
            idx={2}
            title={[
              "프로젝트 정보 수정",
              " - 새로운 프로젝트 클릭하기",
              " - 각 항목마다 상세정보 입력하기",
              " - 하단의 submit버튼 누르기",
            ]}
            underText="입력하라, 그럼 너는 정상에 설 것이다. - Brokeback Mt"
            numberColor="black"
            backgroundColor="#6D9886"
            imageArr={[
              `${process.env.PUBLIC_URL}/images/MainGIF/main2.gif`,
              `${process.env.PUBLIC_URL}/images/bbang.png`,
            ]}
          />
        </MainContainer>
        <MainContainer ref={divT} isActive={testIdx === 3}>
          <MainDefaultComponent
            testIdx={testIdx}
            idx={3}
            title={[
              "다른 사용자 초대하기",
              " - 우측 상단에 invite 버튼 누르기",
              " - 상대방의 이메일을 입력 후, Enter 누르기",
              " - 하단의 invite 버튼 누르기",
            ]}
            underText="초대하라, 너는 거부당할 것이다 - Mosol Thirty"
            numberColor="black"
            backgroundColor="#6D9886"
            imageArr={[
              `${process.env.PUBLIC_URL}/images/MainGIF/main3.gif`,
              `${process.env.PUBLIC_URL}/images/bbang.png`,
            ]}
          />
        </MainContainer>
        <MainContainer ref={div4} isActive={testIdx === 4}>
          <MainDefaultComponent
            testIdx={testIdx}
            idx={4}
            title={[
              "목표 생성하기",
              " - todoList 상단에 +버튼 누르기",
              " - 모달창에서 목표의 기본정보 입력하기",
              " - 하단의 create버튼 누르기",
            ]}
            underText="시작하라, 시작은 시작일 뿐이다 - 박명수"
            numberColor="black"
            backgroundColor="#6D9886"
            imageArr={[
              `${process.env.PUBLIC_URL}/images/MainGIF/main4.gif`,
              `${process.env.PUBLIC_URL}/images/bbang.png`,
            ]}
          />
        </MainContainer>
        <MainContainer ref={div5} isActive={testIdx === 5}>
          <MainDefaultComponent
            testIdx={testIdx}
            idx={5}
            title={[
              "목표 수정하기",
              " - 리스트에서 원하는 목표를 누르기",
              " - 우측 상단에 수정 버튼 누르기",
              " - 각종 정보 수정 및 파일 올리기 등 작업 수행하기",
              " - 우측 상단에 수정 버튼 다시 누르기",
            ]}
            underText="고치고 고치고 또 고쳐라 처음으로 돌아가고 싶을 것이다. - programmer"
            numberColor="black"
            backgroundColor="#6D9886"
            imageArr={[
              `${process.env.PUBLIC_URL}/images/MainGIF/main5.gif`,
              `${process.env.PUBLIC_URL}/images/bbang.png`,
            ]}
          />
        </MainContainer>
        <MainContainer ref={div6} isActive={testIdx === 6}>
          <MainDefaultComponent
            testIdx={testIdx}
            idx={6}
            title={[
              "완료 시키기",
              " - 프로젝트 정보 변경하는 쪽으로 이동하기",
              " - 좌측 하단에 complete 버튼 누르기",
            ]}
            underText="자 이제 시작이야! - 피카츄"
            numberColor="black"
            backgroundColor="#6D9886"
            imageArr={[
              `${process.env.PUBLIC_URL}/images/MainGIF/main6.gif`,
              `${process.env.PUBLIC_URL}/images/bbang.png`,
            ]}
          />
        </MainContainer>
        <MainContainer ref={div7} isActive={testIdx === 7}>
          <MainDefaultComponent
            testIdx={testIdx}
            idx={7}
            title={[
              "결과 확인하기",
              " - nav에서 mypage버튼 누르기",
              " - 원하는 완료한 프로젝트 선택하기",
              " - 결과를 감상하기",
            ]}
            underText="수행한 것이 없습니다 - 진짜팀장"
            numberColor="black"
            backgroundColor="#6D9886"
            imageArr={[
              `${process.env.PUBLIC_URL}/images/MainGIF/main7.gif`,
              `${process.env.PUBLIC_URL}/images/bbang.png`,
            ]}
          />
          {isModal || isLogin ? null : (
            <ArrowDiv>
              <ImArrowUp size={"60px"} />
              <div style={{ margin: "0.6rem", fontWeight: "bold" }}>Click!</div>
            </ArrowDiv>
          )}
        </MainContainer>
      </>
      <DotContainer>
        {Array(8)
          .fill(0)
          .map((_, idx) => (
            <Dot isActive={testIdx === idx} onClick={() => handleScroll(idx)}>
              {title[idx]}
            </Dot>
          ))}
      </DotContainer>
    </Container>
  );
}

const arrowGuide2 = keyframes`
10% {
  transform: translateY(-20px)
}
30% {
  transform: translateY(0px)
}
40% {
  transform: translateY(-20px)
}
70% {
  transform: translateY(0px)
}
`;
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
  width: 3rem;
  height: 2rem;
  /* border-radius: 50%; */
  /* background-color: #142f43; */
  opacity: ${(props) => (props.isActive ? 1 : 0.4)};
  font-weight: ${(props) => (props.isActive ? "bold" : 0)};
  margin-top: 1rem;
  cursor: pointer;
`;

const ArrowDiv = styled.div`
  position: absolute;
  top: 10px;
  right: 40px;
  animation: ${arrowGuide2} 1.5s linear infinite;
`;
const MainContainer = styled.div`
  position: relative;
  height: 54.95rem;
  border-bottom: 2px solid #2e3032;
  margin: 1rem 0;
  span {
    font-family: "Black Han Sans", sans-serif;
  }
  p {
    font-family: "Jua", sans-serif;
    color: #efefef;
    position: relative;
    top: ${({ isActive }) => (isActive ? 0 : "20px")};
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    transition: all 1s linear;
    margin-top: 1.5rem;
  }
  ${ArrowDiv} {
    display: ${({ isActive }) => (isActive ? "block" : "none")};
  }
`;
