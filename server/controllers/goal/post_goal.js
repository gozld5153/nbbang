const { Goal } = require("../../models");

module.exports = async (req, res) => {
  // TODO 목표 생성 api 구현
  // req.body에 goal 정보 들어옴
  if (!(req.body.user_id && req.body.project_id && req.body.goal_name)) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 항목이 있습니다." });
  }
  let response;
  try {
    response = await Goal.create(req.body);
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }
  return res.status(201).json({ data: response, message: "ok" });
};
