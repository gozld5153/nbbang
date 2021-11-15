const { Invite } = require("../../models");

module.exports = async (req, res) => {
  // TODO 초대요청 저장 기능 구현
  // req.body.userId
  // req.body.projectId
  if (!(req.body.userId && req.body.projectId)) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  let data;
  try {
    data = await Invite.findOrCreate({
      where: {
        userId: req.body.userId,
        projectId: req.body.projectId,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: data, message: "ok" });
};
