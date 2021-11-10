const { Project } = require("../../models");

module.exports = async (req, res) => {
  // TODO 회원탈퇴 구현
  // req.params.project_id 에 프로젝트 id 값 들어옴
  if (!req.params.project_id) {
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }
  let project_info;
  try {
    project_info = await Project.findOne({
      where: { id: req.params.project_id },
    });
  } catch {
    project_info = null;
  }
  if (!project_info) {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(200).json({ data: project_info.dataValues, message: "ok" });
};
