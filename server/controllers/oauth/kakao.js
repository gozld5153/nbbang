const axios = require("axios");

module.exports = async (req, res) => {
  // TODO kakao Oauth 구현
  console.log("서버에 요청왔음");
  // req.body.code 에 담겨서 옴
  const KAKAO_CLIENT_ID = process.env.KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;
  // const KAKAO_CLIENT_SECRET = process.env.KAKAO_CLIENT_SECRET;

  const url = new URL("https://kauth.kakao.com/oauth/token");
  url.searchParams.append("grant_type", "authorization_code");
  url.searchParams.append("client_id", KAKAO_CLIENT_ID);
  url.searchParams.append("redirect_uri", KAKAO_REDIRECT_URI);
  url.searchParams.append("code", req.body.code);

  let accessToken;
  try {
    const data = await axios.post(url.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    console.log(data.data);
    accessToken = data.data.access_token;
    // const refreshToken = data.data.refresh_token;
  } catch (err) {
    console.log(err);
  }

  return res
    .status(200)
    .cookie("kakaoAccessToken", accessToken, {
      httpOnly: true,
    })
    .json({
      message: "ok",
      data: null,
    });
};
