import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'


import ProjectInfo from "../components/project/ProjectInfo"
import ProjectField from "../components/project/ProjectField"
import ProjectModal from '../components/project/ProjectModal'
import MemberModal from '../components/project/MemberModal'
// import projectMockData from '../mockData/ProjectMockdata';

export default function Project({ id }) {
  const params = useParams();
  const navigate = useNavigate();

  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isMemberOpen, setIsMemberOpen] = useState(false);
  const [myInfo, setMyInfo] = useState({
    id: id,
    username: "",
    like_id: [],
  });
  const [projectInfo, setProjectInfo] = useState({
    id: 0,
    project_name: "",
    captain_id: 0,
    state: "progress",
    total_important: 0,
    description:'',
    important: 0,
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
      .get(`http://server.nbbang.ml/project/${params.project_id}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        setMyInfo(res.data.data.user_info);
        setProjectInfo({
          id: res.data.data.project_info.id,
          project_name: res.data.data.project_info.project_name,
          captain_id: res.data.data.project_info.captain_id,
          state: res.data.data.project_info.state,
          description: res.data.data.project_info.description,
          total_important: 10,
          important: res.data.data.project_info.important,
          deadline: '2021.11.12~2021.11.13',
        });
        setMember([...res.data.data.project_info.members]);
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
    </Container>
  );
}

const Container = styled.div`
  display:flex;
  flex-direction:column;
  width:100vw;
  min-height: 93vh;
`;
