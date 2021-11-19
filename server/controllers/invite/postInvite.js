const { Invite, Project, User } = require("../../models");

module.exports = async (req, res) => {
  // TODO 초대요청 저장 기능 구현
  // req.body.userId
  // req.body.projectId
  if (!(req.body.userId && req.body.projectId && req.body.color)) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  let data;
  try {
    let captainId = await Project.findOne({
      where: {
        id: req.body.projectId,
      },
      attributes: ["captainId"],
    });
    captainId = captainId.dataValues.captainId;
    let captainName = await User.findOne({
      attributes: ["username"],
      where: {
        id: captainId,
      },
    });
    captainName = captainName.dataValues.username;

    data = await Invite.findOrCreate({
      where: {
        userId: req.body.userId,
        projectId: req.body.projectId,
        color: req.body.color,
        captainName: captainName,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: data, message: "ok" });
};
