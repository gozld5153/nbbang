const { User, Project, UsersProjects } = require("../../models");
module.exports = async (req, res) => {
  // TODO 프로젝트 멤버 조회 구현
  // req.query.projectId
  if (!req.query.projectId) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  let projectInfo;
  let memberInfo = [];
  try {
    projectInfo = await Project.findOne({
      where: {
        id: req.query.projectId,
      },
    });
    let usersProjectInfo = await UsersProjects.findAll({
      where: {
        projectId: req.query.projectId,
      },
    });
    for (let info of usersProjectInfo) {
      let userInfo = await User.findOne({
        where: {
          id: info.dataValues.userId,
        },
      });
      delete userInfo.dataValues.password;

      userInfo.dataValues.color = info.dataValues.color;

      memberInfo.push(userInfo);
    }
    projectInfo.dataValues.members = memberInfo;
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }
  return res.status(200).json({ data: projectInfo, message: "ok" });
};
