import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from 'axios'

import ProjectInfo from "../components/project/ProjectInfo"
import ProjectField from "../components/project/ProjectField"
import ProjectModal from '../components/project/ProjectModal'
import MemberModal from '../components/project/MemberModal'

export default function Project({ id }) {
  const params = useParams();

  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [myInfo, setMyInfo] = useState({
    id: id,
    username: "",
    like_id: [],
  });
  const [projectInfo, setProjectInfo] = useState({
    id: 0,
    projectName: "",
    captainId: 0,
    state: "progress",
    allImportant: 0,
    completeImportant:0,
    description: "",
    deadline: 0,
  });
  const [member, setMember] = useState([
    {
      id: 0,
      username: "",
      email: "",
      profile: "",
      color: "",
      important: 0,
    },
  ]);

  const DataHandler = (key, value) => {
    let newObject = projectInfo;
    newObject[key] = value;
    setProjectInfo({ ...newObject });
  };

  useEffect(() => {
    axios
      .get(`http://server.nbbang.ml/project/${params.projectId}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setMyInfo(res.data.data.userInfo);
        setProjectInfo({
          id: res.data.data.projectInfo.id,
          projectName: res.data.data.projectInfo.projectName,
          captain_id: res.data.data.projectInfo.captainId,
          state: res.data.data.projectInfo.state,
          description: res.data.data.projectInfo.description,
          allImportant: res.data.data.projectInfo.allImportant,
          completeImportant: res.data.data.projectInfo.completeImportant,
          deadline: res.data.data.projectInfo.deadline,
        });
        setMember([...res.data.data.projectInfo.members]);
      })
      .catch((err) => console.log(err));
  }, []);

  const projectModalOpener = () => {
    setIsProjectOpen(!isProjectOpen);
  };
  const memberModalOpener = () => {
    setIsMemberOpen(!isMemberOpen);
  };
  return (
    <Container>
      <ProjectFrame>
        <ProjectInfo
          projectModalOpener={projectModalOpener}
          memberModalOpener={memberModalOpener}
          myInfo={myInfo}
          projectInfo={projectInfo}
          member={member}
        />
        <ProjectField
          myInfo={myInfo}
          projectId={projectInfo.id}
          params={params}
        />
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
          projectInfo={projectInfo}
          setMember={setMember}
        />
      </ProjectFrame>
    </Container>
  );
}

const Container = styled.div`
  display:flex;
  flex-direction:column;
  min-height: 93vh;
`;

const ProjectFrame = styled.div`
`;