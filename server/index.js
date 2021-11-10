require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

// const controllers = require("./controllers");
const users_router = require("./router/users_router");
const project_router = require("./router/project_router");
const goal_router = require("./router/goal_router");
const like_router = require("./router/like_router");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    // 테스트를 위한 주석 배포시엔 주석 해제
    // 포스트맨으로 요청 보내고 받기 위함
    // origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());
// TODO : 엔드포인트 관련 라우팅

app.use("/users", users_router);
app.use("/project", project_router);
// app.use("/goal", goal_router);
// app.use("/like", like_router);

app.get("/", (req, res) => {
  res.status(201).send("Hello World");
});
const HTTP_PORT = process.env.HTTP_PORT || 80;

const server = app.listen(HTTP_PORT);

module.exports = server;
