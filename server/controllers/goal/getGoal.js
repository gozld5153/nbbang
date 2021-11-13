const { Goal, File, Comment, Like } = require("../../models");
const comment = require("../../models/comment");

module.exports = async (req, res) => {
  // TODO 목표 받아오는 api 구현
  // req.query.goalId 가 주어졌을 때 goal 단독 검색
  // 주어지지 않으면 아래로 분기
  // req.query.projectId 필수
  // req.query.userId 선택
  // goalId 가 존재하면 단독 검색

  if (req.query.goalId) {
    let goalInfo;
    try {
      goalInfo = await Goal.findOne({
        where: {
          id: req.query.goalId,
        },
      });
    } catch {
      return res.status(500).json({ data: null, message: "데이터베이스 오류" });
    }
    // goalInfo에 file 과 comment 내용 다 담아줘야함
    let fileInfo;
    let commentInfo;
    try {
      fileInfo = await File.findAll({
        where: {
          goalId: req.query.goalId,
        },
      });
      commentInfo = await Comment.findAll({
        where: {
          goalId: req.query.goalId,
        },
      });
      likeInfo = await Like.findAndCountAll({
        where: {
          goalId: req.query.goalId,
        },
      });
      goalInfo.dataValues.likeCount = likeInfo.count;
      goalInfo.dataValues.files = fileInfo;
      goalInfo.dataValues.comments = commentInfo;
    } catch {
      fileInfo = null;
      commentInfo = null;
    }

    const data = goalInfo;

    return res.status(200).json({ data: data, message: "ok" });
  }
  // projectId 없으면 정보 누락
  if (!req.query.projectId) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 정보가 있습니다." });
  }
  // projectId와 userId로 goals 테이블 검색
  let goalInfo;
  try {
    if (req.query.userId) {
      goalInfo = await Goal.findAll({
        where: {
          userId: req.query.userId,
          projectId: req.query.projectId,
        },
      });
    } else {
      goalInfo = await Goal.findAll({
        where: {
          projectId: req.query.projectId,
        },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }

  for (let info of goalInfo) {
    // info.dataValues.id로 file 및 comment 검색
    let fileInfo;
    let commentInfo;
    try {
      fileInfo = await File.findAndCountAll({
        where: {
          goalId: info.dataValues.id,
        },
      });
      commentInfo = await Comment.findAndCountAll({
        where: {
          goalId: info.dataValues.id,
        },
      });
      info.dataValues.files = fileInfo.count;
      info.dataValues.comments = commentInfo.count;
    } catch {
      fileInfo = null;
      commentInfo = null;
    }
  }

  const todo = [];
  const progress = [];
  const complete = [];

  for (let info of goalInfo) {
    if (info.dataValues.state === "todo") todo.push(info.dataValues);
    if (info.dataValues.state === "progress") progress.push(info.dataValues);
    if (info.dataValues.state === "complete") complete.push(info.dataValues);
  }
  const data = { todo, progress, complete };

  return res.status(200).json({ data: data, message: "ok" });
};
