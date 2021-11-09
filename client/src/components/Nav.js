import styled from "styled-components";

export default function Nav({ handleModal }) {
  return (
    <NavBar>
      <Logo src={`${process.env.PUBLIC_URL}/images/logo.png`} />
      <ContainerBtn>
        <LoginBtn onClick={handleModal}>Login</LoginBtn>
        <LoginBtn onClick={handleModal}>Sign up</LoginBtn>
      </ContainerBtn>
    </NavBar>
  );
}

const NavBar = styled.div`
  height: 7vh;
  width: 100%;
  display: flex;
  border-bottom: solid 1px #f3f3f4;
`;

const Logo = styled.img`
  width: 10%;
  height: 100%;
  object-fit: contain;
  margin-left: 3rem;
`;

const ContainerBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 8rem;
`;

const LoginBtn = styled.button`
  background-color: #f3f3f4;
  margin-right: 2rem;
  height: 2rem;
  width: 4rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: #e1e1e1;
    font-weight: bold;
  }
`;

const Modal = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;
