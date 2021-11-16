const { File } = require("../../models");

module.exports = async (req, res) => {
  // TODO 파일 생성 구현
  // req.body에 담겨옴
  if (!(req.body.userId && req.body.goalId)) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  let fileInfo;
  try {
    fileInfo = await File.create(req.body);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }
  return res.status(201).json({ data: fileInfo, message: "ok" });
};
