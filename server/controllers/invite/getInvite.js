const { Project, Invite } = require("../../models");

module.exports = async (req, res) => {
  // TODO 초대요청 조회
  // req.params.userId
  if (!req.params.userId) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  let inviteInfo;
  try {
    inviteInfo = await Invite.findAll({
      where: {
        userId: req.params.userId,
      },
      attributes: ["id", "projectId"],
      include: {
        model: Project,
        attributes: ["projectName"],
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  let data = [];
  for (let el of inviteInfo) {
    let temp;
    temp = {
      inviteId: el.dataValues.id,
      projectName: el.dataValues.Project.dataValues.projectName,
    };
    data.push(temp);
  }
  return res.status(200).json({ data: data, message: "ok" });
};
