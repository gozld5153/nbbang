import React, { useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Link, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { GrProjects } from "react-icons/gr";
import { VscProject } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import { FcCheckmark } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import Progressbar from "../components/utils/Progressbar";
import { Done } from "../mockdata/MyPageProjectData";
import ProjectPagePagination from "../components/utils/ProjectPagePagination";

const rotation = keyframes`
  0% {
    transform: rotate(0deg)
  }
  
  100% {
    transform: rotate(360deg)
  }

`;

const loadingCircle = keyframes`
0% {
  stroke-dashoffset: 70;
}

75% {
  stroke-dashoffset: -70;
}

100% {
  stroke-dashoffset: -70;
}

`;

const loadingSpin = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const strokeEffect = keyframes`
0% {
  stroke-dashoffset: 1040;
  stroke-dasharray: 0px 999999px;
  opacity: 0;
}
99% {
  stroke-dasharray: 1350px 1050px;
}
100% {
  stroke-dashoffset: 0.001;
  stroke-dasharray: none;
  opacity: 0.4;
}
`;
const MyPageWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 800px;
  overflow: hidden;
`;

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 200px;
  border-right: 5px solid black;
`;

const NavProfileImg = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${process.env.PUBLIC_URL}/images/profile-sample.jpg);
  background-position: center;
  background-size: cover;
`;

const NavItems = styled(Link)`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  text-align: center;
  /* transition: all 1s; */
  border-top: 2px solid black;
`;
const NavIcons = styled.div`
  width: 100%;
  position: relative;
  top: -100px;
  z-index: 10;
  svg {
    margin: 20px auto;
    font-size: 2rem;
    display: block;
  }
`;
const ProfileWrapper = styled.div`
  width: 1470px;
  height: 100%;
  padding: 50px 100px;
`;
const ProfileCardHeadline = styled.h2`
  font-size: 2rem;
  font-weight: bold;
`;
const ProfileCardContainer = styled.div`
  width: 100%;
  height: 600px;
  margin: 30px 0;
  border-radius: 20px;
  box-shadow: 1px 1px 9px gray;
  padding: 20px;
  background: ${(props) =>
    props.editMode
      ? props.cardColor.blur
      : `linear-gradient(to right, ${props.cardColor.blur} 15%, ${props.cardColor.main} 100%) `};
`;

const ProfileCardEditLine = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: ${(props) =>
    props.editMode ? "4px dotted gray" : `4px solid transparent`};
  background: transparent;
`;

const ProfileCardNav = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  padding: 20px;
`;

const ProfileCardNavHeadline = styled.div`
  margin-left: 900px;
  font-style: italic;
  color: gray;
  font-size: 1.2rem;
  line-height: 1.3;
`;

const ProfileCardColorPicker = styled.div`
  margin: 5px 10px;
  display: flex;
  z-index: 2;
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
  height: 30px;
  margin-left: auto;
  font-size: 2rem;
  cursor: pointer;
  color: gray;
  display: flex;
  svg {
    margin-left: 5px;
  }
`;

const ProfileEditComplete = styled.div`
  cursor: pointer;
  margin-right: 10px;

  .loading-circle {
    animation: ${loadingSpin} 4s infinite;
    width: 30px;
    height: 30px;
  }

  .loading-circle circle {
    stroke: black;
    stroke-width: 3;
    fill: transparent;
    stroke-dasharray: 75;
    stroke-dashoffset: 0;
    animation: ${loadingCircle} 2s infinite;
  }
`;
const ProfileDetail = styled.div`
  width: 100%;
  display: flex;
`;

const ProfileImg = styled.div`
  width: 500px;
  height: 100%;
  padding: 30px 100px;

  > img {
    position: relative;
    z-index: 0;
    left: -100px;
    top: -50px;
    width: 480px;
    opacity: ${(props) => (props.editMode ? "20%" : "60%")};
    animation: ${rotation} 60s infinite linear;
  }
`;

const ProfileImgAdjust = styled.div`
  width: 300px;
  height: 300px;
  background: white;
  border-radius: 50%;
  position: relative;
  top: -410px;
  left: -10px;

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
      font-size: 1.3rem;
      position: relative;
      bottom: -40px;
      border-radius: 20px;
      background: ${(props) => props.cardColor.main};
      width: 150px;
      height: 50px;
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
  padding: 25px 50px 25px 50px;
  display: flex;
  flex-direction: column;

  img {
    max-width: 100px;
    margin-left: auto;
    opacity: ${(props) => (props.editMode ? "50%" : "100%")};
  }
  span {
    margin-left: 560px;
    font-weight: 700;
    font-size: 2rem;
    opacity: ${(props) => (props.editMode ? "50%" : "100%")};
  }

  > div.line {
    height: 300px;
    width: 10px;
    position: relative;
    top: -400px;
    left: -55px;
    border-left: ${(props) => (props.editMode ? "none" : `3px dashed gray`)};
  }
`;

const ProfileItems = styled.div`
  width: 600px;
  height: 60px;
  border: none;
  margin: 20px;
  border-bottom: ${(props) => (props.editMode ? "1px solid #ddd" : "none")};
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
    letter-spacing: 0.1rem;
    background: transparent;
    padding: 10px 0 25px 0;
    width: 350px;
    border: none;
    height: 64px;
    font-size: 1.4rem;
    font-weight: bold;
  }
  div {
    position: relative;
    border-top: ${(props) => (props.editMode ? "none" : "3px dashed gray")};
    width: 60px;
    top: -40px;
    left: -70px;
  }
`;

const ProjectWrapper = styled.div`
  width: 1479.5px;
  height: 100%;
  padding: 20px 50px;
`;

const ProjectColumnName = styled.div`
  display: flex;
  width: 100%;
  height: 60px;

  > span {
    color: gray;
    font-weight: 600;
    font-size: 1.3rem;
    padding: 20px 0 20px 30px;
  }

  > span:nth-of-type(1) {
    width: 400px;
  }
  > span:nth-of-type(2) {
    width: 380px;
  }
  > span:nth-of-type(3) {
    width: 380px;
  }
  > span:nth-of-type(4) {
    width: 200px;
  }
`;
const ProjectContainer = styled.div`
  width: 100%;
  height: 650px;
  display: flex;
  flex-direction: column;
`;

const ProjectItems = styled.div`
  width: 100%;
  margin-bottom: 30px;
  height: 100px;
  border-radius: 20px;
  background-color: #fefefe;
  box-shadow: 1px 1px 5px #ccc;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: #eeeeee;
  }
`;

const ProjectName = styled.div`
  display: flex;
  padding: 20px;
  width: 400px;
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
  width: 380px;
  padding: 20px;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 3px 10px;
  }
`;
const ProjectProgress = styled.div`
  width: 380px;
  padding: 30px 0px 0px 40px;
  position: relative;
  top: 10px;
`;
const ProjectContribution = styled.div`
  width: 200px;
  font-size: 1.5rem;
  font-family: "Anton", sans-serif;
  padding: 35px 70px;
`;

const ProjectDescription = styled.div`
  width: 380px;
  padding: 40px 40px;
  font-size: 1rem;
  font-weight: 600;
`;

const StrokeContainer = styled.div`
  width: 200px;
  padding: 0 20px;

  position: relative;
  top: -100px;
  svg {
    opacity: ${(props) => (props.equel ? 0.4 : 0)};
    position: relative;
    top: 180px;
    z-index: 13;
    stroke-dashoffset: 1040;

    &:hover {
      animation: ${(props) =>
        props.equel
          ? "none"
          : css`
              ${strokeEffect} 1s ease forwards
            `};
    }
  }
`;
function SvgStrokeComponent({ color, here, now }) {
  const equel = here === now;
  console.log(equel);
  return (
    <StrokeContainer equel={equel}>
      <svg viewBox="0 0 205 250">
        <path
          fill="none"
          stroke={color}
          stroke-width="23"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          d="M 189.935 5.842 L 13.903 24.45 c -2.439 0.243 -2.434 0.369 0.012 0.282 l 158.428 30.366 c 2.445 -0.088 2.448 -0.011 0.006 0.171 L 18.392 50.047 c -2.442 0.182 -2.439 0.262 0.006 0.178 l 162.087 25.094 c 2.446 -0.083 2.448 -0.001 0.007 0.184 L 16.895 80.432 c -2.442 0.184 -2.44 0.234 0.005 0.111 l 180.745 40.816 c 2.444 -0.123 2.453 0.035 0.02 0.352 L 7.355 130.158"
        />
      </svg>
    </StrokeContainer>
  );
}
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
  console.log(pathname);
  return (
    <NavContainer>
      <NavProfileImg />
      <NavItems to="profile">
        <SvgStrokeComponent
          color={"#ffdd22"}
          here={pathname}
          now={"/mypage/profile"}
        />
        <NavIcons>
          <CgProfile />
          프로필
        </NavIcons>
      </NavItems>
      <NavItems to="project-inprogress">
        <SvgStrokeComponent
          color={"#d1ef39"}
          here={pathname}
          now={"/mypage/project-inprogress"}
        />
        <NavIcons>
          <GrProjects />
          진행중인 프로젝트
        </NavIcons>
      </NavItems>
      <NavItems to="project-done">
        <SvgStrokeComponent
          color={"#00bfff"}
          here={pathname}
          now={"/mypage/project-done"}
        />
        <NavIcons>
          <VscProject />
          완료한 프로젝트
        </NavIcons>
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
    pink: {
      main: "#ffb1ee",
      blur: "#fde6f8",
      input: "#bb0092",
    },
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
    skyblue: {
      main: "#72dbf5",
      blur: "#c5f3ff",
      input: "#007592",
    },
    purple: {
      main: "#ac90fa",
      blur: "#dbcffd",
      input: "#3100b9",
    },
  };
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [cardColor, setCardColor] = useState(colorpick.yellow);
  const [profileImg, setProfileImg] = useState(
    `${process.env.PUBLIC_URL}/images/profile-sample.jpg`
  );

  const handleColor = (color) => {
    setCardColor(color);
  };

  const handleEditMode = () => {
    setEditMode(!editMode);
    setIsLoading(false);
    setIsComplete(false);
  };

  const handleEditComplete = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsComplete(true);
    }, 2000);
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
        <ProfileCardEditLine editMode={editMode} cardColor={cardColor}>
          <ProfileCardNav>
            {editMode ? (
              <ProfileCardColorPicker>
                <Color
                  color={colorpick.pink.main}
                  onClick={() => handleColor(colorpick.pink)}
                />
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
                <Color
                  color={colorpick.skyblue.main}
                  onClick={() => handleColor(colorpick.skyblue)}
                />
                <Color
                  color={colorpick.purple.main}
                  onClick={() => handleColor(colorpick.purple)}
                />
              </ProfileCardColorPicker>
            ) : (
              <ProfileCardNavHeadline>
                나만의 프로필을 설정해보세요!
              </ProfileCardNavHeadline>
            )}

            <ProfileEditToggle>
              {editMode ? (
                <>
                  <ProfileEditComplete onClick={handleEditComplete}>
                    {isComplete ? (
                      <FcCheckmark />
                    ) : isLoading ? (
                      <svg className="loading-circle">
                        <circle cx="50%" cy="50%" r="12"></circle>
                      </svg>
                    ) : (
                      <FiCheck />
                    )}
                  </ProfileEditComplete>
                  <div onClick={handleEditMode}>
                    <FaTimes />
                  </div>
                </>
              ) : (
                <div onClick={handleEditMode}>
                  <MdOutlineModeEditOutline />
                </div>
              )}
            </ProfileEditToggle>
          </ProfileCardNav>
          <ProfileDetail>
            <ProfileImg editMode={editMode}>
              <img
                src={`${process.env.PUBLIC_URL}/images/nbbang-logo-rotation.png`}
                alt=""
              />
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
            <ProfileItemsContainer editMode={editMode}>
              <ProfileItems cardColor={cardColor} editMode={editMode}>
                <label>
                  이름&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                </label>
                <input disabled={!editMode} />
                <div className={"line"} />
              </ProfileItems>
              <ProfileItems cardColor={cardColor} editMode={editMode}>
                <label>닉네임&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
                <input disabled={!editMode} />
                <div className={"line"} />
              </ProfileItems>
              <ProfileItems cardColor={cardColor} editMode={editMode}>
                <label>전화번호&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</label>
                <input disabled={!editMode} />
                <div className={"line"} />
              </ProfileItems>

              <img
                src={`${process.env.PUBLIC_URL}/images/nbbang-logo.png`}
                alt=""
              />
              <span>N 빵</span>
              <div className={"line"} />
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
        <span>프로젝트 현재 진행도</span>
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
      <ProjectContribution>{project.contribution} %</ProjectContribution>
    </ProjectItems>
  );
}
