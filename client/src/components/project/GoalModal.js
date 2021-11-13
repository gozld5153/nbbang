import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams, useLocation } from "react-router-dom";

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

  const onEdit = () => {
    setIsEditing(!isEditing);
  }

  const commentHandler = (e) => {
    if (e.key === "Enter" && comment) {
      DataHandler("comments", [
        ...goal.comments,
        {
          projectId: params.project_id,
          userId: location.state.myInfo.id,
          username: location.state.myInfo.username,
          description: e.target.value,
          created_at: new Date(),
        },
      ]);
      setComment("");
    }
  }
  console.log(params)
  console.log(location.state);
  return (
    <Container>
      <ModalContainer>
        <button onClick={onEdit}>edit</button>
        {params.id}
        이름
        <NoEditContainer isEditing={isEditing}>
          {goal.goal_name}
        </NoEditContainer>
        <EditContainer isEditing={isEditing}>
          <input
            value={goal.goal_name}
            onChange={(e) => DataHandler("goal_name", e.target.value)}
            placeholder="목표 이름"
            type="text"
          />
        </EditContainer>
        기간
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
        중요도
        <NoEditContainer isEditing={isEditing}>
          {important.filter((el) => goal.important === el[1])[0][0]}
        </NoEditContainer>
        <EditContainer isEditing={isEditing}>
          <ul>
            <li>{important.filter((el) => goal.important === el[1])[0][0]}</li>
            {important.map((el) => (
              <li onClick={() => DataHandler("important", el[1])} key={el[1]}>
                {el[0]}
              </li>
            ))}
          </ul>
        </EditContainer>
        설명
        <NoEditContainer isEditing={isEditing}>
          {goal.description}
        </NoEditContainer>
        <EditContainer isEditing={isEditing}>
          <textarea
            value={goal.description}
            onChange={(e) => DataHandler("description", e.target.value)}
          />
        </EditContainer>
        파일
        {goal.file.map((el) => el.filename)}
        <input type="file" />
        {
          // 파일 업로드 하는 방법 찾기
        }
        코멘트
        {goal.comments.map((el) => (
          <CommentContainer key={el.id}>
            <div>{el.username}</div>
            <div>{el.description}</div>
            <div>
              {`${el.created_at
                .toLocaleString()
                .split(" ")
                .join("")
                .slice(0, 10)}`}
            </div>
          </CommentContainer>
        ))}
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyPress={commentHandler}
        />
        <EditContainer isEditing={isEditing}>
          <button>submit</button>
        </EditContainer>
        <button onClick={() => navigate(-1)}>close</button>
      </ModalContainer>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left:0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 50vh;
  border: 1px solid black;
  background-color: white;
`;

const Daypicker = styled.div``;

const StyleDatePicker = styled(DatePicker)``;

const CommentContainer = styled.div`
`;

const NoEditContainer = styled.div`
  display: ${(props) => (props.isEditing ? "none" : "default")};
`;

const EditContainer = styled.div`
  display: ${(props) => (props.isEditing ? "default" : "none")};
`;