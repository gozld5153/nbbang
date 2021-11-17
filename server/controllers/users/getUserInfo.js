const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const axios = require("axios");

module.exports = async (req, res) => {
  // TODO 마이페이지 내정보
  // 토큰으로만 정보 들어옴
  if (!req.cookies.accessToken) {
    return res
      .status(400)
      .json({ data: null, message: "토큰이 존재하지 않습니다." });
  }
  // ! KAKAO Oauth
  if (req.cookies.accessToken.kakaoAccessToken) {
    // 토큰 받아옴
    const accessToken = req.cookies.accessToken.kakaoAccessToken;
    let userInfo;
    try {
      // 토큰으로 정보요청
      userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      // 받아온 정보 userInfo 로 db검색
      userInfo = userInfo.data.kakao_account;
      userInfo = await User.findOne({
        where: {
          email: userInfo.email,
        },
      });
      delete userInfo.dataValues.password;
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ data: null, message: "토큰이 만료되었습니다." });
    }

    return res
      .status(200)
      .json({ data: { userInfo: userInfo.dataValues }, message: "ok" });
  }
  // ! KAKAO Oauth 끝
  if (!req.cookies.accessToken.nbbangAccessToken) {
    return res
      .status(400)
      .json({ data: null, message: "토큰이 존재하지 않습니다." });
  }
  const token = req.cookies.accessToken.nbbangAccessToken;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_SECRET);
  } catch {
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
    res.status(400).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(200).json({
    data: { userInfo: userInfo.dataValues },
    message: "ok",
  });
};
