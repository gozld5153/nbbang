const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = async (req, res) => {
  // TODO 마이페이지 내정보
  // 토큰으로만 정보 들어옴
  if (req.cookies.kakaoAccessToken) {
    const accessToken = req.cookies.kakaoAccessToken;
    // console.log(accessToken);
    let userInfo;
    try {
      userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      userInfo = userInfo.data.kakao_account;
      userInfo = await User.findOrCreate({
        where: {
          email: userInfo.email,
        },
        defaults: {
          username: userInfo.profile.nickname,
          password: "kakao",
        },
      });
    } catch (err) {
      console.log(err);
    }

    return res.status(200).json({ data: null, message: "ok" });
  }
  if (!req.cookies.accessToken) {
    return res
      .status(400)
      .json({ data: null, message: "토큰이 존재하지 않습니다." });
  }
  const token = req.cookies.accessToken;
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
  let userInfo;
  try {
    userInfo = await User.findOne({
      where: { email },
    });
    delete userInfo.dataValues.password;
  } catch {
    userInfo = null;
  }
  if (!userInfo) {
    return res
      .status(400)
      .json({ data: null, message: "일치하는 사용자가 존재하지 않습니다." });
  }
  return res.status(200).json({
    data: { userInfo: userInfo.dataValues },
    message: "ok",
  });
};
