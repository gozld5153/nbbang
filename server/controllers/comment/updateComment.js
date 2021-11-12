const { Comment } = require("../../models");

module.exports = async (req, res) => {
  // TODO comment 수정 구현
  if (!req.body.id) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 항목이 있습니다." });
  }
  let data;
  try {
    data = await Comment.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: data, message: "ok" });
};
