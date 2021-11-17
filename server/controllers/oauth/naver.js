const axios = require("axios");
const { User } = require("../../models");

module.exports = async (req, res) => {
  // TODO 네이버 소셜로그인 구현
  const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
  const NAVER_REDIRECT_URI = process.env.NAVER_REDIRECT_URI;
  const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

  if (!(req.body.code && req.body.state)) {
    return res.status(400).json({
      data: null,
      message: "잘못된 요청입니다.",
    });
  }

  api_url =
    "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=" +
    NAVER_CLIENT_ID +
    "&client_secret=" +
    NAVER_CLIENT_SECRET +
    "&redirect_uri=" +
    NAVER_REDIRECT_URI +
    "&code=" +
    req.body.code +
    "&state=" +
    req.body.state;
  let data;
  let accessToken;
  // let refreshToken;
  try {
    data = await axios.get(api_url, {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
      },
    });
    accessToken = data.data.access_token;
    // refreshToken = data.data.refresh_token;

    userInfo = await axios.get("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // userInfo에 정보 들어옴
    let nickname = userInfo.data.response.nickname;
    let email = userInfo.data.response.email;
    data = await User.findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        username: nickname,
        password: "naver",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: null,
      message: "데이터베이스 에러",
    });
  }
  // data 잘 받아옴

  return res
    .status(200)
    .cookie(
      "accessToken",
      { naverAccessToken: accessToken },
      {
        httpOnly: true,
      }
    )
    .json({
      data: data,
      message: "ok",
    });
};
