import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
export default function Main() {
  // const navigate = useNavigate();
  // const kakao = () =>
  //   navigate(
  //     "https://kauth.kakao.com/oauth/authorize?client_id=3bcb5ae48e31dacbf58eb8cbcc65a29e&redirect_uri=http://localhost:3000&response_type=code"
  //   );
  // const kakao = async () => {
  //   console.log("작동");
  //   let data = await axios.get("http://localhost:4000/oauth/kakao");
  //   console.log(data);
  // };
  return (
    <div>
      <a href="https://kauth.kakao.com/oauth/authorize?client_id=3bcb5ae48e31dacbf58eb8cbcc65a29e&redirect_uri=http://localhost:3000&response_type=code">
        kakao
      </a>
    </div>
  );
}
