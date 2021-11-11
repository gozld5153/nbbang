import styled from "styled-components";

const StyledProgressbar = styled.meter`
  width: ${(props) => props.width || "300px"};
  height: ${(props) => props.height || "20px"};
  /* background-color: gray; */
`;

export default function Progressbar(props) {
  return (
    <>
      <StyledProgressbar
        min="0"
        max="100"
        low="33"
        high="66"
        optimum="80"
        {...props}
      />
      <div
        style={{
          marginLeft: `${((props.width || 300) * props.value) / 100 - 10}px`,
          marginTop: "5px",
        }}
      >
        {props.value} %
      </div>
    </>
  );
}
