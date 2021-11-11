const { Like } = require("../../models");

module.exports = async (req, res) => {
  // TODO like 삭제 구현
  // req.params.like_id
  if (!req.params.like_id) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 항목이 있습니다." });
  }
  try {
    await Like.destroy({
      where: {
        id: req.params.like_id,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: null, message: "ok" });
};
