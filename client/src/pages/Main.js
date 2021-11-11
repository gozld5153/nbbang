import styled, { keyframes } from "styled-components";
import TotalModal from "../components/nav_bar/TotalModal";
import MiniMypage from "../components/miniMypage/MiniMypage";
import Slide from "../components/mainComponents/Slide";
import image1 from "../components/mainComponents/img/image1.png";
import image2 from "../components/mainComponents/img/image2.jpg";
import image3 from "../components/mainComponents/img/image3.png";

export default function Main({
  isModal,
  handleModal,
  handleSignAndLogin,
  signAndLogin,
  handleNavbar,
  switchBtn,
  isMypage,
  userInfo,
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
          <Slide images={[image1, image2, image3]}></Slide>
          {switchBtn ? (
            <MiniMypage isMypage={isMypage} userInfo={userInfo}></MiniMypage>
          ) : null}
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 93vh;
  position: relative;
  overflow-x: hidden;
`;
