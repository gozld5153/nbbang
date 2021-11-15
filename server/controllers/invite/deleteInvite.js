const { Invite } = require("../../models");

module.exports = async (req, res) => {
  // TODO 초대 거부
  // req.params.inviteId
  if (!req.params.inviteId) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  try {
    await Invite.destroy({
      where: {
        id: req.params.inviteId,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: null, message: "ok" });
};
