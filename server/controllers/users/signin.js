const { User } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 로그인 구현
  // req.body에 email과 password들어옴
  // email과 password로 db검색 후 일치하는게 있다면 accesstoken 발급

  if (!(req.body.email && req.body.password)) {
    return res
      .status(400)
      .json({ data: null, message: "email 또는 password가 누락되었습니다." });
  }

  let user_info;
  try {
    user_info = await User.findOne({
      where: { email: req.body.email, password: req.body.password },
    });
  } catch {
    user_info = null;
  }
  if (!user_info) {
    return res
      .status(400)
      .json({ data: null, message: "존재하지 않는 사용자입니다." });
  }
  // 데이터에서 password 제거
  delete user_info.dataValues.password;
  // access_token 발급
  const access_token = jwt.sign(
    user_info.dataValues,
    process.env.ACCESS_SECRET,
    {
      expiresIn: "30d",
    }
  );

  const { username } = user_info.dataValues;
  return res
    .status(200)
    .cookie("access_token", access_token, {
      httpOnly: true,
    })
    .json({
      message: `${username} 로그인`,
      data: null,
    });
};
