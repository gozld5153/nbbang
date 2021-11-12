import { useState } from "react";
import styled, { css } from "styled-components";
import { InProgress, InProgress2 } from "../../mockdata/MyPageProjectData";
const Pagination = styled.div`
  display: flex;
  margin: 40px 600px; ;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  color: gray;
  font-size: 1.6rem;
`;

const Page = styled.div`
  background: #dedede;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  margin: 0 5px;
  font-size: 1.3rem;
  text-align: center;
  line-height: 2.3;

  ${(props) =>
    props.page === props.p &&
    css`
      background: orange;
      color: white;
      font-weight: 600;
    `}
`;

export default function ProjectPagePagination({ setUserData }) {
  const [pageNum, setPageNum] = useState(1);

  const handleButton = (event) => {
    const clsName = event.target.classList[2];

    const newPageNum = clsName === "next-page" ? pageNum + 1 : pageNum - 1;
    if (newPageNum < 1) return;
    setPageNum(newPageNum);
    if (newPageNum === 1) setUserData(InProgress);
    else setUserData(InProgress2);
  };
  const total = 2;
  const PageArr = new Array(total).fill(0).map((_, idx) => idx + 1);
  return (
    <Pagination>
      <Button className="previous-page" onClick={handleButton}>
        &#60;
      </Button>
      {PageArr.map((p) => (
        <Page page={pageNum} p={p}>
          {p}
        </Page>
      ))}
      <Button className="next-page" onClick={handleButton}>
        &#62;
      </Button>
    </Pagination>
  );
}
