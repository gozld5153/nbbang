const { Goal, File, Comment, Like, User } = require("../../models");

module.exports = async (req, res) => {
  // TODO 목표 받아오는 api 구현
  // req.query.goalId 가 주어졌을 때 goal 단독 검색
  // 주어지지 않으면 아래로 분기
  // req.query.projectId 필수
  // req.query.userId 선택
  // goalId 가 존재하면 단독 검색
  // req.query.details === true

  if (req.query.goalId && req.query.userId) {
    let goalInfo;

    try {
      goalInfo = await Goal.findOne({
        where: {
          id: req.query.goalId,
        },
        include: [
          File,
          {
            model: Comment,
            include: {
              model: User,
              attributes: ["username"],
            },
          },
          {
            model: Like,
            attributes: ["id", "userId"],
          },
        ],
      });
      goalInfo.dataValues.likeCount = goalInfo.dataValues.Likes.length;
      for (let el of goalInfo.dataValues.Comments) {
        el.dataValues.username = el.dataValues.User.dataValues.username;
        delete el.dataValues.User;
      }
      for (let el of goalInfo.dataValues.Likes) {
        if (el.dataValues.userId === req.query.userId) {
          goalInfo.dataValues.LikeId = el.dataValues.id;
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: null, message: "데이터베이스 오류" });
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
        include: [File, Comment, Like],
      });
    } else {
      goalInfo = await Goal.findAll({
        where: {
          projectId: req.query.projectId,
        },
        include: [File, Comment, Like],
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }

  const todo = [];
  const progress = [];
  const complete = [];

  for (let info of goalInfo) {
    if (!req.query.details) {
      info.dataValues.Files = info.dataValues.Files.length;
      info.dataValues.Likes = info.dataValues.Likes.length;
      info.dataValues.Comments = info.dataValues.Comments.length;
    }
    if (info.dataValues.state === "todo") todo.push(info.dataValues);
    if (info.dataValues.state === "progress") progress.push(info.dataValues);
    if (info.dataValues.state === "complete") complete.push(info.dataValues);
  }
  const data = { todo, progress, complete };

  return res.status(200).json({ data: data, message: "ok" });
};
