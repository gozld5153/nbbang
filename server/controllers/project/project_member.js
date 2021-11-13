const { User, Project, Users_Projects } = require("../../models");
const user = require("../../models/user");

module.exports = async (req, res) => {
  // TODO 프로젝트 멤버 조회 구현
  // req.query.project_id
  if (!req.query.project_id) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  let project_info;
  let member_info = [];
  try {
    project_info = await Project.findOne({
      where: {
        id: req.query.project_id,
      },
    });
    let users_project_info = await Users_Projects.findAll({
      where: {
        project_id: req.query.project_id,
      },
    });
    for (let info of users_project_info) {
      let user_info = await User.findOne({
        where: {
          id: info.dataValues.user_id,
        },
      });
      delete user_info.dataValues.password;

      user_info.dataValues.color = info.dataValues.color;

      member_info.push(user_info);
    }
    project_info.dataValues.members = member_info;
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }
  return res.status(200).json({ data: project_info, message: "ok" });
};
