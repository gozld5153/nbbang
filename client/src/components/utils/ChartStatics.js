import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { chartColor } from "./ChartColor";
import styled, { keyframes } from "styled-components";
import { ImArrowLeft, ImArrowUp } from "react-icons/im";

const ChartStatics = ({ tempData, guide, setGuide, allMode }) => {
  const [descData, setDecsData] = useState({});

  let labels;
  let data;

  if (Array.isArray(tempData)) {
    labels = tempData.map((el) => el.username);
    data = tempData.map((el) => el.totalGoal);
  } else {
    labels = tempData.goal.map((el) => el.goalName);
    data = tempData.goal.map((el) => el.important);
  }

  const finalData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: chartColor.backgroundColor,
        borderColor: chartColor.borderColor,
        borderWidth: 1,
      },
    ],
  };

  const chartHandleClick = (event, element, legend) => {
    if (!allMode) {
      const idx = element[0].index;
      setDecsData(tempData.goal[idx]);
      setGuide(false);
    }
  };

  const legendHandleClick = (event, element, legend) => {
    if (!allMode) {
      const idx = element.index;
      setDecsData(tempData.goal[idx]);
      setGuide(false);
    }
  };

  return (
    <ProjectStaticsGraph>
      <div>
        <Doughnut
          data={finalData}
          options={{
            maintainAspectRatio: false,
            onClick: chartHandleClick,

            plugins: {
              legend: {
                maxHeight: 300,
                onClick: legendHandleClick,

                position: "right",
                labels: {
                  boxHeight: 30,
                  boxWidth: 30,
                  boxPadding: 20,
                  font: { size: 18 },
                },
              },
              tooltip: {
                titleFont: {
                  size: 30,
                },
                titleAlign: "center",

                footerFont: {
                  size: 25,
                },
                footerAlign: "center",
                padding: 20,

                callbacks: {
                  title: function (tooltipItem) {
                    return tooltipItem[0].label;
                  },
                  label: function (tooltipItem) {
                    return "";
                  },
                  footer: function (tooltipItem) {
                    console.log(tooltipItem);
                    return `${parseInt(
                      (tooltipItem[0].dataset.data[tooltipItem[0].dataIndex] /
                        tooltipItem[0].dataset.data.reduce(
                          (acc, cur) => acc + cur,
                          0
                        )) *
                        100
                    )} %`;
                  },
                },
              },
            },
          }}
        />
      </div>
      {guide ? (
        <ProjectStaticsdetailDescriptionGuideline allMode={allMode}>
          {allMode ? (
            <div className="all">
              <ImArrowUp />
              <span className={"userSelect"}>유저를 선택하세요</span>
            </div>
          ) : (
            <div className="none">
              <ImArrowLeft />
              <span>유저 상세 정보를 확인해보세요!</span>
            </div>
          )}
        </ProjectStaticsdetailDescriptionGuideline>
      ) : (
        <ProjectStaticsdetailDescription>
          <ProjectStaticsdetailDescriptionImportant
            important={descData.important}
          >
            <div>사소</div>
            <div>보통</div>
            <div>중요</div>
            <div className="deadline">{descData.deadline}</div>
          </ProjectStaticsdetailDescriptionImportant>

          <h2>{descData.goalName || "정보가없음"}</h2>
          <p>{descData.description || "정보가없음"}</p>
        </ProjectStaticsdetailDescription>
      )}
    </ProjectStaticsGraph>
  );
};

const arrowGuide = keyframes`
10% {
  transform: translateX(-20px)
}
30% {
  transform: translateX(0px)
}
40% {
  transform: translateX(-20px)
}
70% {
  transform: translateX(0px)
}


`;

const arrowGuide2 = keyframes`
10% {
  transform: translateY(-20px)
}
30% {
  transform: translateY(0px)
}
40% {
  transform: translateY(-20px)
}
70% {
  transform: translateY(0px)
}


`;

const ProjectStaticsGraph = styled.div`
  width: 100%;
  height: 570px;
  display: flex;

  > div:nth-of-type(1) {
    width: 800px;
  }
`;

const ProjectStaticsdetailDescriptionGuideline = styled.div`
  font-weight: 600;
  font-size: 2rem;
  font-style: italic;
  color: gray;
  margin: auto;
  .all {
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    position: relative;
    top: -230px;
    left: -350px;
    svg {
      margin: 0 auto;
      margin-bottom: 20px;
      font-size: 2rem;
      animation: ${arrowGuide2} 1.5s linear infinite;
    }
  }

  .none {
    svg {
      font-size: 3rem;
      margin: 0 20px;
      animation: ${arrowGuide} 1.5s linear infinite;
    }
    span {
      position: relative;
      top: -10px;
    }
  }
`;

const ProjectStaticsdetailDescription = styled.div`
  width: 500px;
  margin: 100px 0px 100px 50px;
  padding: 50px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 5px solid black;
  border-image: url(${process.env.PUBLIC_URL}/images/borderstyle.png) 20;
  box-shadow: 1px 1px 7px gray;
  h2 {
    font-weight: 600;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 50px;
  }

  p {
    font-size: 1.3rem;
    text-align: center;
  }
`;
const ProjectStaticsdetailDescriptionImportant = styled.div`
  display: flex;
  font-family: "Nanum Brush Script", cursive;
  font-size: 2rem;
  position: relative;
  top: -80px;
  left: -30px;

  div:nth-of-type(1) {
    border: ${(props) =>
      props.important === 1
        ? "3px dashed rgba(171, 242, 0, 0.8)"
        : "3px dashed transparent"};
  }
  div:nth-of-type(2) {
    border: ${(props) =>
      props.important === 2
        ? "3px dashed rgba(255, 187, 0, 0.7)"
        : "3px dashed transparent"};
  }
  div:nth-of-type(3) {
    border: ${(props) =>
      props.important === 3
        ? "3px dashed rgba(255, 0, 0, 0.7)"
        : "3px dashed transparent"};
  }

  div {
    text-align: center;
    line-height: 1.4;
    height: 50px;
    width: 50px;
    margin: 0 10px;
    border-radius: 50%;
  }

  .deadline {
    font-size: 1.5rem;
    margin-left: auto;
    width: 190px;
    margin-right: 0;
    position: relative;
    left: 40px;
  }
`;
export default ChartStatics;
