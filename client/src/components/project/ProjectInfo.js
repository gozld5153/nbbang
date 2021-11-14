import React from "react";
import styled from "styled-components";

export default function ProjectInfo({
  projectModalOpener,
  memberModalOpener,
  projectInfo,
  member,
}) {
  return (
    <Container>
      <ProjectInfomation>
        <ProjectInfoContainer>
          <ProjectNameContainer>
            <ProjectName onClick={projectModalOpener}>
              {projectInfo.projectName}
            </ProjectName>
          </ProjectNameContainer>
          <ProjectDueContainer>
            <ProjectDue>{projectInfo.deadline}</ProjectDue>
          </ProjectDueContainer>
        </ProjectInfoContainer>
        <MemberContainer>
          <Invite onClick={memberModalOpener}>INVITE</Invite>
          <ProjectMember>
            {member.map((el) => (
              <ProfileContainer len={5}>
                <Profile
                  len={5}
                  key={el.id}
                  src={el.profile}
                  alt={el.username}
                />
              </ProfileContainer>
            ))}
          </ProjectMember>
        </MemberContainer>
      </ProjectInfomation>
      <ProjectProgress>
        <RateContainer>
          <RateFrame>
            <RateName>프로젝트 진행률</RateName>
            <RateBar
              important={projectInfo.completeImportant}
              color="#AFAFAF"
            />
            <RateBar important={projectInfo.allImportant} color="black" />
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
  display:flex;
  flex-direction:column;
`;


const ProjectInfomation = styled.div`
  display: inherit;
  justify-content: space-between;
  align-items: center;
  margin:1rem;
  padding: 1rem;
  background-color: #ffffff;
`;
const ProjectInfoContainer = styled.div`
  display:inherit;
`;
const ProjectNameContainer = styled.div`
  display: inherit;
  justify-content:center;
  align-items:center;
`;
const ProjectName = styled.div`
  font-family: "Anton", sans-serif;
  font-size: 3rem;
  color: white;
  padding: 1rem;
  background-color: black;
`;
// const ProjectSettings = styled.div`
//   display: inherit;
//   align-items: flex-start;

//   img {
//     width: 2rem;
//     border-radius: 50%;
//     cursor:pointer;
//   }
// `;
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
  display:flex;
  align-items:flex-end;
`;
const Invite = styled.div`
  font-size:1.5rem;
  font-family: "Anton", sans-serif;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  margin-right:0.5rem;
  padding-bottom:0.3rem;
  cursor:pointer;
`;
const ProjectMember = styled.div`
`;
const ProfileContainer = styled.div`
  width: ${(props) => `${props.len}rem`};
  height: ${(props) => `${props.len}rem`};
  border-radius: ${(props) => `${props.len / 2}rem`};
  overflow: hidden;
  background-color:black;
`;
const Profile = styled.img`
  width: ${(props) => `${props.len}rem`};
  height: ${(props) => `${props.len}rem`};
  border-radius:${(props) => `${props.len / 2}rem`};
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
  position:relative;
  display:flex;
  height: 3rem;
  border-radius: 0.5rem;
  /* margin: 0.5rem 0 0.5rem 0; */
`;
const RateName = styled.div`
  position:absolute;
  top: 0.5rem;
  left: 0.5rem;
  font-size:2rem;
  /* font-family: ; */
  color:#ffffff
`;
const RateBar = styled.div`
  flex-grow:${(props)=> props.important};
  height:inherit;
  background-color: ${(props) => props.color}
`;