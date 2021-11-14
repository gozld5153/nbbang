import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams, Outlet } from "react-router-dom";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import ChartStatics from "../components/utils/ChartStatics";

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

  h3 {
    font-weight: 600;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
    font-family: "Noto sans KR, sans-serif";
  }

  p {
    font-size: 1.5rem;
  }
`;

const ProjectTeammatesContainer = styled.div`
  width: 100%;
  height: 98vh;
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

  display: ${(props) => props.crew < 4 && "none"};

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
  height: 420px;
  width: 305px;
  border-radius: 10px;
`;

const ProjectTeammatesDetailBoxContainer = styled.div`
  border: 5px solid black;
  margin: 20px 0;
  width: 295px;
  height: 80px;
  box-shadow: 1px 1px 7px gray;
  border-image: url(${process.env.PUBLIC_URL}/images/borderstyle.png) 20;
  padding: 20px;
  /* background-color: #ffece9; */
`;

const ProjectGoalDescription = styled.div`
  display: flex;
  font-family: "Nanum Brush Script", cursive;
  font-size: 1.8rem;
`;

const ProjectGoalImportantSum = styled.div`
  height: 80px;
  display: flex;
  padding: 0 20px;
  line-height: 3;

  span {
    font-size: 1.5rem;
    font-weight: bold;
  }

  span:nth-of-type(1) {
    margin-right: 120px;
    color: gray;
  }
`;
const ProjectStaticsContainer = styled.div`
  width: 100%;
  height: 98vh;
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
export const Complete = () => {
  return (
    <CompletePageWrapper>
      <Outlet />
    </CompletePageWrapper>
  );
};

export const ProjectStatics = () => {
  const params = useParams();
  const crewScroll = useRef(null);

  useEffect(() => {
    window.addEventListener("wheel", handleMouseWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleMouseWheel, { passive: false });
    };
  }, []);

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
    if (top >= 0 && top < 1000 && Y < 0) return;
    else if (top >= 0 && top < 1000 && Y > 0) {
      top = 1000;
    } else if (top >= 1000 && top < 1961 && Y < 0) {
      top = 0;
    } else if (top >= 1000 && top < 1961 && Y > 0) {
      top = 1961;
    } else if (top >= 1961 && Y < 0) {
      top = 1000;
    } else if (top >= 1961 && Y > 0) return;

    window.scroll({ top, left: 0, behavior: "smooth" });
  };

  return (
    <ProjectCompleteWrapper>
      <ProjectPresentationContainer>
        <ProjectPresentationHeadline>PRESENTATION</ProjectPresentationHeadline>
        <ProjectPresentationContent>
          <iframe
            width="860"
            height="505"
            src="https://www.youtube.com/embed/zbllvQZRyh0"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullscreen
          />
          <ProjectPresentationDescription>
            <h3>나의 프로젝트</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </ProjectPresentationDescription>
        </ProjectPresentationContent>
      </ProjectPresentationContainer>
      <ProjectTeammatesContainer>
        <ProjectTeammatesHeadline>{5} TEAMMATES</ProjectTeammatesHeadline>
        <ProjectTeammatesColumnName>
          <span>{1} Leader</span>
          <span>{4} Crews</span>
          <ProjectTeammatesCrewScroll crew={4}>
            <div className="goback" onClick={handleCrewScroll}>
              <MdArrowBackIosNew />
            </div>
            <div className="goforward" onClick={handleCrewScroll}>
              <MdArrowForwardIos />
            </div>
          </ProjectTeammatesCrewScroll>
        </ProjectTeammatesColumnName>
        <ProjectTeammatesItemsList>
          <ProjectTeammatesCards />
          <ProjectTeammatesCrew ref={crewScroll}>
            <ProjectTeammatesCards />
            <ProjectTeammatesCards />
            <ProjectTeammatesCards />
            <ProjectTeammatesCards />
            <ProjectTeammatesCards />
          </ProjectTeammatesCrew>
        </ProjectTeammatesItemsList>
      </ProjectTeammatesContainer>
      <ProjectStaticsContainer>
        <ProjectStaticsHeadline>STATICS</ProjectStaticsHeadline>
        <ProjectStaticsdetailComponent />
      </ProjectStaticsContainer>
    </ProjectCompleteWrapper>
  );
};

export const ProjectTeammatesCards = () => {
  return (
    <ProjectTeammatesCardsContainer>
      <ProjectTeammatesProfile>
        <img
          src={`${process.env.PUBLIC_URL}/images/profile-sample.jpg`}
          alt=""
        />
        <ProjectTeammatesProfileDescription>
          <span>석창환</span>
          <span>미니언 1호</span>
        </ProjectTeammatesProfileDescription>
      </ProjectTeammatesProfile>
      <ProjectTeammatesDetail>
        <ProjectTeammatesDetailBox />
        <ProjectTeammatesDetailBox />
        <ProjectTeammatesDetailBox />
        <ProjectTeammatesDetailBox />
      </ProjectTeammatesDetail>
      <ProjectGoalImportantSum>
        <span>총 합계 :</span>
        <span>77%</span>
      </ProjectGoalImportantSum>
    </ProjectTeammatesCardsContainer>
  );
};

export const ProjectTeammatesDetailBox = () => {
  return (
    <ProjectTeammatesDetailBoxContainer>
      <ProjectGoalDescription>
        <div className="goal-name">나무에 물 주기</div>
      </ProjectGoalDescription>
    </ProjectTeammatesDetailBoxContainer>
  );
};

export const ProjectStaticsdetailComponent = () => {
  const [data, setData] = useState({});
  const handleTeammateData = () => {
    return;
  };
  return (
    <>
      <ProjectTeammateslist>
        <img
          src={`${process.env.PUBLIC_URL}/images/profile-sample.jpg`}
          alt=""
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/profile-sample.jpg`}
          alt=""
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/profile-sample.jpg`}
          alt=""
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/profile-sample.jpg`}
          alt=""
        />
        <img
          src={`${process.env.PUBLIC_URL}/images/profile-sample.jpg`}
          alt=""
        />
      </ProjectTeammateslist>
      <ProjectStaticsdetail>
        <ProjectStaticsGraph>
          <ChartStatics />
        </ProjectStaticsGraph>
      </ProjectStaticsdetail>
    </>
  );
};

const ProjectTeammateslist = styled.div`
  width: 100%;
  height: 40px;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;

  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 0 20px;
  }
`;

const ProjectStaticsdetail = styled.div`
  width: 100%;
  height: 400px;
`;

const ProjectStaticsGraph = styled.div`
  width: 570px;
  height: 570px;
`;
