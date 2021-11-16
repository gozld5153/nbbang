import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from 'axios'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";


import getGoalId from '../../mockdata/GoalOneMockData'

export default function GoalModal() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const important = [
    ["사소", 1],
    ["보통", 2],
    ["중요", 3],
  ];
  const state = [["Todo", 'todo'], ['Progress', 'progress'], ['Complete', 'complete']];

  const [goal, setGoal] = useState(getGoalId);
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState('')
  const [selectDate, setSelectDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const DataHandler = (key, value) => {
    let newObject = goal;
    newObject[key] = value;
    setGoal({ ...newObject });
  };
  const deleteGoal = () => {
    axios.delete(`http://server.nbbang.ml/goal/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then(() => {
      navigate(-1);
    });
  }

  const onEdit = () => {
    if (goal.userId === location.state.myInfo.id) {
      setIsEditing(!isEditing);
    } else {
      alert('권한이 없습니다.')
    }
    if (isEditing === true) {
      axios.put(
        `http://server.nbbang.ml/goal`,
        {
          id: params.id,
          userId: location.state.myInfo.id,
          projectId: params.projectId,
          goalName: goal.goalName,
          state:goal.state,
          description:goal.description,
          important:goal.important,
          deadline: goal.deadline,
          Files: goal.Files,
          Comments:goal.Comments
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      ).then((res) => {
        setGoal({ ...goal, id: res.data.data[0] });
      });
    }
  }

  const commentHandler = (e) => {
    if (e.key === "Enter" && comment) {
      axios.post(
        `http://server.nbbang.ml/goal`,
        {
          userId: location.state.myInfo.id,
          projectId: params.projectId,
          goalId: params.id,
          content: e.target.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      ).then((res) => {
        DataHandler("comments", [
          ...goal.Comments,
          {
            id:res.data.data.id,
            projectId: params.projectId,
            userId: location.state.myInfo.id,
            username: location.state.myInfo.username,
            content: e.target.value,
            createdAt: new Date(),
          },
        ]);
        setComment("");
      });
      
    }
  }

  const fileHandler = (e) => {
    axios.post(
      `http://server.nbbang.ml/goal`,
      {
        userId: location.state.myInfo.id,
        projectId: params.projectId,
        goalId: params.id,
        fileName:'',
        description: e.target.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  }

  useEffect(() => {
    axios.get(`http://server.nbbang.ml/goal?goalId=${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }).then((res) => {
      setGoal(res.data.data);
    });
    
  }, []);
  return (
    <Container>
      <ModalContainer>
        <CloseButton
          src={`${process.env.PUBLIC_URL}/images/close.png`}
          alt="close"
          onClick={() => navigate(-1)}
        />
        <EditButton
          src={`${process.env.PUBLIC_URL}/images/edit.png`}
          alt="edit"
          onClick={onEdit}
        />
        <EditContainer isEditing={isEditing}>
          <DeleteButton
            src={`${process.env.PUBLIC_URL}/images/delete.png`}
            alt="delete"
            onClick={deleteGoal}
          />
        </EditContainer>
        <Title>Mission Name</Title>
        <NoEditContainer isEditing={isEditing}>{goal.goalName}</NoEditContainer>
        <EditContainer isEditing={isEditing}>
          <input
            value={goal.goalName}
            onChange={(e) => DataHandler("goalName", e.target.value)}
            placeholder="목표 이름"
            type="text"
          />
        </EditContainer>
        <Title>State</Title>
        <NoEditContainer isEditing={isEditing}>
          {state.filter((el) => goal.state === el[1])[0][0]}
        </NoEditContainer>
        <EditContainer isEditing={isEditing}>
          <ul>
            {state.map((el) => (
              <li onClick={() => DataHandler("state", el[1])} key={el[1]}>
                {el[0]}
              </li>
            ))}
          </ul>
        </EditContainer>
        <Title>Deadline</Title>
        <NoEditContainer isEditing={isEditing}>{goal.deadline}</NoEditContainer>
        <EditContainer isEditing={isEditing}>
          <Daypicker>
            <StyleDatePicker
              selected={selectDate.startDate}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              selectsStart
              endDate={selectDate.endDate}
              placeholderText="From"
              showPopperArrow={false}
              locale={ko}
              monthsShown={2}
              onChange={(date) => {
                setSelectDate({ ...selectDate, startDate: date });
                DataHandler(
                  "deadline",
                  date.toLocaleString().split(" ").join("").slice(0, 10) +
                    "~" +
                    goal.deadline.split("~")[1]
                );
              }}
            />
            <StyleDatePicker
              selected={selectDate.endDate}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              selectsEnd
              startDate={selectDate.startDate}
              placeholderText="To"
              showPopperArrow={false}
              monthsShown={2}
              onChange={(date) => {
                setSelectDate({ ...selectDate, endDate: date });
                DataHandler(
                  "deadline",
                  goal.deadline.split("~")[0] +
                    "~" +
                    date.toLocaleString().split(" ").join("").slice(0, 10)
                );
              }}
            />
          </Daypicker>
        </EditContainer>
        <Title>Important</Title>
        <NoEditContainer isEditing={isEditing}>
          {important.filter((el) => goal.important === el[1])[0][0]}
        </NoEditContainer>
        <EditContainer isEditing={isEditing}>
          <ul>
            {important.map((el) => (
              <li onClick={() => DataHandler("important", el[1])} key={el[1]}>
                {el[0]}
              </li>
            ))}
          </ul>
        </EditContainer>
        <Title>Description</Title>
        <NoEditContainer isEditing={isEditing}>
          {goal.description}
        </NoEditContainer>
        <EditContainer isEditing={isEditing}>
          <textarea
            value={goal.description}
            onChange={(e) => DataHandler("description", e.target.value)}
          />
        </EditContainer>
        <Title>File</Title>
        {goal.Files ? goal.Files.map((el) => el.fileName) : null}
        <input type="file" />
        {
          // 파일 업로드 하는 방법 찾기
        }
        <Title>Comments</Title>
        {goal.Comments
          ? goal.Comments.map((el) => (
              <CommentContainer key={el.id}>
                <div>{el.userId}</div>
                <div>{el.content}</div>
                <div>
                  {`${el.createdAt
                    .toLocaleString()
                    .split(" ")
                    .join("")
                    .slice(0, 10)}`}
                </div>
              </CommentContainer>
            ))
          : null}
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={commentHandler}
        />
        <EditContainer isEditing={isEditing}>
          <button>submit</button>
        </EditContainer>
      </ModalContainer>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30rem;
  border: 0.5rem solid black;
  padding: 1rem;
  background-color: white;

  ul {
    display: flex;
    align-items: flex-end;
  }

  li {
    font-size: 1.4rem;
    margin-right: 0.2rem;
  }

  textarea {
    width: 17rem;
    resize: none;
    margin-bottom: 1.3rem;
  }

  input {
    font-size: 1.4rem;
  }
`;

const CloseButton = styled.img`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1rem;
  cursor:pointer;
`;

const EditButton = styled.img`
  position: absolute;
  top: 0.3rem;
  right: 1.7rem;
  width: 1.5rem;
  cursor: pointer;
`;

const DeleteButton = styled.img`
  position: absolute;
  top: 0.5rem;
  right: 3.5rem;
  width: 1.3rem;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 1.4rem;
  margin: 1rem 0 0.5rem 0;
`;

const Daypicker = styled.div`
`;

const StyleDatePicker = styled(DatePicker)`
  width: 8rem;
  font-size: 1.4rem;
`;

const CommentContainer = styled.div`
`;

const NoEditContainer = styled.div`
  display: ${(props) => (props.isEditing ? "none" : "default")};
  border-bottom:0.2rem solid black;
  margin-right: 4rem;
  
`;

const EditContainer = styled.div`
  display: ${(props) => (props.isEditing ? "default" : "none")};
`;