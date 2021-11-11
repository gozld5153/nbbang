const { User } = require("../../models");

module.exports = async (req, res) => {
  // TODO 유저정보 업데이트
  // req.body에 객체로 들어옴
  if (!req.body.id) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  let how_many_changed;
  try {
    how_many_changed = await User.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
  } catch {
    how_many_changed = null;
  }
  if (!how_many_changed) {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: how_many_changed, message: "ok" });
};
