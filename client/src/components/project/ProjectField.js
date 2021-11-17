import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import Goal from "./Goal";
import GoalCreateModal from "./GoalCreateModal";


export default function ProjectField({ myInfo, projectId, params, member, myLike,update,setUpdate }) {

  const [isTodo, setIsTodo] = useState([]);
  const [isProgress, setIsProgress] = useState([]);
  const [isComplete, setIsComplete] = useState([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const goalList = [isTodo, isProgress, isComplete];
  const goalListText = ["To Do", "Progress", "Complete"];

  const navigate = useNavigate();

  const createModalOpener = () => {
    setIsCreateOpen(!isCreateOpen);
  };

  useEffect(() => {
    if (update) {
      setUpdate(false);
    } else {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/goal?projectId=${params.projectId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          setIsTodo([...res.data.data.todo]);
          setIsProgress([...res.data.data.progress]);
          setIsComplete([...res.data.data.complete]);
        });
    }
  }, [update]);

  console.log("fieldGoal :", goalList);
  return (
    <Container>
      <Frame>
        {goalList.map((el, idx) => (
          <GoalList key={idx}>
            <GoalState>{goalListText[Number(idx)]}</GoalState>
            <PlusButton
              isVisible={goalListText[Number(idx)]}
              src={`${process.env.PUBLIC_URL}/images/add.png`}
              onClick={createModalOpener}
            />
            {el.length ? (
              <>
                <GoalContainer>
                  {el.map((goal) => (
                    <div
                      onClick={() =>
                      {
                        navigate(`./${goal.id}`, {
                          replace: false,
                        })
                      }
                      }
                      key={goal.id}
                    >
                      <Goal goalInfo={goal} member={member} myLike={myLike} />
                    </div>
                  ))}
                </GoalContainer>
              </>
            ) : (
              <NothingHereContainer>
                <NothingHere
                  src={`${process.env.PUBLIC_URL}/images/empty.jpeg`}
                />
              </NothingHereContainer>
            )}
          </GoalList>
        ))}
        <GoalCreateModal
          isCreateOpen={isCreateOpen}
          createModalOpener={createModalOpener}
          isTodo={isTodo}
          myInfo={myInfo}
          setIsTodo={setIsTodo}
          projectId={projectId}
          update={update}
          setUpdate={setUpdate}

        />
        <Outlet />
      </Frame>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Frame = styled.div`
  display: flex;
  justify-content: space-around;
`;

const GoalList = styled.div`
  position: relative;
  width: 28rem;
  height: 40rem;
  margin-bottom: 3rem;
  padding: 1rem 2rem;
  background-color: #ffffff;
`;

const GoalContainer = styled.div`
  height: 32.5rem;
  overflow: scroll;
`;

const GoalState = styled.div`
  height: 3rem;
  font-size: 3rem;
  font-family: anton;
  margin: 0.5rem 0 1rem 0.5rem;
`;

const PlusButton = styled.img`
  position: absolute;
  display: ${(props) => (props.isVisible === "To Do" ? "default" : "none")};
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  cursor: pointer;
`;

const NothingHereContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32.5rem;
`;

const NothingHere = styled.img`
  width: 10rem;

  :hover {
    animation-name: wave;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-direction: normal;
    animation-iteration-count: 2;
  }

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(20deg);
    }

    50% {
      transform: rotate(0deg);
    }

    75% {
      transform: rotate(-20deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
`;
