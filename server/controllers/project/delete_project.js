const { Users_Projects, Comment, File, Like, Goal } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 삭제 api 구현
  // req.params.project_id 에 project_id
  // project_id 가 포함된 모든 데이터 삭제해야함
  // Users_Projects Comments Goals Likes Files
  if (!req.params.project_id) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  try {
    await Users_Projects.destroy({
      where: {
        project_id: req.params.project_id,
      },
    });
    await Comment.destroy({
      where: {
        project_id: req.params.project_id,
      },
    });
    await File.destroy({
      where: {
        project_id: req.params.project_id,
      },
    });
    await Like.destroy({
      where: {
        project_id: req.params.project_id,
      },
    });
    await Goal.destroy({
      where: {
        project_id: req.params.project_id,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
