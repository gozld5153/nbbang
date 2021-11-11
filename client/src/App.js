import React from "react";
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
import Project from "./pages/Project";

export default function App() {
  return (
    <Router>
      <Container>
        <Nav />
        {/* <Routes>
          <Route path="/" element={<Main />} />
          <Route path="mypage" element={<MyPage />}>
            <Route path="profile" element={<Profile />} />
            <Route path="project-inprogress" element={<ProjectInProgress />} />
            <Route path="project-done" element={<ProjectDone />} />
          </Route>
        </Routes> */}
        <Project />;
      </Container>
    </Router>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  position: relative;
`;