import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Nav({
  handleModal,
  isLogin,
  handleMypage,
  handleOffMypage,
  isModal,
}) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const handleLogout = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/signout`, null, {
        withCredentials: true,
      })
      .then(() => {
        removeCookie("access_token");
        window.location.replace("/");
      });
  };

  return (
    <NavBar isModal={isModal}>
      <Logo
        src={`${process.env.PUBLIC_URL}/images/logo.png`}
        onClick={() => {
          handleOffMypage();
          navigate("/");
        }}
      />
      <ContainerBtn>
        {isLogin ? (
          <>
            <LoginBtn isLogin={isLogin}>새 프로젝트</LoginBtn>
            <LoginBtn isLogin={isLogin} onClick={handleMypage}>
              마이 페이지
            </LoginBtn>
            <LoginBtn onClick={handleLogout}>Logout</LoginBtn>
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
  z-index: ${({ isModal }) => (isModal ? 0 : 1000)};
  position: fixed;
  top: 0;
  background-color: #ffffff;
`;

const Logo = styled.img`
  width: 20%;
  height: 100%;
  object-fit: fill;
  cursor: pointer;
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
