const { User } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 회원가입 구현
  // req.body에 email과 password들어옴
  // email과 password로 db검색 후 일치하는게 있다면 accesstoken 발급
  const userInfo = await User.findOne({
    where: { email: req.body.email, password: req.body.password },
  });
  if (!userInfo) {
    return res
      .status(400)
      .json({ data: null, message: "존재하지 않는 사용자입니다." });
  }
  delete userInfo.dataValues.password;
  const accessToken = jwt.sign(userInfo.dataValues, process.env.ACCESS_SECRET, {
    expiresIn: "30d",
  });

  const { username } = userInfo.dataValues;
  return res.status(200).json({
    message: `${username} 로그인`,
    data: { accessToken: accessToken },
  });
};
