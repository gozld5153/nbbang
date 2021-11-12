const { UsersProjects, Comment, File, Like, Goal } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 삭제 api 구현
  // req.params.projectId 에 projectId
  // projectId 가 포함된 모든 데이터 삭제해야함
  // UsersIrojects Comments Goals Likes Files
  if (!req.params.projectId) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  try {
    await UsersProjects.destroy({
      where: {
        projectId: req.params.projectId,
      },
    });
    await Comment.destroy({
      where: {
        projectId: req.params.projectId,
      },
    });
    await File.destroy({
      where: {
        projectId: req.params.projectId,
      },
    });
    await Like.destroy({
      where: {
        projectId: req.params.projectId,
      },
    });
    await Goal.destroy({
      where: {
        projectId: req.params.projectId,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
