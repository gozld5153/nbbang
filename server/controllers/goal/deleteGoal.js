const { Goal } = require("../../models");

module.exports = async (req, res) => {
  // TODO 목표 삭제 구현
  // req.params.goalId
  if (!req.params.goalId) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  try {
    await Goal.destroy({
      where: {
        id: req.params.goalId,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
