const { User } = require("../../models");

module.exports = async (req, res) => {
  // TODO 유저정보 업데이트
  // req.body에 객체로 들어옴
  if (!req.body.id) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  let howManyChanged;
  try {
    howManyChanged = await User.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
  } catch {
    howManyChanged = null;
  }
  if (!howManyChanged) {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: howManyChanged, message: "ok" });
};
