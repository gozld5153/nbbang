import React from "react";
import styled from "styled-components";

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
  const captain = member.filter((el) => el.id === projectInfo.captain_id)[0].username;
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
            selected={projectInfo.deadline.startDate}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            selectsStart
            endDate={projectInfo.deadline.endDate}
            placeholderText="From"
            showPopperArrow={false}
            locale={ko}
            monthsShown={2}
            onChange={(date) =>
              DataHandler("deadline", {
                ...projectInfo.deadline,
                startDate: date,
              })
            }
          />
          <StyleDatePicker
            selected={projectInfo.deadline.endDate}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            selectsEnd
            startDate={projectInfo.deadline.startDate}
            placeholderText="To"
            showPopperArrow={false}
            monthsShown={2}
            onChange={(date) =>
              DataHandler("deadline", {
                ...projectInfo.deadline,
                endDate: date,
              })
            }
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
        <div onClick={projectModalOpener}>close</div>
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