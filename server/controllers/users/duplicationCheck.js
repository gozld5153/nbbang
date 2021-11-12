const { User } = require("../../models");

module.exports = async (req, res) => {
  // TODO email 중복검사
  // body로 email 전달
  let userInfo;
  try {
    userInfo = await User.findOne({
      where: { email: req.body.email },
    });
  } catch {
    userInfo = null;
  }
  if (!userInfo) {
    return res.status(200).json({
      data: null,
      message: "ok",
    });
  }
  return res.status(400).json({
    message: "중복되는 이메일이 존재합니다.",
    data: null,
  });
};
