const { File } = require("../../models");

module.exports = async (req, res) => {
  // TODO file 내용 업데이트
  // req.body
  if (!req.body.fileId) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  try {
    await File.update(req.body, {
      where: {
        id: req.body.fileId,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }
  return res.status(201).json({ data: null, message: "ok" });
};
