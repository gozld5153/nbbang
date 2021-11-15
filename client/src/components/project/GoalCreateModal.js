import React, { useState} from "react";
import styled from "styled-components";
import axios from 'axios'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

export default function GoalCreateModal({
  isCreateOpen,
  myInfo,
  createModalOpener,
  isTodo,
  setIsTodo,
  projectId,
}) {
  // 기능 clear
  let today = new Date();
  const [goalData, setGoalData] = useState({
    id: null,
    userId: myInfo.id,
    goalName: "",
    description: "",
    state: "Todo",
    important: 1,
    deadline: `${today.toLocaleString().split(" ").join("").slice(0, 10)} ~ 
              ${today.toLocaleString().split(" ").join("").slice(0, 10)}`,
    agreement: 0,
    file: 0,
    comments: 0,
  });
  const [selectDate, setSelectDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [isOpen, setIsOpen] = useState(false)

  const important = [
    ["사소", 1],
    ["보통", 2],
    ["중요", 3],
  ];

  const goalDataHandler = (key, value) => {
    let newObject = goalData;
    newObject[key] = value;
    setGoalData({ ...newObject });
  };

  const modalCloser = () => {
    createModalOpener();
    setGoalData({
      id: null,
      userId: myInfo.id,
      goalName: "",
      description: "",
      state: "Todo",
      important: 1,
      deadline: `${today.toLocaleString().split(" ").join("").slice(0, 10)} ~ 
              ${today.toLocaleString().split(" ").join("").slice(0, 10)}`,
      agreement: 0,
      file: [],
      comments: [],
    });
    setSelectDate({ startDate: new Date(), endDate: new Date() });

  }

  const todoAdder = () => {
    axios.post(
      `http://server.nbbang.ml/goal`,
      {
        userId: myInfo.id,
        projectId: projectId,
        goalName: goalData.goalName,
        description: goalData.description,
        state: "todo",
        important: goalData.important,
        deadline: goalData.deadline,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    ).then((res) => {
      goalData.id = res.data.data.id;
      setIsTodo([...isTodo, goalData]);
      createModalOpener();
      setGoalData({
        id: null,
        userId: myInfo.id,
        goalName: "",
        description: "",
        state: "Todo",
        important: 1,
        deadline: `${today.toLocaleString().split(" ").join("").slice(0, 10)} ~ 
              ${today.toLocaleString().split(" ").join("").slice(0, 10)}`,
        agreement: 0,
        file: [],
        comments: [],
      });
      setSelectDate({ startDate: new Date(), endDate: new Date() });
    });
  };
  return (
    <Container isCreateOpen={isCreateOpen}>
      <ModalContainer>
        <CloseButton
          src={`${process.env.PUBLIC_URL}/images/close.png`}
          alt="close"
          onClick={modalCloser}
        />
        Mission Name
        <input
          onChange={(e) => goalDataHandler("goalName", e.target.value)}
          value={goalData.goalName}
          type="text"
        />
        Deadline
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
              goalDataHandler(
                "deadline",
                date.toLocaleString().split(" ").join("").slice(0, 10) +
                  "~" +
                  goalData.deadline.split("~")[1]
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
              goalDataHandler(
                "deadline",
                goalData.deadline.split("~")[0] +
                  "~" +
                  date.toLocaleString().split(" ").join("").slice(0, 10)
              );
            }}
          />
        </Daypicker>
        Important
        <ul>
          <li onClick={()=>setIsOpen(!isOpen)}>
            {important.filter((el) => el[1] === goalData.important)[0][0]}
          </li>
          {isOpen ? important.map((el) => (
            <li onClick={() => {
              goalDataHandler("important", el[1])
              setIsOpen(!isOpen);
            }} key={el[1]}>
              {el[0]}
            </li>
          )) : null}
        </ul>
        Description
        <textarea
          onChange={(e) => goalDataHandler("description", e.target.value)}
          value={goalData.description}
        ></textarea>
        <button onClick={todoAdder}>Create</button>
      </ModalContainer>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.isCreateOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 1.4rem;
  padding:1rem;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999999;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 1rem;
`;

const ModalContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 50vh;
  border: 0.4rem solid black;
  background-color: white;
`;

const Daypicker = styled.div`
  display: flex;
  justify-content:flex-start;
`;

const StyleDatePicker = styled(DatePicker)`
width:5rem;
border:1px solid black`;
