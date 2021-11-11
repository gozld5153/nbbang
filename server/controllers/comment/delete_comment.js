const { Comment } = require("../../models");

module.exports = async (req, res) => {
  // TODO comment 삭제 구현
  // req.params.comment_id
  if (!req.params.comment_id) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 항목이 있습니다." });
  }
  try {
    await Comment.destroy({
      where: {
        id: req.params.comment_id,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }

  return res.status(201).json({ data: null, message: "ok" });
};
