const { User } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 마이페이지 내정보
  // 토큰으로만 정보 들어옴
  if (!req.cookies.access_token) {
    return res
      .status(400)
      .json({ data: null, message: "토큰이 존재하지 않습니다." });
  }
  const token = req.cookies.access_token;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_SECRET);
  } catch {
    decoded = null;
  }
  if (!decoded) {
    return res
      .status(400)
      .json({ data: null, message: "토큰이 만료되었습니다." });
  }
  const { email } = decoded;
  let user_info;
  try {
    user_info = await User.findOne({
      where: { email },
    });
    delete user_info.dataValues.password;
  } catch {
    user_info = null;
  }
  if (!user_info) {
    return res
      .status(400)
      .json({ data: null, message: "일치하는 사용자가 존재하지 않습니다." });
  }
  return res.status(200).json({
    data: { user_info: user_info.dataValues },
    message: "ok",
  });
};
