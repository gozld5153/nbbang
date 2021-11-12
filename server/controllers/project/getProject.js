const { User, Project, UsersProjects, Like } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 단독 요청 구현
  // req.params.projectId 에 프로젝트 id
  // req.params.userId userId

  if (!(req.params.projectId && req.params.userId)) {
    return res
      .status(400)
      .json({ data: null, message: "프로젝트 및 유저 정보가 누락되었습니다." });
  }

  // user table 검색
  let userInfo;
  try {
    userInfo = await User.findOne({
      where: { id: req.params.userId },
    });
    delete userInfo.dataValues.password;
  } catch {
    userInfo = null;
  }
  if (!userInfo) {
    return res.status(500).json({
      data: null,
      message: "데이터베이스 에러 또는 존재하지 않는 사용자입니다.",
    });
  }

  // like table 검색
  let likeInfo;
  try {
    likeInfo = await Like.findAll({
      attributes: ["id"],
      where: { userId: req.params.userId, agreement: true },
    });
  } catch {
    likeInfo = null;
  }

  // likeId를 userInfo에 추가
  if (likeInfo) {
    likeInfo = likeInfo.map((el) => {
      return el.dataValues.id;
    });
  }
  userInfo.dataValues.likeId = likeInfo;

  // project table 검색
  let projectInfo;
  try {
    projectInfo = await Project.findOne({
      where: { id: req.params.projectId },
    });
  } catch {
    projectInfo = null;
  }
  if (!projectInfo) {
    return res.status(500).json({
      data: null,
      message: "데이터베이스 에러 또는 존재하지 않는 프로젝트입니다.",
    });
  }
  // usersProjects 검색
  let usersProjectsInfo;
  try {
    usersProjectsInfo = await UsersProjects.findAll({
      attributes: ["userId", "color"],
      where: {
        projectId: req.params.projectId,
      },
    });
  } catch {
    usersProjectsInfo = null;
  }
  // project에 포함된 멤버 검색
  let memberInfo = [];
  try {
    for (let info of usersProjectsInfo) {
      let temp = await User.findOne({
        where: { id: info.userId },
      });
      // password 정보 삭제
      delete temp.dataValues.password;
      // color 정보 추가
      temp.dataValues.color = info.color;
      memberInfo.push(temp.dataValues);
    }
  } catch {
    memberInfo = null;
  }
  // project_info에 members 추가
  projectInfo.dataValues.members = memberInfo;
  const data = {
    userInfo,
    projectInfo,
  };
  return res.status(200).json({ data: data, message: "ok" });
};

// GET /project/:project_id/:id
// 프로젝트 페이지(단독)
