import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MyPageWrapper } from "../style/MyPageStyles";
import { CgProfile } from "react-icons/cg";

export function MyPage() {
  return (
    <MyPageWrapper>
      <nav className="mypage-nav">
        <div className="mypage-nav-profile-img" />
        <Link to="profile">
          <CgProfile />
          프로필
        </Link>
        <Link to="project-inprogress">진행중인 프로젝트</Link>
        <Link to="project-done">완료한 프로젝트</Link>
      </nav>
      <Outlet />
    </MyPageWrapper>
  );
}

export function Profile() {
  return <div>프로필</div>;
}
export function ProjectInProgress() {
  return <div>진행중인 프로젝트</div>;
}
export function ProjectDone() {
  return <div>완료된 프로젝트</div>;
}
