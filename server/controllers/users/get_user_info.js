const { User } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 마이페이지 내정보
  // 파라미터로 email 전달
  let user_info;
  try {
    user_info = await User.findOne({
      where: { id: req.params.id },
    });
  } catch {
    user_info = null;
  }
  if (!user_info) {
    return res.status(400).json({
      message: "잘못된 요청입니다.",
      data: null,
    });
  }
  delete user_info.dataValues.password;
  return res.status(200).json({
    message: "ok",
    data: user_info.dataValues,
  });
};
