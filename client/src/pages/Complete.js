import React, { useState, useEffect, useRef } from "react";
<<<<<<< HEAD
import styled from "styled-components";
import { useParams, Outlet } from "react-router-dom";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import ChartStatics from "../components/utils/ChartStatics";
import { CompletePageData } from "../mockdata/CompletePageData";
=======
import { useParams, Outlet } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import ChartStatics from "../components/utils/ChartStatics";
import LoadingNotice from "../components/utils/LoadingSpinner";

import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00

export const Complete = () => {
  return (
    <CompletePageWrapper>
      <Outlet />
    </CompletePageWrapper>
  );
};

export const ProjectStatics = () => {
<<<<<<< HEAD
  // const params = useParams();
  const crewScroll = useRef(null);
  const [projectData, setProjectData] = useState(CompletePageData);
  const params = { projectId: 1 };
  // - projectId로 요청함

  const { captain, crew } = projectData.usersGoal;
  const staticsData = [captain].concat(crew);
=======
  const crewScroll = useRef(null);

  const { project_id } = useParams();
  const [projectData, setProjectData] = useState({});
  let captain;
  let crew;
  let staticsData;

  if (projectData.usersGoal) {
    captain = projectData.usersGoal.captain;
    crew = projectData.usersGoal.crew;
    staticsData = [captain].concat(crew);
  }

  useEffect(() => {
    axios({
      method: "GET",
      url: `${
        process.env.REACT_APP_API_URL
      }/project/${project_id}?completePage=${true}`,
      withCredential: true,
    })
      .then((response) => {
        setProjectData(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [project_id]);
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00

  useEffect(() => {
    window.addEventListener("wheel", handleMouseWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleMouseWheel, { passive: false });
    };
  }, []);

<<<<<<< HEAD
  // useEffect 프로젝트 정보 가져오는 거 추가하기

=======
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00
  const handleCrewScroll = (event) => {
    const clsName = event.target.classList[0];

    if (clsName === "goback") {
      crewScroll.current.scrollBy({ top: 0, left: -345, behavior: "smooth" });
    } else if (clsName === "goforward") {
      crewScroll.current.scrollBy({ top: 0, left: 345, behavior: "smooth" });
    }
  };

  const handleMouseWheel = (event) => {
    event.preventDefault();
    const Y = event.deltaY;

    let top = window.scrollY;
    if (top >= 0 && top < 1000 && Y < 0) {
      top = 0;
    } else if (top >= 0 && top < 1000 && Y > 0) {
      top = 1000;
<<<<<<< HEAD
    } else if (top >= 1000 && top < 1961 && Y < 0) {
      top = 0;
    } else if (top >= 1000 && top < 1961 && Y > 0) {
      top = 1961;
    } else if (top >= 1961 && Y < 0) {
      top = 1000;
    } else if (top >= 1961 && Y > 0) return;
=======
    } else if (top >= 1000 && top < 1975 && Y < 0) {
      top = 0;
    } else if (top >= 1000 && top < 1975 && Y > 0) {
      top = 1975;
    } else if (top >= 1975 && Y < 0) {
      top = 1000;
    } else if (top >= 1975 && Y > 0) return;
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00

    window.scroll({ top, left: 0, behavior: "smooth" });
  };

<<<<<<< HEAD
=======
  if (!projectData.projectId && !crew && !captain) {
    return <LoadingNotice />;
  }
  console.log(projectData);
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00
  return (
    <ProjectCompleteWrapper>
      <ProjectPresentationContainer>
        <ProjectPresentationHeadline>PRESENTATION</ProjectPresentationHeadline>
        <ProjectPresentationContent>
<<<<<<< HEAD
          <iframe
            width="860"
            height="505"
            src={`https://www.youtube.com/embed/${projectData.presentation.slice(
              -11
            )}`}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullscreen
          />
=======
          {projectData.presentation ? (
            <iframe
              width="860"
              height="505"
              src={`https://www.youtube.com/embed/${projectData.presentation.slice(
                -11
              )}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullscreen
            />
          ) : (
            <ProjectPresentatinError>
              <strong>프레젠테이션이</strong> 없습니다
            </ProjectPresentatinError>
          )}

>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00
          <ProjectPresentationDescription>
            <img
              src={`${process.env.PUBLIC_URL}/images/nbbang-logo.png`}
              alt=""
            />
            <h3>{projectData.projectName}</h3>
            <p>{projectData.description}</p>
          </ProjectPresentationDescription>
        </ProjectPresentationContent>
      </ProjectPresentationContainer>
      <ProjectTeammatesContainer>
        <ProjectTeammatesHeadline>
          {projectData.totalNum} TEAMMATES
        </ProjectTeammatesHeadline>
        <ProjectTeammatesColumnName>
          <span>{1} Leader</span>
          <span>{crew.length} Crews</span>
          <ProjectTeammatesCrewScroll isHidden={crew.length < 4}>
            <div className="goback" onClick={handleCrewScroll}>
              <MdArrowBackIosNew />
            </div>
            <div className="goforward" onClick={handleCrewScroll}>
              <MdArrowForwardIos />
            </div>
          </ProjectTeammatesCrewScroll>
        </ProjectTeammatesColumnName>
        <ProjectTeammatesItemsList>
<<<<<<< HEAD
          <ProjectTeammatesCards teammates={captain} />
          <ProjectTeammatesCrew ref={crewScroll}>
            {crew.map((crew) => (
              <ProjectTeammatesCards teammates={crew} key={crew.username} />
            ))}
=======
          <ProjectTeammatesCards captain={true} teammates={captain} />
          <ProjectTeammatesCrew ref={crewScroll}>
            {crew.length === 0 ? (
              <ProjectCrewNoneError>
                <strong>크루가</strong> 없습니다
              </ProjectCrewNoneError>
            ) : (
              crew.map((crew, idx) => (
                <ProjectTeammatesCards
                  crew={idx + 1}
                  teammates={crew}
                  key={crew.username}
                />
              ))
            )}
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00
          </ProjectTeammatesCrew>
        </ProjectTeammatesItemsList>
      </ProjectTeammatesContainer>
      <ProjectStaticsContainer>
        <ProjectStaticsHeadline>STATICS</ProjectStaticsHeadline>
        <ProjectStaticsdetailComponent staticsData={staticsData} />
      </ProjectStaticsContainer>
    </ProjectCompleteWrapper>
  );
};

<<<<<<< HEAD
export const ProjectTeammatesCards = ({ teammates }) => {
  return (
    <ProjectTeammatesCardsContainer>
      <ProjectTeammatesProfile>
        <img src={teammates.profile} alt="" />
        <ProjectTeammatesProfileDescription>
          <span>{teammates.username}</span>
          <span>미니언 1호</span>
        </ProjectTeammatesProfileDescription>
      </ProjectTeammatesProfile>
      <ProjectTeammatesDetail>
        {teammates.goal.map((goal) => (
          <ProjectTeammatesDetailBox goal={goal} key={goal.username} />
        ))}
=======
export const ProjectTeammatesCards = ({ teammates, captain, crew }) => {
  console.log(teammates, teammates.goal);
  return (
    <ProjectTeammatesCardsContainer>
      <ProjectTeammatesProfile>
        <img
          src={`${process.env.REACT_APP_S3_IMG}/${teammates.profile}`}
          alt=""
        />
        <ProjectTeammatesProfileDescription>
          <span>{teammates.username}</span>
          <span>{captain ? "팀장" : `팀원 ${crew}`}</span>
        </ProjectTeammatesProfileDescription>
      </ProjectTeammatesProfile>
      <ProjectTeammatesDetail>
        {!teammates.goal || teammates.goal.length === 0 ? (
          <ProjectGoalError>
            <strong>수행한 것이</strong>없습니다
          </ProjectGoalError>
        ) : (
          teammates.goal.map((goal) => (
            <ProjectTeammatesDetailBox goal={goal} key={goal.username} />
          ))
        )}
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00
      </ProjectTeammatesDetail>
    </ProjectTeammatesCardsContainer>
  );
};

export const ProjectTeammatesDetailBox = ({ goal }) => {
  return (
    <ProjectTeammatesDetailBoxContainer>
      <ProjectGoalDescription>
        <div className="goal-name">{goal.goalName}</div>
      </ProjectGoalDescription>
    </ProjectTeammatesDetailBoxContainer>
  );
};

export const ProjectStaticsdetailComponent = ({ staticsData }) => {
<<<<<<< HEAD
  const allData = staticsData.map((item) => {
    return {
      username: item.username,
      totalGoal: item.goal.reduce((acc, cur) => acc + cur.important, 0),
=======
  const goalTotal = staticsData.reduce(
    (acc, item) => item.goal.reduce((a, c) => a + c, 0) + acc,
    0
  );
  const allData = staticsData.map((item) => {
    return {
      username: item.username,
      totalGoal:
        item.goal.length === 0
          ? 0
          : item.goal.reduce((acc, cur) => acc + cur.important, 0),
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00
    };
  });

  const personalDatas = staticsData;
  const [tempData, setTempData] = useState(allData);
  const [guide, setGuide] = useState(true);
  const [allMode, setAllMode] = useState(true);
  const [selected, setSelected] = useState("allUser");

  const handleTeammateData = (event) => {
    const name = event.target.classList[0];
    if (name === "allUser") {
      setTempData(allData);
      setAllMode(true);
      setSelected("allUser");
    } else {
      staticsData.forEach((data) => {
        if (data.username === name) {
          setTempData(data);
          setSelected(data.username);
        }
      });
      setAllMode(false);
    }
    setGuide(true);
  };

  return (
    <>
<<<<<<< HEAD
      <ProjectTeammateslist selected={selected}>
        <div className={"allUser"} onClick={handleTeammateData}>
          <img
            src={`${process.env.PUBLIC_URL}/images/ALL_logo.svg`}
            alt=""
            title={"ALL"}
            style={{ opacity: selected === "allUser" ? "100%" : "50%" }}
          />
        </div>
        {personalDatas.map((data) => {
          return (
            <div className={data.username} onClick={handleTeammateData}>
              <img
                src={data.profile}
                alt=""
                title={data.username}
                style={{ opacity: selected === data.username ? "100%" : "50%" }}
              />
            </div>
          );
        })}
      </ProjectTeammateslist>
      <ProjectStaticsdetail>
        <ChartStatics
          tempData={tempData}
          guide={guide}
          setGuide={setGuide}
          allMode={allMode}
        />
      </ProjectStaticsdetail>
=======
      {goalTotal === 0 ? (
        <ProjectStaticsError>
          <strong>진행한 작업들이</strong> 없습니다
          <h3>( 통계 확인 불가 )</h3>
        </ProjectStaticsError>
      ) : (
        <>
          {" "}
          <ProjectTeammateslist selected={selected}>
            <div className={"allUser"} onClick={handleTeammateData}>
              <img
                src={`${process.env.PUBLIC_URL}/images/ALL_logo.svg`}
                alt=""
                title={"ALL"}
                style={{ opacity: selected === "allUser" ? "100%" : "50%" }}
              />
            </div>
            {personalDatas.map((data) => {
              return (
                <div className={data.username} onClick={handleTeammateData}>
                  <img
                    src={`${process.env.REACT_APP_S3_IMG}/${data.profile}`}
                    alt=""
                    title={data.username}
                    style={{
                      opacity: selected === data.username ? "100%" : "50%",
                    }}
                  />
                </div>
              );
            })}
          </ProjectTeammateslist>
          <ProjectStaticsdetail>
            <ChartStatics
              tempData={tempData}
              guide={guide}
              setGuide={setGuide}
              allMode={allMode}
            />
          </ProjectStaticsdetail>
        </>
      )}
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00
    </>
  );
};

const CompletePageWrapper = styled.div`
  width: 100%;
`;

const ProjectCompleteWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectPresentationHeadline = styled.h2`
  font-family: "Anton", sans-serif;
  font-size: 3rem;
  margin-bottom: 40px;
  letter-spacing: 0.1rem;
`;

const ProjectPresentationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px 150px;
  border-bottom: 5px solid black;
  height: 84vh;
`;

const ProjectPresentationContent = styled.div`
  display: flex;
`;

const ProjectPresentationDescription = styled.div`
  width: 515px;
  border: 5px solid black;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(189, 189, 189, 0.5);

  img {
    width: 150px;
    height: 100px;
    top: -80px;
    position: relative;
  }
  h3 {
    font-weight: 600;
    font-size: 2.5rem;
    /* text-align: center; */
    margin: 50px 0;
    font-family: "Noto sans KR, sans-serif";
  }

  p {
    font-size: 1.5rem;
    font-style: italic;
  }
`;

const ProjectTeammatesContainer = styled.div`
  width: 100%;
<<<<<<< HEAD
  height: 98vh;
=======
  height: 99.7vh;
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00
  flex-direction: column;
  padding: 90px 150px;
  border-bottom: 5px solid black;
`;

const ProjectTeammatesHeadline = styled.h2`
  font-family: "Anton", sans-serif;
  font-size: 3rem;
  margin-bottom: 40px;
  letter-spacing: 0.1rem;
  -webkit-text-stroke: 0.1rem black;
  color: white;
`;

const ProjectTeammatesColumnName = styled.div`
  display: flex;
  margin: 60px 0 20px 0;

  span {
    font-family: "Anton", sans-serif;
    margin-right: 210px;
    margin-left: 20px;
    font-size: 2rem;
    letter-spacing: 0.1rem;
  }

  span:nth-of-type(1) {
    color: #a5b100;
  }
  span:nth-of-type(2) {
    color: #e27d02;
  }
`;

const ProjectTeammatesCrewScroll = styled.div`
  display: flex;
  cursor: pointer;
  margin-left: auto;
  margin-right: 10px;

  display: ${(props) => props.isHidden && "none"};

  div {
    font-size: 2rem;
    z-index: 99;
    &:hover {
      svg {
        transform: scale(1.5, 1.5);
        color: green;
      }
    }
  }

  svg {
    margin-right: 20px;
    pointer-events: none;
  }
`;

const ProjectTeammatesItemsList = styled.div`
  display: flex;
  overflow-x: auto;
`;
const ProjectTeammatesCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`;
const ProjectTeammatesProfile = styled.div`
  height: 100px;
  display: flex;
  padding: 10px 0;

  img {
    max-width: 80px;
    border-radius: 50%;
  }
`;
const ProjectTeammatesCrew = styled.div`
  overflow-x: auto;
  display: flex;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ProjectTeammatesProfileDescription = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  span {
    margin: 5px 0;
  }
  span:nth-of-type(1) {
    font-size: 1.5rem;
    font-weight: bold;
  }
  span:nth-of-type(2) {
    color: gray;
  }
`;
const ProjectTeammatesDetail = styled.div`
<<<<<<< HEAD
  height: 500px;
=======
  height: 520px;
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00
  width: 305px;
  border-radius: 10px;
  overflow: hidden;
`;

const ProjectTeammatesDetailBoxContainer = styled.div`
  border: 5px solid black;
  margin: 20px 0;
  width: 295px;
  height: 80px;
  box-shadow: 1px 1px 7px gray;
  border-image: url(${process.env.PUBLIC_URL}/images/borderstyle.png) 20;
  padding: 20px;
`;

const ProjectGoalDescription = styled.div`
  text-align: center;
  font-family: "Nanum Brush Script", cursive;
  font-size: 1.8rem;
`;

const ProjectStaticsContainer = styled.div`
  width: 100%;
<<<<<<< HEAD
  height: 98vh;
=======
  height: 99vh;
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00
  flex-direction: column;
  padding: 100px 150px;
  border-bottom: 5px solid black;
`;

const ProjectStaticsHeadline = styled.h2`
  font-family: "Anton", sans-serif;
  font-size: 3rem;
  margin-bottom: 40px;
  letter-spacing: 0.1rem;
`;

const ProjectTeammateslist = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  .allUser {
    img {
      border: 2px dashed black;
      padding: 5px;
    }
  }
  div {
    cursor: pointer;

    img {
      pointer-events: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin: 0 15px;
    }
  }
`;

const ProjectStaticsdetail = styled.div`
  width: 100%;
  height: 570px;
`;
<<<<<<< HEAD
=======

const ProjectPresentatinError = styled.div`
  width: 860px;
  height: 500px;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  strong {
    display: block;
    color: red;
    font-weight: 600;
    margin-bottom: 30px;
  }
`;

const ProjectCrewNoneError = styled.div`
  width: 860px;
  height: 500px;
  font-size: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  strong {
    display: block;
    color: orange;
    font-weight: 600;
    margin-bottom: 30px;
  }
`;

const ProjectGoalError = styled.div`
  margin: auto 0;
  width: 295px;
  height: 500px;
  padding: 150px 0;
  font-size: 2rem;
  text-align: center;

  strong {
    margin-bottom: 10px;
    display: block;
    color: purple;
    font-weight: 600;
  }
`;

const ProjectStaticsError = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 5rem;
  strong {
    display: block;
    margin-bottom: 30px;
    color: skyblue;
    font-weight: 600;
  }

  h3 {
    margin-top: 50px;
    color: gray;
    font-size: 2rem;
    font-style: italic;
  }
`;
>>>>>>> c2cd46566d4e4efbe1a1c2f8b47f333c98befb00
