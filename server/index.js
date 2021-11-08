<<<<<<< HEAD
import React from "react";

const index = () => {
  return <div></div>;
};

export default index;
=======
require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

const controllers = require("./controllers");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: '*',
    // 테스트를 위한 주석 배포시엔 주석 해제
    // 포스트맨으로 요청 보내고 받기 위함
    // origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());
// TODO : 엔드포인트 관련 라우팅
app.post("/users/signin", controllers.signin);
// app.post("/users/signup", controllers.signup);
// app.get("/users/:id", controllers.get_user_info);
// app.get("/project/current/:id", controllers.project_current);
// app.get("/project/complete/:id", controllers.complete_project);
// app.delete("/project", controllers.delete_project);
// app.put("/users/:id", controllers.update_user_info);
// app.delete("/users/:id", controllers.delete_user);
// app.get("/project/:project_id", controllers.get_project);
// app.post("/project", controllers.make_new_project);
// app.delete("/project/:project_id", controllers.delete_project);
// app.put("/project/:project_id", controllers.update_project);
// app.get("/project/users", controllers.get_project_user);
// app.post("/goal", controllers.create_goal);
// app.get("/goal", controllers.get_goal);
// app.put("/goal", controllers.update_goal);
// app.delete("/goal", controllers.delete_goal);
// app.post("/like", controllers.make_like);
// app.delete("/like", controllers.delete_like);


const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;
// https로 실행(배포)시 아래 주석 해제
// if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

  // const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  // const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  // const credentials = { key: privateKey, cert: certificate };

  // server = https.createServer(credentials, app);
  // server.listen(HTTPS_PORT, () => console.log("server runnning"));

// } else {
  server = app.listen(HTTPS_PORT)
// }
module.exports = server;
>>>>>>> 580633269a104ebf6b6cc911d1fd908eecf157e1
