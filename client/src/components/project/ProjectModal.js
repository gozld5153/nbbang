import React, {useState} from "react";
import styled from "styled-components";
import axios from 'axios';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale'

export default function ProjectModal({
  isProjectOpen,
  projectModalOpener,
  member,
  projectInfo,
  DataHandler,
}) {
  // 기능 clear
  const defaultStartDate = () => {
    if (projectInfo.deadline) {
      return new Date(projectInfo.deadline.split("~")[0].replaceAll('.','-'))
    }
    return null
  }
  const defaultendDate = () => {
    if (projectInfo.deadline) {
      return new Date(projectInfo.deadline.split("~")[1].replaceAll(".", "-"));
    }
    return null
  };
  const selectcap = () => {
    if (member[0].id) {
      return member.filter((el) => el.id === projectInfo.captain_id)[0].username;
    }
    return null
  }
  const captain = selectcap();
  const [selectDate, setSelectDate] = useState({
    startDate: defaultStartDate(),
    endDate: defaultendDate(),
  });

  const closeHandler = () => {
    axios
      .put(
        `http://server.nbbang.ml/project`,
        {
          id: projectInfo.id,
          project_name: projectInfo.project_name,
          captain_id: projectInfo.captain_id,
          description: projectInfo.description,
          state: projectInfo.state,
          deadline: projectInfo.deadline,
          member: member,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.message === 'ok') {
          projectModalOpener();
        }
      });
  }
  return (
    <Container isProjectOpen={isProjectOpen}>
      <ModalContainer>
        프로젝트 이름 변경
        <input
          type="text"
          onBlur={(e) => DataHandler("project_name", e.target.value)}
        />
        <br />
        프로젝트 마감 기한 변경
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
                  projectInfo.deadline.split("~")[1]
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
                projectInfo.deadline.split("~")[0] +
                  "~" +
                  date.toLocaleString().split(" ").join("").slice(0, 10)
              );
            }}
          />
        </Daypicker>
        팀장 변경
        <ul>
          {captain}
          {member.map((el) => (
            <li onClick={() => DataHandler("captain_id", el.id)} key={el.id}>
              {el.username}
            </li>
          ))}
        </ul>
        설명 변경
        <textarea onClick={(e) => DataHandler("description", e.target.value)}/>
        <div onClick={closeHandler}>close</div>
      </ModalContainer>
    </Container>
  );
}

const Container = styled.div`
  position:absolute;
  top:0;
  display:${(props) => props.isProjectOpen ? 'flex' : 'none' };
  justify-content:center;
  align-items:center;
  width:100vw;
  height:100vh;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ModalContainer = styled.div`
  display:flex;
  flex-direction:column;
  width:50vw;
  height: 50vh;
  border:1px solid black;
  background-color:white;
`

const Daypicker = styled.div`
`;

const StyleDatePicker = styled(DatePicker)`
`;
