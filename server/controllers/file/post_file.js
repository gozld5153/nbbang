const { File } = require("../../models");

module.exports = async (req, res) => {
  // TODO 파일 생성 구현
  // req.body에 담겨옴
  if (!(req.body.user_id && req.body.project_id && req.body.goal_id)) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  let file_info;
  try {
    file_info = await File.create(req.body);
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }
  return res.status(201).json({ data: file_info, message: "ok" });
};
