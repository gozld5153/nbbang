import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GrProjects } from "react-icons/gr";
import { VscProject } from "react-icons/vsc";
import { useLocation } from "react-router-dom";

import Progressbar from "../components/utils/Progressbar";
import { InProgress, Done } from "../mockdata/MyPageProjectData";
import ProjectPagePagination from "../components/utils/ProjectPagePagination";

const MyPageWrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100vh;
`;

const NavProfileImg = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${process.env.PUBLIC_URL}/images/profile-sample.jpg);
  background-position: center;
  background-size: cover;
`;

const NavItems = styled(Link)`
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  border: 1px solid #efefef;
  transition: all 1s;

  svg {
    margin: 20px auto;
    font-size: 2rem;
    display: block;
    text-align: center;
  }

  ${(props) =>
    "/mypage/" + props.to === props.here &&
    css`
      background: yellow;
    `}
`;

const ProjectWrapper = styled.div`
  width: 1700px;
  height: 100%;
  padding: 20px 100px;
`;

const ProjectColumnName = styled.div`
  display: flex;
  width: 1500px;
  height: 60px;

  > span {
    color: gray;
    font-weight: 600;
    font-size: 1.3rem;
    padding: 20px 0 20px 30px;
  }

  > span:nth-of-type(1) {
    width: 500px;
  }
  > span:nth-of-type(2) {
    width: 400px;
  }
  > span:nth-of-type(3) {
    width: 400px;
  }
  > span:nth-of-type(4) {
    width: 200px;
  }
`;
const ProjectContainer = styled.div`
  width: 1500px;
  height: 680px;
  display: flex;
  flex-direction: column;
`;

const ProjectItems = styled.div`
  width: 100%;
  margin: 0 0 40px 0;
  height: 100px;
  border-radius: 20px;
  box-shadow: 1px 1px 5px #ccc;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: #fff3af;
  }
`;

const ProjectName = styled.div`
  display: flex;
  padding: 20px;
  width: 500px;
  > img {
    border-radius: 10px;
    border: 1px solid gray;
    width: 60px;
  }
  > div {
    margin-left: 20px;

    > span {
      display: block;
    }

    > span:nth-of-type(1) {
      font-weight: bold;
      font-size: 1.25rem;
      margin: 5px 10px;
    }

    > span:nth-of-type(2) {
      font-size: 0.8rem;
      margin: 10px;
    }
  }
`;
const ProjectTeammates = styled.div`
  width: 400px;
  padding: 20px;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 3px 10px;
  }
`;
const ProjectProgress = styled.div`
  width: 400px;
  padding: 25px 40px;
  position: relative;
  top: 10px;
`;
const ProjectContribution = styled.div`
  width: 200px;
  font-size: 1.75rem;
  font-weight: 600;
  padding: 35px 70px;
`;

const ProjectDescription = styled.div`
  width: 380px;
  padding: 40px 40px;
  font-size: 1rem;
  font-weight: 600;
`;

export function MyPage() {
  return (
    <MyPageWrapper>
      <MyPageNav />
      <Outlet />
    </MyPageWrapper>
  );
}

export function MyPageNav() {
  const { pathname } = useLocation();
  return (
    <NavContainer>
      <NavProfileImg />
      <NavItems to="profile" here={pathname}>
        <CgProfile />
        프로필
      </NavItems>
      <NavItems to="project-inprogress" here={pathname}>
        <GrProjects />
        진행중인 프로젝트
      </NavItems>
      <NavItems to="project-done" here={pathname}>
        <VscProject />
        완료한 프로젝트
      </NavItems>
    </NavContainer>
  );
}

export function Profile() {
  return <div>프로필</div>;
}
export function ProjectInProgress({ userData, setUserData }) {
  console.log(userData);
  return (
    <ProjectWrapper>
      <ProjectColumnName>
        <span>프로젝트명</span>
        <span>팀원</span>
        <span>진행도</span>
        <span>현재 나의 기여도</span>
      </ProjectColumnName>
      <ProjectContainer>
        {userData.map((project) => (
          <ProjectInProgressItems project={project} />
        ))}
      </ProjectContainer>
      <ProjectPagePagination setUserData={setUserData} />
    </ProjectWrapper>
  );
}
export function ProjectInProgressItems({ project }) {
  return (
    <ProjectItems>
      <ProjectName>
        <img
          src={`${process.env.PUBLIC_URL}/images/project-logo-sample.png`}
          alt=""
        />
        <div>
          <span>{project.project_name}</span>
          <span>{project.created_at}</span>
        </div>
      </ProjectName>
      <ProjectTeammates>
        {project.users.map((user) => (
          <img
            src={`${process.env.PUBLIC_URL}/images/project-teammate-sample.png`}
            alt={user.username}
            title={user.username}
          />
        ))}
      </ProjectTeammates>
      <ProjectProgress>
        <Progressbar value={project.progress} />
      </ProjectProgress>
      <ProjectContribution>{project.contribution}%</ProjectContribution>
    </ProjectItems>
  );
}
export function ProjectDone() {
  return (
    <ProjectWrapper>
      <ProjectColumnName>
        <span>프로젝트명</span>
        <span>팀원</span>
        <span>한줄 프로젝트 설명</span>
        <span>나의 기여도</span>
      </ProjectColumnName>
      <ProjectContainer>
        {Done.map((project) => (
          <ProjectDoneItems project={project} />
        ))}
      </ProjectContainer>
      <ProjectPagePagination />
    </ProjectWrapper>
  );
}

export function ProjectDoneItems({ project }) {
  return (
    <ProjectItems>
      <ProjectName>
        <img
          src={`${process.env.PUBLIC_URL}/images/project-logo-sample.png`}
          alt=""
        />
        <div>
          <span>{project.project_name}</span>
          <span>{project.deadline}</span>
        </div>
      </ProjectName>
      <ProjectTeammates>
        {project.users.map((user) => (
          <img
            src={`${process.env.PUBLIC_URL}/images/project-teammate-sample.png`}
            alt=""
            title={user.username}
          />
        ))}
      </ProjectTeammates>
      <ProjectDescription>{project.description}</ProjectDescription>
      <ProjectContribution>{project.contribution}%</ProjectContribution>
    </ProjectItems>
  );
}
