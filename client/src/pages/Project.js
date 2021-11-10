import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProjectInfo from "../components/project/ProjectInfo"
import ProjectField from "../components/project/ProjectField"
import ProjectModal from '../components/project/ProjectModal'
import projectMockData from '../mockData/ProjectMockData';

export default function Project() {
  const [isProjectOpen, setIsProjectOpen] = useState(false)

  const { user_data, project_info } = projectMockData.data
  const [myInfo, setMyInfo] = useState({})
  const [projectInfo, setProjectInfo] = useState({})
  const [member, setMember] = useState([])

  useEffect(() => {
    setMyInfo(user_data)
    setProjectInfo({
      id: project_info.id,
      project_name: project_info.project_name,
      captain_id: project_info.captain_id,
      state: project_info.state,
      total_important: project_info.total_important,
      progress: project_info.progress,
      deadline: project_info.deadline
    })
    setMember([...project_info.member])
  }, [])

  const projectModalOpener = () => {
    setIsProjectOpen(!isProjectOpen)
  }
  return (
    <Container>
      <ProjectInfo projectModalOpener={projectModalOpener} myInfo={myInfo} projectInfo={projectInfo} member={member} ></ProjectInfo>
      <ProjectField></ProjectField>
      <ProjectModal isProjectOpen={isProjectOpen}></ProjectModal>
    </Container>
  )
}

const Container = styled.div`
  display:flex;
  flex-direction:column;
  width:100vw;
  min-height: 93vh;
  margin-top:7vh;
`;
