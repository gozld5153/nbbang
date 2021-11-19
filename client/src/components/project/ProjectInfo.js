import React from "react";
import styled from "styled-components";

import ProjectModal from "./ProjectModal";
import MemberModal from "./MemberModal";

export default function ProjectInfo({
  projectModalOpener,
  memberModalOpener,
  projectInfo,
  member,
  isProjectOpen,
  DataHandler,
  isMemberOpen,
  setMember,
  setUpdate,
  update,
}) {
  console.log('info', member)
  return (
    <Container>
      <ProjectInfomation>
        <ProjectInfoContainer>
          <ProjectNameContainer>
            <ProjectName onClick={projectModalOpener}>
              {projectInfo.projectName}
            </ProjectName>
            <ProjectModal
              isProjectOpen={isProjectOpen}
              projectModalOpener={projectModalOpener}
              member={member}
              projectInfo={projectInfo}
              DataHandler={DataHandler}
              setUpdate={setUpdate}
              update={update}
            />
          </ProjectNameContainer>
          <ProjectDueContainer>
            <ProjectDue>{projectInfo.deadline}</ProjectDue>
          </ProjectDueContainer>
        </ProjectInfoContainer>
        <MemberContainer>
          <Invite onClick={memberModalOpener}>INVITE</Invite>
          <ProjectMember>
            {member.map((el) => (
              <ProfileContainer len={5} color={el.color} key={el.id}>
                <Profile
                  len={5}
                  src={`${process.env.REACT_APP_S3_IMG}/${el.profile}`}
                  alt={el.username}
                />
              </ProfileContainer>
            ))}
            <MemberModal
              isMemberOpen={isMemberOpen}
              memberModalOpener={memberModalOpener}
              member={member}
              projectInfo={projectInfo}
              setMember={setMember}
            />
          </ProjectMember>
        </MemberContainer>
      </ProjectInfomation>
      <ProjectProgress>
        <RateContainer>
          <RateFrame>
            <RateName>
              프로젝트 진행률
              {/* {`${
                (projectInfo.completeImportant / projectInfo.allImportant) * 100
              }%`} */}
            </RateName>
            <RateBar
              important={projectInfo.completeImportant}
              color="#AFAFAF"
            />
            <RateBar
              important={
                projectInfo.allImportant - projectInfo.completeImportant
              }
              color="black"
            />
          </RateFrame>
        </RateContainer>
        <RateContainer>
          <RateFrame>
            <RateName>팀원 상대 진행률</RateName>
            {member.map((el) => (
              <RateBar
                important={el.myCompleteImportant}
                color={el.color}
                key={el.id}
              />
            ))}
          </RateFrame>
        </RateContainer>
      </ProjectProgress>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectInfomation = styled.div`
  display: inherit;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
  background-color: #ffffff;
`;
const ProjectInfoContainer = styled.div`
  display: inherit;
`;
const ProjectNameContainer = styled.div`
  position: relative;
  display: inherit;
  justify-content: center;
  align-items: center;
`;
const ProjectName = styled.div`
  font-family: "Anton", sans-serif;
  font-size: 3rem;
  color: white;
  padding: 1rem;
  cursor: pointer;
  background-color: black;
`;
const ProjectDueContainer = styled.div`
  display: inherit;
  align-items: center;
  margin-left: 1rem;
`;
const ProjectDue = styled.div`
  font-size: 3rem;
  font-family: "Anton", sans-serif;
`;
const MemberContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;
const Invite = styled.div`
  font-size: 1.5rem;
  font-family: "Anton", sans-serif;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  margin-right: 0.5rem;
  padding-bottom: 0.3rem;
  cursor: pointer;
`;
const ProjectMember = styled.div`
  position: relative;
  display: flex;
`;
const ProfileContainer = styled.div`
  width: ${(props) => `${props.len}rem`};
  height: ${(props) => `${props.len}rem`};
  border-radius: ${(props) => `${props.len / 2}rem`};
  overflow: hidden;
  background-color: ${(props) => props.color};
  margin-left: 0.5rem;

  :first-child {
    margin: 0;
  }
`;
const Profile = styled.img`
  width: ${(props) => `${props.len}rem`};
  height: ${(props) => `${props.len}rem`};
  border-radius: ${(props) => `${props.len / 2}rem`};
`;

const ProjectProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  margin: 0 1rem 1rem;
  padding: 1rem;
  background-color: #ffffff;
`;
const RateContainer = styled.div`
  width: 98%;
  height: 3rem;
  background-color: black;

  :first-child {
    margin-bottom: 0.5rem;
  }
`;
const RateFrame = styled.div`
  position: relative;
  display: flex;
  height: 3rem;
  border-radius: 0.5rem;
  /* margin: 0.5rem 0 0.5rem 0; */
`;
const RateName = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size: 2rem;
  font-family: Architects + Daughter;
  color: #ffffff;
`;
const RateBar = styled.div`
  flex-grow: ${(props) => props.important};
  height: inherit;
  background-color: ${(props) => props.color};
`;
