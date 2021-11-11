const { Goal } = require("../../models");

module.exports = async (req, res) => {
  // TODO 목표 받아오는 api 구현
  // req.params.user_id
  // req.params.project_id
  if (!(req.params.user_id && req.params.project_id)) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 정보가 있습니다." });
  }
  // project_id로 goals 테이블 검색

  return res.status(500).json({ data: null, message: "아직 구현 안함" });
};
