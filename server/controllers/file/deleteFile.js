const { File } = require("../../models");

module.exports = async (req, res) => {
  // TODO file 삭제 구현
  if (!req.params.fileId) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  try {
    await File.destroy({
      where: {
        id: req.params.fileId,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }
  return res.status(201).json({ data: null, message: "ok" });
};
