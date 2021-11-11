import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Goal from './Goal'
import GoalCreateModal from "./GoalCreateModal";
import GoalModal from './GoalModal'

import GoalMockData from '../../mockData/GoalMockData'

export default function ProjectField({ myInfo }) {
  const { todo, progress, complete } = GoalMockData.data;
  const [isTodo, setIsTodo] = useState([]);
  const [isProgress, setIsProgress] = useState([]);
  const [isComplete, setIsComplete] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const goalList = [isTodo, isProgress, isComplete];
  const goalListText = ["To Do", "Progress", "Complete"];

  const createModalOpener = () => {
    setIsCreateOpen(!isCreateOpen);
  };

  const GoalOpener = (goal_id) => { 

  }

  useEffect(() => {
    setIsTodo([...todo]);
    setIsProgress([...progress]);
    setIsComplete([...complete]);
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
            <div onClick={() => GoalOpener(goal.id)}>
              <Goal goalInfo={goal} key={goal.id} />
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
      />
      {/* <GoalModal /> */}
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