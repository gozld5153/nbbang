import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GrProjects } from "react-icons/gr";
import { VscProject } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Progressbar from "../components/utils/Progressbar";
import { InProgress, Done } from "../mockData/MyPageProjectData";
import ProjectPagePagination from "../components/utils/ProjectPagePagination";

const MyPageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0px 100px;
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  border-left: 5px solid black;
  border-right: 5px solid black;
  border-bottom: 5px solid black;
`;

const NavProfileImg = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${process.env.PUBLIC_URL}/images/profile-sample.jpg);
  background-position: center;
  background-size: cover;
  border-right: 5px solid black;
`;

const NavItems = styled(Link)`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  transition: all 1s;
  border-top: 2px solid black;

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

const ProfileWrapper = styled.div`
  width: 1500px;
  height: 100%;
  border-right: 5px solid black;
  border-bottom: 5px solid black;
  padding: 50px 200px;
`;
const ProfileCardHeadline = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;
const ProfileCardContainer = styled.div`
  width: 1100px;
  height: 600px;
  margin: 40px 0;
  border-radius: 20px;
  box-shadow: 1px 1px 9px gray;
  padding: 20px;
  background: ${(props) =>
    props.editMode ? props.cardColor.blur : props.cardColor.main};
`;

const ProfileCardEditLine = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  ${(props) =>
    props.editMode
      ? css`
          border: 4px dotted gray;
        `
      : css`
          border: 4px solid rgb(255, 236, 157);
        `};
  background: transparent;
`;

const ProfileCardNav = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  padding: 30px 20px;
`;

const ProfileCardColorPicker = styled.div`
  margin: 5px 10px;
  ${(props) =>
    props.editMode
      ? css`
          display: flex;
        `
      : css`
          display: none;
        `}
`;

const Color = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 10px;
  border-radius: 50%;
  cursor: pointer;
  background: ${(props) => props.color};
`;

const ProfileEditToggle = styled.div`
  width: 30px;
  height: 30px;
  margin-left: auto;
  font-size: 1.5rem;
  cursor: pointer;
  color: gray;
`;
const ProfileDetail = styled.div`
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
`;

const ProfileImg = styled.div`
  width: 500px;
  height: 100%;
  padding: 80px 100px;
`;

const ProfileImgAdjust = styled.div`
  width: 300px;
  height: 300px;
  background: white;
  border-radius: 50%;

  img {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    opacity: ${(props) => (props.editMode ? "50%" : "100%")};
    object-fit: cover;
    object-position: center;
  }
  form {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px;

    label {
      font-size: 1.5rem;
      border-radius: 20px;
      background: ${(props) => props.cardColor.main};
      width: 200px;
      height: 60px;
      text-align: center;
      line-height: 2.5;
      font-weight: 600;
      box-shadow: 1px 1px 7px #aaa;
      cursor: pointer;
      display: ${(props) => (props.editMode ? "block" : "none")};
      &:active {
        box-shadow: inset 1px 1px 7px #aaa;
      }
    }
  }
`;

const ProfileItemsContainer = styled.div`
  width: calc(100% - 500px);
  height: 100%;
  padding: 80px 50px;
  display: flex;
  flex-direction: column;
`;

const ProfileItems = styled.div`
  width: 600px;
  height: 60px;
  border: none;
  margin: 20px;
  border-bottom: 1px solid #ddd;
  transition: all 0.5s;
  &:focus-within {
    border-bottom: 1px solid ${(props) => props.cardColor.input};
    label {
      color: ${(props) => props.cardColor.input};
    }
  }
  label {
    font-size: 1.5rem;
    color: gray;
    font-weight: 600;
    padding: 20px;
    width: 180px;
    display: inline-block;
  }
  input {
    background: transparent;
    padding: 10px 0 25px 0;
    width: 400px;
    border: none;
    height: 64px;
    font-size: 1.4rem;
    font-weight: bold;
  }
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
  return (
    <ProfileWrapper>
      <ProfileCard />
    </ProfileWrapper>
  );
}

export function ProfileCard() {
  const colorpick = {
    red: {
      main: "#F7CA96",
      blur: "#f3ddc3",
      input: "#e27d02",
    },
    yellow: {
      main: "#ffec9d",
      blur: "#fffce9",
      input: "#eece00",
    },
    green: {
      main: "#E6EE89",
      blur: "#e4e7be",
      input: "#a5b100",
    },
  };
  const [editMode, setEditMode] = useState(false);
  const [cardColor, setCardColor] = useState(colorpick.yellow);
  const [profileImg, setProfileImg] = useState(
    `${process.env.PUBLIC_URL}/images/profile-sample.jpg`
  );

  const handleColor = (color) => {
    setCardColor(color);
  };

  const handleEditMode = () => {
    setEditMode(true);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    if (theFile) {
      reader.readAsDataURL(theFile);
      reader.onloadend = (finishedEvent) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        setProfileImg(result);
      };
    }
  };

  return (
    <>
      <ProfileCardHeadline>내 프로필</ProfileCardHeadline>
      <ProfileCardContainer editMode={editMode} cardColor={cardColor}>
        <ProfileCardEditLine editMode={editMode}>
          <ProfileCardNav>
            <ProfileCardColorPicker editMode={editMode}>
              <Color
                color={colorpick.red.main}
                onClick={() => handleColor(colorpick.red)}
              />
              <Color
                color={colorpick.yellow.main}
                onClick={() => handleColor(colorpick.yellow)}
              />
              <Color
                color={colorpick.green.main}
                onClick={() => handleColor(colorpick.green)}
              />
            </ProfileCardColorPicker>
            <ProfileEditToggle onClick={handleEditMode}>
              {editMode ? <MdOutlineModeEditOutline /> : <></>}
            </ProfileEditToggle>
          </ProfileCardNav>
          <ProfileDetail>
            <ProfileImg>
              <ProfileImgAdjust cardColor={cardColor} editMode={editMode}>
                <img src={profileImg} alt="" />
                <form>
                  <input
                    id="file"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="file">사진 바꾸기</label>
                </form>
              </ProfileImgAdjust>
            </ProfileImg>
            <ProfileItemsContainer>
              <ProfileItems cardColor={cardColor}>
                <label>이름</label>
                <input />
              </ProfileItems>
              <ProfileItems cardColor={cardColor}>
                <label>닉네임</label>
                <input />
              </ProfileItems>
              <ProfileItems cardColor={cardColor}>
                <label>전화번호</label>
                <input />
              </ProfileItems>
            </ProfileItemsContainer>
          </ProfileDetail>
        </ProfileCardEditLine>
      </ProfileCardContainer>
    </>
  );
}
export function ProjectInProgress({ userData, setUserData }) {
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
