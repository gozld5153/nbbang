const { User, Comment } = require("../../models");

module.exports = async (req, res) => {
  // TODO comment 조회 구현
  // req.params.goalId
  if (!req.params.goalId) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 항목이 있습니다." });
  }

  let data;
  try {
    data = await Comment.findAll({
      where: {
        goalId: req.params.goalId,
      },
      include: {
        model: User,
        attributes: ["username"],
      },
    });
    console.log(data);
    for (let el of data) {
      el.dataValues.username = el.dataValues.User.dataValues.username;
      delete el.dataValues.User;
    }
    // data.dataValues.username = data.dataValues.User.dataValues.username;
    // delete data.dataValues.User;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ data: data, message: "ok" });
};
