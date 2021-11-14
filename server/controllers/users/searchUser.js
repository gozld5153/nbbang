const { User } = require("../../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
  // TODO 유저 검색 기능 구현
  // req.params.email 에 담겨옴
  if (!req.params.email) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  let userInfo;
  try {
    userInfo = await User.findAll({
      attributes: ["id", "username", "email", "profile"],
      where: {
        email: {
          [Op.like]: `%${req.params.email}%`,
        },
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }

  return res.status(500).json({ data: userInfo, message: "ok" });
};
