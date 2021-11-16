const express = require("express");
const router = express.Router();
const {
  User,
  Project,
  UsersProjects,
  Like,
  Comment,
  File,
  Goal,
} = require("../models");

const test = async (req, res) => {
  // TODO test 용도
  let data;
  try {
    data = new Date();
  } catch (err) {
    console.log(err);
  }
  // console.log(data.toLocaleString().replaceAll("/", "-"));
  var str =
    data.getFullYear() + "-" + (data.getMonth() + 1) + "-" + data.getDate();

  //dororongju.tistory.com/116 [웹 개발 메모장]

  출처: https: return res
    .status(500)
    .json({ data: str, message: "아직 구현 안함" });
};

router.get("/", test);

module.exports = router;
