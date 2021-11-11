const { Comment } = require("../../models");

module.exports = async (req, res) => {
  // TODO comment 생성 구현
  // req.body에 생성내용 들어옴
  if (!(req.body.user_id && req.body.project_id && req.body.goal_id)) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 항목이 있습니다." });
  }
  let data;
  try {
    data = await Comment.create(req.body);
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: data, message: "ok" });
};
