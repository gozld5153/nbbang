import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import axios from "axios";
import {
  MyPage,
  Profile,
  ProjectInProgress,
  ProjectDone,
} from "./pages/MyPage";
import styled from "styled-components";
import Nav from "./components/nav_bar/Nav";
import { InProgress } from "./mockdata/MyPageProjectData";
import Project from "./pages/Project";
import GoalModal from "./components/project/GoalModal";
import { set } from "date-fns/esm";

export default function App() {
  const [userData, setUserData] = useState(InProgress);
  const [userInfo, setUserInfo] = useState({
    id: 1,
    username: "demouser",
    email: "demouser@nbbang.com",
    profile: null,
    createdAt: "2021-11-09T14:20:45.000Z",
    updatedAt: "2021-11-09T14:20:45.000Z",
  });
  const [isModal, setIsModal] = useState(false);
  const [signAndLogin, setSignAndLogin] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isMypage, setIsMypage] = useState(false);
  const [switchBtn, setSwitchBtn] = useState(false);
  const [isOn, setIsOn] = useState(false);

  const handleNavbar = () => {
    setIsLogin(true);
    setIsModal(!isModal);
  };

  const handleSignAndLogin = () => {
    setIsOn(true);
    setTimeout(() => {
      if (signAndLogin === "login") {
        setSignAndLogin("signup");
      } else {
        setSignAndLogin("login");
      }
      setIsOn(false);
    }, 500);
  };

  const handleModal = (e) => {
    if (e.target.innerHTML === "Login") {
      setSignAndLogin("login");
    } else {
      setSignAndLogin("signup");
    }
    setIsModal(!isModal);
  };

  const handleMypage = () => {
    //axios 요청으로 유저의 프로젝트 정보를 받아 와서 스테이트 관리해준다!
    console.log(userData);
    setSwitchBtn(true);
    setIsMypage(!isMypage);
  };
  const handleOffMypage = () => {
    setSwitchBtn(false);
    setIsMypage(false);
  };

  // 토큰이 유효하면 로그인 상태 유지 아니면 로그아웃
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/users`, {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
        setUserInfo(data.data.data.user_info);
        setIsLogin(true);
      })
      .catch(() => setIsLogin(false));
  }, [isLogin]);

  return (
    <Router>
      <Container>
        <Frame>
          <Nav
            isModal={isModal}
            handleModal={handleModal}
            isLogin={isLogin}
            handleMypage={handleMypage}
            handleOffMypage={handleOffMypage}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  isModal={isModal}
                  handleModal={handleModal}
                  handleSignAndLogin={handleSignAndLogin}
                  signAndLogin={signAndLogin}
                  handleNavbar={handleNavbar}
                  switchBtn={switchBtn}
                  isMypage={isMypage}
                  userInfo={userInfo}
                  isOn={isOn}
                  userData={userData}
                />
              }
            />
            <Route path="mypage" element={<MyPage />}>
              <Route path="profile" element={<Profile />} />
              <Route
                path="project-inprogress"
                element={
                  <ProjectInProgress
                    userData={userData}
                    setUserData={setUserData}
                  />
                }
              />
              <Route path="project-done" element={<ProjectDone />} />
            </Route>
            <Route
              path="project/:project_id"
              element={<Project id={userInfo.id} />}
            >
              <Route path=":id" element={<GoalModal />} />
            </Route>
          </Routes>
        </Frame>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow: auto;
  background-color: #f6f2f1;
`;

const Frame = styled.div`
  width: 88vw;
  border: 5px solid black;
  margin: 5rem 0 5rem 0;
`;
