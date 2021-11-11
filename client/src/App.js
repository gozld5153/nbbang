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
// import GoalModal from './components/project/GoalModal'

export default function App() {
  const [userData, setUserData] = useState(InProgress);
  const [userInfo, setUserInfo] = useState({});
  const [isModal, setIsModal] = useState(false);
  const [signAndLogin, setSignAndLogin] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [isMypage, setIsMypage] = useState(false);
  const [switchBtn, setSwitchBtn] = useState(false);

  const handleNavbar = () => {
    setIsLogin(true);
    setIsModal(!isModal);
  };

  const handleSignAndLogin = () => {
    if (signAndLogin === "login") {
      setSignAndLogin("signup");
    } else {
      setSignAndLogin("login");
    }
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
      .get(`${process.env.API_URL}/users/users`, {
        withCredentials: true,
      })
      .then((data) => {
        setUserInfo(data.data.data.user_info);
        setIsLogin(true);
        console.log("됐냐?");
      })
      .catch(() => setIsLogin(false));
  }, [isLogin]);

  return (
    <Router>
      <Container>
        <Nav
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
          <Route path="project" element={<Project />}>
            {/* <Route path=":a" element={<GoalModal />} /> */}
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
`;
