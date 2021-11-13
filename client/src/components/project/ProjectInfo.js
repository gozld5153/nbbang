import React from "react";
import styled from "styled-components";

export default function ProjectInfo({
  projectModalOpener,
  memberModalOpener,
  projectInfo,
  member,
}) {
  //기능 clear
  return (
    <Container>
      <ProjectInfomation>
        <ProjectInfoContainer>
          <ProjectName>
            <div>{projectInfo.project_name}</div>
          </ProjectName>
          <ProjectSettings>
            <img
              onClick={projectModalOpener}
              src={`${process.env.PUBLIC_URL}/images/settings.png`}
              alt="setting"
            />
          </ProjectSettings>
          <ProjectDue>
            {projectInfo.deadline}
          </ProjectDue>
          <button onClick={memberModalOpener}>초대버튼</button>
        </ProjectInfoContainer>
        <ProjectMember>
          {member.map((el) => (
            <Profile len={5} key={el.id} src={el.profile} alt={el.username} />
          ))}
        </ProjectMember>
      </ProjectInfomation>
      <ProjectProgress>
        <RateContainer>
          <RateFrame>
            <RateName>프로젝트 진행률</RateName>
            <RateBar important={projectInfo.progress} color="blue" />
            <RateBar important={projectInfo.total_important} color="white" />
          </RateFrame>
        </RateContainer>
        <RateContainer>
          <RateFrame>
            <RateName>팀원 상대 진행률</RateName>
            {member.map((el) => (
              <RateBar important={el.progress} color={el.color} key={el.id} />
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
  width: 100vw;
`;

const ProjectInfomation = styled.div`
  display:inherit;
  justify-content:space-between;
  align-items:flex-end;
`;

const ProjectInfoContainer = styled.div`
  display:inherit;
`;

const ProjectName = styled.div`
  width: 10rem;
`;

const ProjectSettings = styled.div`
  width: 10rem;

  img{
    width:5rem;
  }
`;

const ProjectDue = styled.div`
  width: 10rem;
`;

const ProjectMember = styled.div`
`;

const Profile = styled.img`
  width: ${(props) => `${props.len}rem`};
  height: ${(props) => `${props.len}rem`};
  border-radius:${(props) => `${props.len / 2}rem`};
  overflow:hidden;
`;

const ProjectProgress = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 6rem;
`;

const RateContainer = styled.div`
  width: 95vw;
  height: 3rem;
`;



const RateFrame = styled.div`
  position:relative;
  display:flex;
  width: inherit;
  height: 2rem;
  margin: 0.5rem 0 0.5rem 0;
`;

const RateName = styled.div`
  position:absolute;
  font-size:2rem;
`;

const RateBar = styled.div`
  flex-grow:${(props)=> props.important};
  height:inherit;
  background-color: ${(props) => props.color}
`;