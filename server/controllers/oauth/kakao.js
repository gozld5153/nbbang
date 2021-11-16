const axios = require("axios");
const { User } = require("../../models");

module.exports = async (req, res) => {
  // TODO kakao Oauth 구현
  console.log("서버에 요청왔음");
  // req.body.code 에 담겨서 옴
  // 환경변수 받아옴
  const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
  // const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;
  if (!req.body.code) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  // url 설정
  const url = new URL("https://kauth.kakao.com/oauth/token");
  url.searchParams.append("grant_type", "authorization_code");
  url.searchParams.append("client_id", KAKAO_CLIENT_ID);
  url.searchParams.append("redirect_uri", KAKAO_REDIRECT_URI);
  url.searchParams.append("code", req.body.code);

  let accessToken;
  let refreshToken;
  let data;
  try {
    // 코드로 토큰 요청
    const tokenInfo = await axios.post(url.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    accessToken = tokenInfo.data.access_token;
    refreshToken = tokenInfo.data.refresh_token;
    let userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    userInfo = userInfo.data.kakao_account;
    data = await User.findOrCreate({
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
    return res.status(500).json({ data: null, message: "잘못된 요청입니다." });
  }

  return res
    .status(200)
    .cookie(
      "accessToken",
      { kakaoAccessToken: accessToken },
      {
        httpOnly: true,
      }
    )
    .json({
      data: null,
      message: "ok",
    });
};
