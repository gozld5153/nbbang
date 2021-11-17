const { User } = require("../../models");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  // TODO 로그인 구현
  // req.body에 email과 password들어옴
  // email과 password로 db검색 후 일치하는게 있다면 accesstoken 발급
  // accessToken이 존재하면 토큰으로 로그인

  if (!(req.body.email && req.body.password)) {
    return res
      .status(400)
      .json({ data: null, message: "email 또는 password가 누락되었습니다." });
  }

  let userInfo;
  try {
    userInfo = await User.findOne({
      where: { email: req.body.email, password: req.body.password },
    });
  } catch {
    userInfo = null;
  }
  if (!userInfo) {
    return res
      .status(400)
      .json({ data: null, message: "존재하지 않는 사용자입니다." });
  }
  // 데이터에서 password 제거
  // delete userInfo.dataValues.password;
  // accessToken 발급
  const accessToken = jwt.sign(
    { email: userInfo.dataValues.email },
    process.env.ACCESS_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return res
    .status(200)
    .cookie(
      "accessToken",
      { nbbangAccessToken: accessToken },
      {
        httpOnly: true,
      }
    )
    .json({
      message: "ok",
      data: null,
    });
};
