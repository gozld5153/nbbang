import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import {
  MyPage,
  Profile,
  ProjectInProgress,
  ProjectDone,
} from "./pages/MyPage";
import styled from "styled-components";
import Nav from "./components/nav_bar/Nav";
import { InProgress } from "./mockdata/MyPageProjectData";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
`;

export default function App() {
  const [userData, setUserData] = useState(InProgress);
  return (
    <Router>
      <Container>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
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
        </Routes>
      </Container>
    </Router>
  );
}
