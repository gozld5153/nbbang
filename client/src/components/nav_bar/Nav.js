import styled from "styled-components";

export default function Nav({ handleModal, isLogin }) {
  return (
    <NavBar>
      <Logo src={`${process.env.PUBLIC_URL}/images/logo.png`} />
      <ContainerBtn>
        {isLogin ? (
          <>
            <LoginBtn isLogin={isLogin}>새 프로젝트</LoginBtn>
            <LoginBtn isLogin={isLogin}>마이 페이지</LoginBtn>
            <LoginBtn>Logout</LoginBtn>
          </>
        ) : (
          <>
            <LoginBtn onClick={handleModal} isLogin={isLogin}>
              Login
            </LoginBtn>
            <LoginBtn onClick={handleModal} isLogin={isLogin}>
              Sign up
            </LoginBtn>
          </>
        )}
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
  width: ${(props) => {
    return props.isLogin ? "6rem" : "4rem";
  }};
  border-radius: 0.5rem;
  &:hover {
    background-color: #e1e1e1;
    font-weight: bold;
  }
`;
