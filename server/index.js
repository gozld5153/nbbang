require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const usersRouter = require("./router/usersRouter");
const projectRouter = require("./router/projectRouter");
const goalRouter = require("./router/goalRouter");
const likeRouter = require("./router/likeRouter");
const commentRouter = require("./router/commentRouter");
const fileRouter = require("./router/fileRouter");
const testRouter = require("./router/testRouter");
const inviteRouter = require("./router/inviteRouter");

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
app.use("/users", usersRouter);
app.use("/project", projectRouter);
app.use("/goal", goalRouter);
app.use("/like", likeRouter);
app.use("/comment", commentRouter);
app.use("/file", fileRouter);
app.use("/test", testRouter);
app.use("/invite", inviteRouter);

app.get("/", (req, res) => {
  res.status(201).send("Hello World");
});
const HTTP_PORT = process.env.HTTP_PORT || 80;

const server = app.listen(HTTP_PORT);

module.exports = server;
