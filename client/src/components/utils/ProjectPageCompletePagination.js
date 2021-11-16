import { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";

const Pagination = styled.div`
  display: flex;
  margin: 0 550px;
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  color: gray;
  font-size: 1.6rem;
  margin: 0 5px;
`;

const Page = styled.div`
  background: #dedede;
  width: 50px;
  height: 50px;
  font-size: 1.3rem;
  text-align: center;
  line-height: 2.3;

  ${(props) =>
    props.page === props.p &&
    css`
      background: black;
      color: white;
      font-weight: 600;
    `}
`;

export default function ProjectPageCompletePagination({
  setCompleteProjects,
  totalCount,
  userId,
}) {
  const [pageNum, setPageNum] = useState(1);
  const total = Math.ceil(totalCount / 5);
  const PageArr = new Array(total).fill(0).map((_, idx) => idx + 1);

  const handleButton = async (event) => {
    const clsName = event.target.classList[2];

    const newPageNum = clsName === "next-page" ? pageNum + 1 : pageNum - 1;
    if (newPageNum < 1 || newPageNum > total) return;
    setPageNum(newPageNum);
    const { data } = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_API_URL}/project/${userId}/?state=complete&page=${newPageNum}`,
      withCredentials: true,
    });

    setCompleteProjects(data.data);
  };

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
