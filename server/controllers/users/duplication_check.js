const { User } = require("../../models");

module.exports = async (req, res) => {
  // TODO email 중복검사
  // body로 email 전달
  console.log(req);
  let user_info;
  try {
    user_info = await User.findOne({
      where: { email: req.body.email },
    });
  } catch {
    user_info = null;
  }
  if (!user_info) {
    return res.status(200).json({
      message: "ok",
      data: null,
    });
  }
  return res.status(400).json({
    message: "중복되는 이메일이 존재합니다.",
    data: null,
  });
};
