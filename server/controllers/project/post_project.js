const { Project } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 생성 구현
  // req.body에 프로젝트 객체
  console.log(req.body);
  if (!(req.body.project_name && req.body.captain_id)) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 항목이 있습니다." });
  }
  let response;
  try {
    response = await Project.create(req.body);
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }
  return res.status(201).json({ data: response, message: "ok" });
};
