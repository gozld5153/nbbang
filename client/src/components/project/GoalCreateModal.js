import React, { useState} from "react";
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

export default function GoalCreateModal({
  isCreateOpen,
  myInfo,
  createModalOpener,
  isTodo,
  setIsTodo,
}) {
  const [goalData, setGoalData] = useState({
    id: null,
    user_id: myInfo.id,
    goal_name: "",
    description: "",
    state: "Todo",
    important: 1,
    deadline: {
      startDate: new Date(),
      endDate: new Date(),
    },
    agreement: 0,
    file: [],
    coments: [],
  });
  const important = [["사소",1],["보통",2],["중요",3]]


  const goalDataHandler = (key, value) => {
    let newObject = goalData;
    newObject[key] = value;
    setGoalData({ ...newObject });
  }

  const todoAdder = () => {
    setIsTodo([...isTodo, goalData]);
    createModalOpener()
  }
  return (
    <Container isCreateOpen={isCreateOpen}>
      <ModalContainer>
        <button onClick={createModalOpener}>close</button>
        미션이름
        <input
          onChange={(e) => goalDataHandler("goal_name", e.target.value)}
          value={goalData.goal_name}
          type="text"
        />
        수행 기간
        <Daypicker>
          <StyleDatePicker
            selected={goalData.deadline.startDate}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            selectsStart
            endDate={goalData.deadline.endDate}
            placeholderText="From"
            showPopperArrow={false}
            locale={ko}
            monthsShown={2}
            onChange={(date) =>
              goalDataHandler("deadline", {
                ...goalData.deadline,
                startDate: date,
              })
            }
          />
          <StyleDatePicker
            selected={goalData.deadline.endDate}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            selectsEnd
            startDate={goalData.deadline.startDate}
            placeholderText="To"
            showPopperArrow={false}
            monthsShown={2}
            onChange={(date) =>
              goalDataHandler("deadline", {
                ...goalData.deadline,
                endDate: date,
              })
            }
          />
        </Daypicker>
        기여도
        <ul>
          <li>{goalData.important}</li>
          {important.map((el) => (
            <li onClick={() => goalDataHandler("important", el[1])} key={el[1]}>{el[0]}</li>
          ))}
        </ul>
        설명
        <textarea
          onChange={(e) => goalDataHandler("description", e.target.value)}
          value={goalData.description}
        ></textarea>
        <button onClick={todoAdder}>생성</button>
      </ModalContainer>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left:0;
  display: ${(props) => (props.isCreateOpen ? "flex" : "none")};
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
