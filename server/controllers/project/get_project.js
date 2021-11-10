const { User, Project, Users_Projects, Like } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 단독 요청 구현
  // req.params.project_id 에 프로젝트 id
  // req.params.user_id user_id

  if (!(req.params.project_id && req.params.user_id)) {
    return res
      .status(400)
      .json({ data: null, message: "프로젝트 및 유저 정보가 누락되었습니다." });
  }

  // user table 검색
  let user_info;
  try {
    user_info = await User.findOne({
      where: { id: req.params.user_id },
    });
    delete user_info.dataValues.password;
  } catch {
    user_info = null;
  }
  if (!user_info) {
    return res.status(500).json({
      data: null,
      message: "데이터베이스 에러 또는 존재하지 않는 사용자입니다.",
    });
  }

  // like table 검색
  let like_info;
  try {
    like_info = await Like.findAll({
      attributes: ["id"],
      where: { user_id: req.params.user_id, agreement: true },
    });
  } catch {
    like_info = null;
  }

  // like_id를 user_info에 추가
  if (like_info) {
    like_info = like_info.map((el) => {
      return el.dataValues.id;
    });
  }
  user_info.dataValues.like_id = like_info;

  // project table 검색
  let project_info;
  try {
    project_info = await Project.findOne({
      where: { id: req.params.project_id },
    });
  } catch {
    project_info = null;
  }
  if (!project_info) {
    return res.status(500).json({
      data: null,
      message: "데이터베이스 에러 또는 존재하지 않는 프로젝트입니다.",
    });
  }
  console.log(project_info);
  // users_projects 검색
  let users_projects_info;
  try {
    users_projects_info = await Users_Projects.findAll({
      attributes: ["user_id", "color"],
      where: {
        project_id: req.params.project_id,
      },
    });
  } catch {
    users_projects_info = null;
  }
  // project에 포함된 멤버 검색
  let member_info = [];
  try {
    for (let info of users_projects_info) {
      let temp = await User.findOne({
        where: { id: info.user_id },
      });
      // password 정보 삭제
      delete temp.dataValues.password;
      // color 정보 추가
      temp.dataValues.color = info.color;
      member_info.push(temp.dataValues);
    }
  } catch {
    member_info = null;
  }
  // project_info에 members 추가
  project_info.dataValues.members = member_info;
  const data = {
    user_info,
    project_info,
  };
  return res.status(200).json({ data: data, message: "ok" });
};

// GET /project/:project_id/:id
// 프로젝트 페이지(단독)
