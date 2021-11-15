const { UsersProjects, Invite } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트에 유저 추가 구현
  // project/addmember/:projectId/:userId
  // req.params.userId
  // req.params.projectId
  if (!(req.params.userId && req.params.projectId)) {
    return res.status(500).json({ data: null, message: "잘못된 요청입니다." });
  }

  try {
    await UsersProjects.findOrCreate({
      where: {
        userId: req.params.userId,
        projectId: req.params.projectId,
      },
    });
    await Invite.destroy({
      where: {
        userId: req.params.userId,
        projectId: req.params.projectId,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: null, message: "ok" });
};
