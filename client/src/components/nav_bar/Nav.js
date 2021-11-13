import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Nav({
  handleModal,
  isLogin,
  handleMypage,
  handleOffMypage,
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
    <NavBar>
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
  height: 100px;
  width: calc(100% - 220px);
  display: flex;
  border: solid 5px black;
  margin: 0px 100px;
`;

const Logo = styled.img`
  width: 190px;
  height: 100%;
  object-fit: contain;
  padding: 10px;
  cursor: pointer;
`;

const ContainerBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const LoginBtn = styled.button`
  height: 100%;
  font-family: "Anton", sans-serif;
  font-size: 1.5rem;
  border-left: 2px solid black;
  width: ${(props) => {
    return props.isLogin ? "6rem" : "150px";
  }};
`;
