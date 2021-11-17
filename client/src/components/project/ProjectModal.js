import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
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
  setUpdate,
  update
}) {
  // 기능 clear
  const navigate = useNavigate();


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
      console.log(projectInfo);
      return member.filter((el) => el.id === projectInfo.captainId)[0].username;
    }
    return null
  }
  const captain = selectcap();
  const [isOpen, setIsOpen] = useState(false)
  const [selectDate, setSelectDate] = useState({
    startDate: defaultStartDate(),
    endDate: defaultendDate(),
  });

  const closeHandler = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/project`,
        {
          id: projectInfo.id,
          projectName: projectInfo.projectName,
          captainId: projectInfo.captainId,
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
        setUpdate(true);
        if (res.data.message === "ok") {
          projectModalOpener();
        }
      });  
  }

  const projectComplete = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/project`,
        {
          id: projectInfo.id,
          projectName: projectInfo.projectName,
          captainId: projectInfo.captainId,
          description: projectInfo.description,
          state: "complete",
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
        setUpdate(true)
        if (res.data.message === "ok") {
          navigate("/");
        }
      }); 
  };

  return (
    // <Container isProjectOpen={isProjectOpen}>
    // </Container>
    <ModalContainer isProjectOpen={isProjectOpen}>
      What is ProjectName?
      <input
        type="text"
        onBlur={(e) => DataHandler("projectName", e.target.value)}
      />
      <br />
      When we finish?
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
      <br />
      Who is Captain?
      <ul>
        <Cap onClick={() => setIsOpen(!isOpen)}>{captain}</Cap>
        {isOpen
          ? member.map((el) => (
              <li
                onClick={() => {
                  DataHandler("captainId", el.id);
                  setIsOpen(!isOpen);
                }}
                key={el.id}
              >
                {el.username}
              </li>
            ))
          : null}
      </ul>
      <br />
      Description
      <textarea onChange={(e) => DataHandler("description", e.target.value)} />
      <SubmitContainer>
        <ProjectFinisher onClick={projectComplete}>complete</ProjectFinisher>
        <button onClick={closeHandler}>Submit</button>{" "}
      </SubmitContainer>
    </ModalContainer>
  );
}


const ModalContainer = styled.div`
  position: absolute;
  top: 4.5rem;
  left: 0;
  display: ${(props) => (props.isProjectOpen ? "flex" : "none")};
  flex-direction: column;
  width: 15rem;
  border: 0.4rem solid black;
  font-size: 1.4rem;
  padding: 1rem;
  background-color: white;
  z-index: 999999;

  input {
    border-bottom: 1px solid black;
    width: 12rem;
    height: 2rem;
    font-size: 1.2rem;
  }

  textarea {
    height: 4rem;
    resize: none;
  }
`;

const Cap = styled.li`
  border-bottom: 1px solid black;
`;

const Daypicker = styled.div`
`;

const StyleDatePicker = styled(DatePicker)`
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.2rem;
  
  button { 
    font-size: 1.2rem;
  }
`;

const ProjectFinisher = styled.button`
`;
