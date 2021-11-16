import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios'

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

export default function MemberModal({
  memberModalOpener,
  isMemberOpen,
  setMember,
  member,
  projectInfo,
}) {
  const [searchEmail, setSearchEmail] = useState("");
  const [color, setColor] = useColor("hex", "#121212")
  const [searchMember, setSearchMember] = useState([
    {
      id: 0,
      username: "",
      email: "",
      profile: "",
    },
  ]);
  const [selectMember, setSelectMember] = useState({
    id: null,
    username: "",
    email: "",
    profile: "",
    color:'#ffffff'
  });

  const searchHandler = (e) => {
    setSearchEmail(e.target.value);
  };

  const selectHandler = (id) => {
    let select = searchMember.filter((el) => el.id === id)[0];
    setSearchEmail(select.email);
    setSelectMember({ ...selectMember, ...select });
  };

  const selectColor = (data) => {
    setColor(data)
    setSelectMember({ ...selectMember, color: color.hex });
  }

  const enterHandler = (e) => {
    if (e.key === "Enter" && searchEmail) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/users/search/${searchEmail}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((res) => setSearchMember(res.data.data));

    }
  };

  const closeHandler = () => {
    const reduplication = member.filter((el) => el.id === selectMember.id)
      .length;
    if (!selectMember.email) {
      return alert("입력 해줘");
    }
    if (reduplication && selectMember.username) {
      return alert("이미 가입된 맴버입니다.");
    }
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/invite`,
        {
          projectId: projectInfo.id,
          userId: selectMember.id,
          color:selectMember.color,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(() => {
        memberModalOpener();
      });
    
    
  };

  const reseter = () => {
    setSearchMember([]);
    setSearchEmail('');
    memberModalOpener();
  };
  return (
    <ModalContainer isMemberOpen={isMemberOpen}>
      Search email
      <input
        value={searchEmail}
        onChange={searchHandler}
        onKeyPress={enterHandler}
        type="text"
      />
      <ul>
        {searchMember.map((el) => (
          <li onClick={() => selectHandler(el.id)} key={el.id}>
            {el.email}
          </li>
        ))}
      </ul>
      What is his color?
      <ColorPicker
        width={240}
        height={40}
        color={color}
        onChange={selectColor}
        hideHSV
        hideRGB
        dark
      />
      <SubmitContainer>
        <button onClick={reseter}>close</button>
        <button onClick={closeHandler}>invite</button>
      </SubmitContainer>
    </ModalContainer>
  );
}


const ModalContainer = styled.div`
  position: absolute;
  top: 6rem;
  right: -1rem;
  display: ${(props) => (props.isMemberOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  width: 17rem;
  border: 0.4rem solid black;
  font-size: 1.4rem;
  padding: 1rem;
  background-color: white;
  z-index: 99999;

  input {
    border-bottom: 1px solid black;
    width: 12rem;
    height: 2rem;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width:100%;
  margin-top: 0.2rem;
  padding: 0 2rem;

  button {
    font-size: 1.2rem;
  }
`;