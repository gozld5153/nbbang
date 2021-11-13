import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'

import Goal from './Goal'
import GoalCreateModal from "./GoalCreateModal";

import GoalMockData from '../../mockdata/GoalMockData'

export default function ProjectField({ myInfo, projectId, params }) {
  const { todo, progress, complete } = GoalMockData.data;
  const [isTodo, setIsTodo] = useState([]);
  const [isProgress, setIsProgress] = useState([]);
  const [isComplete, setIsComplete] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const goalList = [isTodo, isProgress, isComplete];
  const goalListText = ["To Do", "Progress", "Complete"];

  const pathname = useLocation();
  const navigate = useNavigate();

  const createModalOpener = () => {
    setIsCreateOpen(!isCreateOpen);
  };

  useEffect(() => {
    setIsTodo([...todo]);
    setIsProgress([...progress]);
    setIsComplete([...complete]);
    axios
      .get(`http://server.nbbang.ml/goal?project_id=${params}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("axios 요청 결과: ", res.data.data);
        // setIsTodo([...res.data.data.todo]);
        // setIsProgress([...res.data.data.progress]);
        // setIsComplete([...res.data.data.complete]);
      });
  }, []);

  return (
    <Container>
      {goalList.map((el, idx) => (
        <GoalList key={idx}>
          <GoalState>{goalListText[Number(idx)]}</GoalState>
          <PlusButton
            isVisible={goalListText[Number(idx)]}
            src={`${process.env.PUBLIC_URL}/images/add.png`}
            onClick={createModalOpener}
          />
          {el.map((goal) => (
            <div
              onClick={() =>
                navigate(`./${goal.id}`, {
                  state: {
                    myInfo: {
                      id: myInfo.id,
                      username: myInfo.username,
                      like_id: myInfo.like_id
                    }
                  },
                  replace: false,
                })
              }
              key={goal.id}
            >
              <Goal goalInfo={goal} />
            </div>
          ))}
        </GoalList>
      ))}
      <GoalCreateModal
        isCreateOpen={isCreateOpen}
        createModalOpener={createModalOpener}
        isTodo={isTodo}
        myInfo={myInfo}
        setIsTodo={setIsTodo}
        projectId={projectId}
      />
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  display:flex;
  justify-content:space-between;
  width:100vw;
  min-height: 70vh;
  padding: 0 10rem 0 10rem;
`;

const GoalList = styled.div`
  position: relative;
  width: 26rem;
`;

const GoalState = styled.div`
  height:3rem;
`;

const PlusButton = styled.img`
  position: absolute;
  display: ${(props) => (props.isVisible === "To Do" ? "default" : "none")};
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
`;