const { Goal, File, Comment, Like } = require("../../models");
const comment = require("../../models/comment");

module.exports = async (req, res) => {
  // TODO 목표 받아오는 api 구현
  // req.query.goal_id 가 주어졌을 때 goal 단독 검색
  // 주어지지 않으면 아래로 분기
  // req.query.project_id 필수
  // req.query.user_id 선택

  // goal_id 가 존재하면 단독 검색
  if (req.query.goal_id) {
    let goal_info;
    try {
      goal_info = await Goal.findOne({
        where: {
          id: req.query.goal_id,
        },
      });
    } catch {
      return res.status(500).json({ data: null, message: "데이터베이스 오류" });
    }
    // goal_info에 file 과 comment 내용 다 담아줘야함
    let file_info;
    let comment_info;
    try {
      file_info = await File.findAll({
        where: {
          goal_id: req.query.goal_id,
        },
      });
      comment_info = await Comment.findAll({
        where: {
          goal_id: req.query.goal_id,
        },
      });
      like_info = await Like.findAndCountAll({
        where: {
          goal_id: req.query.goal_id,
        },
      });
      console.log(like_info);
      goal_info.dataValues.like_count = like_info.count;
      goal_info.dataValues.files = file_info;
      goal_info.dataValues.comments = comment_info;
    } catch {
      file_info = null;
      comment_info = null;
    }

    const data = goal_info;

    return res.status(200).json({ data: data, message: "ok" });
  }
  // project_id 없으면 정보 누락
  if (!req.query.project_id) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 정보가 있습니다." });
  }
  // project_id와 user_id로 goals 테이블 검색
  let goal_info;
  try {
    if (req.query.user_id) {
      goal_info = await Goal.findAll({
        where: {
          user_id: req.query.user_id,
          project_id: req.query.project_id,
        },
      });
    } else {
      goal_info = await Goal.findAll({
        where: {
          project_id: req.query.project_id,
        },
      });
    }
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }

  for (let info of goal_info) {
    // info.dataValues.id로 file 및 comment 검색
    let file_info;
    let comment_info;
    try {
      file_info = await File.findAndCountAll({
        where: {
          goal_id: info.dataValues.id,
        },
      });
      comment_info = await Comment.findAndCountAll({
        where: {
          goal_id: info.dataValues.id,
        },
      });
      info.dataValues.files = file_info.count;
      info.dataValues.comments = comment_info.count;
    } catch {
      file_info = null;
      comment_info = null;
    }
  }

  const todo = [];
  const progress = [];
  const complete = [];

  for (let info of goal_info) {
    if (info.dataValues.state === "todo") todo.push(info.dataValues);
    if (info.dataValues.state === "progress") progress.push(info.dataValues);
    if (info.dataValues.state === "complete") complete.push(info.dataValues);
  }
  const data = { todo, progress, complete };

  return res.status(200).json({ data: data, message: "ok" });
};
