import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProjectInfo from "../components/project/ProjectInfo"
import ProjectField from "../components/project/ProjectField"
import ProjectModal from '../components/project/ProjectModal'
import MemberModal from '../components/project/MemberModal'
import projectMockData from '../mockData/ProjectMockData';

export default function Project() {
  const [isProjectOpen, setIsProjectOpen] = useState(false)
  const [isMemberOpen, setIsMemberOpen] = useState(false);

  const { user_data, project_info } = projectMockData.data
  const [myInfo, setMyInfo] = useState({
    id: 0,
    username: "",
    like_id: [],
  });
  const [projectInfo, setProjectInfo] = useState({
    id: 0,
    project_name: "",
    captain_id: 0,
    state: "progress",
    total_important: 0,
    progress: 0,
    deadline: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  const [member, setMember] = useState([
    {
      id: 0,
      username: "",
      email: "",
      profile:"",
      color: "",
      progress: 0,
    },
  ]);

  const DataHandler = (key, value) => {
    let newObject = projectInfo;
    newObject[key] = value;
    setProjectInfo({ ...newObject });
  };

  useEffect(() => {
    setMyInfo(user_data);
    setProjectInfo({
      id: project_info.id,
      project_name: project_info.project_name,
      captain_id: project_info.captain_id,
      state: project_info.state,
      description: project_info.description,
      total_important: project_info.total_important,
      progress: project_info.progress,
      deadline: project_info.deadline,
    });
    setMember([...project_info.member]);
  }, [myInfo]);

  const projectModalOpener = () => {
    setIsProjectOpen(!isProjectOpen)
  }
  const memberModalOpener = () => {
    setIsMemberOpen(!isMemberOpen);
  };
  return (
    <Container>
      <ProjectInfo
        projectModalOpener={projectModalOpener}
        memberModalOpener={memberModalOpener}
        myInfo={myInfo}
        projectInfo={projectInfo}
        member={member}
      />
      <ProjectField myInfo={myInfo} />
      <ProjectModal
        isProjectOpen={isProjectOpen}
        projectModalOpener={projectModalOpener}
        member={member}
        projectInfo={projectInfo}
        DataHandler={DataHandler}
      />
      <MemberModal
        isMemberOpen={isMemberOpen}
        memberModalOpener={memberModalOpener}
        member={member}
        setMember={setMember}
      />
    </Container>
  );
}

const Container = styled.div`
  display:flex;
  flex-direction:column;
  width:100vw;
  min-height: 93vh;
`;
