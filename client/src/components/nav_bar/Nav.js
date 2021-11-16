import styled from "styled-components";
import axios from "axios";
import { useCookies } from "react-cookie";

import { useNavigate } from "react-router-dom";
import MiniMypage from "../miniMypage/MiniMypage";

export default function Nav({
  handleModal,
  isLogin,
  handleMypage,
  handleOffMypage,
  isModal,
  switchBtn,
  isMypage,
  userInfo,
  userData,
  invited,
  handleInvitedList,
}) {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const signUp = true;

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

  const handleProject = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/project`, {
        projectName: "새로운 프로젝트",
        captainId: userInfo.id,
      })
      .then((data) => navigate(`/project/${data.data.data.id}`))
      .catch((err) => console.log(err));
  };

  return (
    <NavBar isModal={isModal} path={window.location.pathname}>
      <Logo
        src={`${process.env.PUBLIC_URL}/images/logo11.png`}
        onClick={() => {
          handleOffMypage();
          navigate("/");
        }}
      />
      <ContainerBtn>
        {isLogin ? (
          <>
            <BtnMenu isLogin={isLogin} onClick={handleProject}>
              Project
            </BtnMenu>
            <MypageBtn
              isLogin={isLogin}
              isMypage={isMypage}
              onClick={handleMypage}
            >
              My Page
            </MypageBtn>
            <BtnMenu onClick={handleLogout}>Logout</BtnMenu>
            {switchBtn ? (
              <MiniMypage
                invited={invited}
                handleMypage={handleMypage}
                isMypage={isMypage}
                userInfo={userInfo}
                userData={userData}
                handleInvitedList={handleInvitedList}
              ></MiniMypage>
            ) : null}
          </>
        ) : (
          <>
            <LoginBtn className="login" onClick={handleModal} isLogin={isLogin}>
              <BigWrapper>
                <Wrapper>
                  <div>Login</div>
                  <div>Login</div>
                </Wrapper>
              </BigWrapper>
            </LoginBtn>
            <LoginBtn onClick={handleModal} isLogin={isLogin}>
              <BigWrapper>
                <Wrapper signUp={signUp}>
                  <div>Sign up</div>
                  <div>Sign up</div>
                </Wrapper>
              </BigWrapper>
            </LoginBtn>
          </>
        )}
      </ContainerBtn>
    </NavBar>
  );
}

const NavBar = styled.div`
  background-color: #f6f2f1;
  position: ${({ path }) => (path === "/" ? "sticky" : null)};

  height: 6rem;
  width: 100%;
  display: flex;
  border-bottom: 5px solid black;
  z-index: 999;
  top: 0;
`;

const Logo = styled.img`
  flex-shrink: 0;
  width: 200px;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  border-right: 5px solid black;
`;

const ContainerBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const BtnMenu = styled.button`
  height: 100%;
  font-family: "Anton", sans-serif;
  font-size: 1.5rem;
  border-left: 2px solid black;
  width: ${(props) => {
    return props.isLogin ? "10rem" : "150px";
  }};
  cursor: pointer;
  &:hover {
    background-color: #222222;
    color: #efefef;
  }
`;

const MypageBtn = styled.button`
  height: 100%;
  font-family: "Anton", sans-serif;
  font-size: 1.5rem;
  border-left: 2px solid black;
  width: ${(props) => {
    return props.isLogin ? "10rem" : "150px";
  }};
  background-color: ${({ isMypage }) => (isMypage ? "red" : null)};
  color: ${({ isMypage }) => (isMypage ? "#efefef" : null)};
  cursor: pointer;
  &:hover {
    background-color: #222222;
    color: #efefef;
  }
`;

const LoginBtn = styled.div`
  height: 100%;
  font-family: "Anton", sans-serif;
  font-size: 1.5rem;
  border-left: 2px solid black;
  width: ${(props) => {
    return props.isLogin ? "10rem" : "150px";
  }};
  display: flex;
`;

const BigWrapper = styled.div`
  display: flex;
  height: inherit;
  overflow: hidden;
  cursor: pointer;
`;

const Wrapper = styled.div`
  width: 20rem;
  height: inherit;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  position: relative;
  /* background-color: blue; */
  &:hover {
    animation-name: ${({ signUp }) =>
      signUp ? "slideMoving" : "slideMoving2"};
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-direction: normal;
    animation-iteration-count: infinite;
  }
  @keyframes slideMoving2 {
    0% {
      left: 0;
    }
    100% {
      left: -99px;
    }
  }
  @keyframes slideMoving {
    0% {
      left: 0;
    }
    100% {
      left: -111px;
    }
  }

  > div {
    text-align: center;
    margin-left: ${({ signUp }) => (signUp ? "2.5rem" : "3rem")};
    flex-shrink: 0;
  }
`;
