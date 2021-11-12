import React, { useState } from "react";
import styled from "styled-components";
import axios from 'axios'

import MemberMockData from '../../mockData/MemberMockData'

export default function MemberModal({
  memberModalOpener,
  isMemberOpen,
  setMember,
  member,
  projectInfo,
}) {
  const [searchEmail, setSearchEmail] = useState("");
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
  });

  const searchHandler = (e) => {
    setSearchEmail(e.target.value);
  };

  const selectHandler = (id) => {
    let select = searchMember.filter((el) => el.id === id)[0];
    setSearchEmail(select.email);
    setSelectMember({ ...select });
  };

  const enterHandler = (e) => {
    // const email = e.target.value;
    if (e.key === "Enter" && searchEmail) {
      // axios.get(`http://server.nbbang.ml/project/`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   withCredentials: true,
      // });

      setSearchMember([...MemberMockData]);
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
    axios.put(
      `http://server.nbbang.ml/project`,
      {
        id: projectInfo.id,
        member: [...member, selectMember],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setMember([...member, selectMember]);
    memberModalOpener();
  };

  return (
    <Container isMemberOpen={isMemberOpen}>
      <ModalContainer>
        <button onClick={memberModalOpener}>close</button>
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
        색깔 선택
        <ColorChecker color={selectMember.color}/>
        <input type="text" onChange={(e) => setSelectMember({...selectMember,color:e.target.value})} />
        <button onClick={closeHandler}>초대</button>
      </ModalContainer>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0;
  display: ${(props) => (props.isMemberOpen ? "flex" : "none")};
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

const ColorChecker = styled.div`
  width:5rem;
  height: 5rem;
  border-radius:2.5rem;
  background-color: ${(props) => { if (props.color && props.color[0] === "#" && props.color.length === 7) {
    return props.color;
  } }};
`