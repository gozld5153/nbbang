import styled from "styled-components";

export const MyPageWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;

  .mypage-nav {
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 100vh;
    background-color: gray;

    .mypage-nav-profile-img {
      width: 200px;
      height: 200px;
      background-color: orange;
    }
  }
`;
