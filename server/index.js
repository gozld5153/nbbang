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
    origin: "*",
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
// app.use("/project", project_router);
// app.use("/goal", goal_router);
// app.use("/like", like_router);

const HTTP_PORT = process.env.HTTP_PORT || 4000;

let server;
// https로 실행(배포)시 아래 주석 해제
// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

// const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
// const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
// const credentials = { key: privateKey, cert: certificate };

// server = https.createServer(credentials, app);
// server.listen(HTTPS_PORT, () => console.log("server runnning"));

// } else {
server = app.listen(HTTP_PORT);
// }
module.exports = server;
