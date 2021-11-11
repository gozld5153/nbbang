const { Goal } = require("../../models");

module.exports = async (req, res) => {
  // TODO 목표 받아오는 api 구현
  // req.query.user_id
  // req.query.project_id
  if (!req.query.project_id) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 정보가 있습니다." });
  }
  // project_id와 user_id로 goals 테이블 검색
  let goal_info;
  try {
    if (req.query.user_id) {
      goal_info = await Goal.findAll({
        where: {
          user_id: req.query.user_id,
          project_id: req.query.project_id,
        },
      });
    }
    goal_info = await Goal.findAll({
      where: {
        project_id: req.query.project_id,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }

  return res.status(200).json({ data: goal_info, message: "ok" });
};
