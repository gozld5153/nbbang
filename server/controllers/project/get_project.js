const { Project } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 단독 요청 구현
  // req.params.project_id 에 프로젝트 id
  // req.params.user_id user_id
  if (!req.params.project_id) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  // console.log("user_id", req.params.user_id);
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
  return res.status(200).json({ data: project_info.dataValues, message: "ok" });
};
