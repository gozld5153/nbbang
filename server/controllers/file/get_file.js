const { File } = require("../../models");

module.exports = async (req, res) => {
  // TODO file 조회 구현
  // req.params.file_id
  if (!req.params.file_id) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  let file_info;
  try {
    file_info = await File.findOne({
      where: {
        id: req.params.file_id,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }
  return res.status(200).json({ data: file_info, message: "ok" });
};
