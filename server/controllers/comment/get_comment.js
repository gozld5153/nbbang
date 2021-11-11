const { Comment } = require("../../models");

module.exports = async (req, res) => {
  // TODO comment 조회 구현
  // req.params.goal_id
  if (!req.params.goal_id) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 항목이 있습니다." });
  }

  let data;
  try {
    data = await Comment.findAll({
      where: {
        goal_id: req.params.goal_id,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ data: data, message: "ok" });
};
