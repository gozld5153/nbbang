import styled, { keyframes } from "styled-components";
import TotalModal from "../components/nav_bar/TotalModal";

export default function Main({
  isModal,
  handleModal,
  handleSignAndLogin,
  signAndLogin,
  handleNavbar,
  switchBtn,
  isMypage,
}) {
  return (
    <Container>
      {isModal ? (
        <TotalModal
          handleModal={handleModal}
          handleSignAndLogin={handleSignAndLogin}
          signAndLogin={signAndLogin}
          handleNavbar={handleNavbar}
        ></TotalModal>
      ) : (
        <>
          <div>작업중입니다.</div>
          {switchBtn ? (
            <MiniMypage
              className={isMypage ? "add" : "hide"}
              isMypage={isMypage}
            >
              테스트중
            </MiniMypage>
          ) : null}
        </>
      )}
    </Container>
  );
}
const moveLeft = keyframes`
  0% {
    transform: translateX(0)
  }
  50% {
    transform: translateX(-50%)
  }
  100% {
    transform: translateX(-100%)
  }
`;

const moveHide = keyframes`
  0% {
    transform: translateX(0)
  }
  50% {
    transform: translateX(50%)
  }
  100% {
    transform: translateX(100%)
  }
`;

const Container = styled.div`
  height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const MiniMypage = styled.div`
  position: fixed;
  height: 93vh;
  width: 30%;

  right: ${(props) => (props.isMypage ? "-30%" : "0")};
  top: 7vh;
  background-color: greenyellow;
  &.hide {
    animation: ${moveHide} 0.4s linear forwards;
  }
  &.add {
    animation: ${moveLeft} 0.4s linear forwards;
  }
`;
