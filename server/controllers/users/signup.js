const { User } = require("../../models");

module.exports = async (req, res) => {
  // TODO 회원가입 구현
  // req.body에 email과 password들어옴
  // email과 password로 db에 seed 추가
  // accesstoken 발급하지 않음

  // username, email, password 중 하나라도 없으면 400
  if (!(req.body.username && req.body.email && req.body.password)) {
    return res.status(400).json({
      data: null,
      message: "username, email, password 중 누락된 요청이 있습니다.",
    });
  }
  // 데이터베이스에 seed 추가
  let user_info;
  try {
    user_info = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
  } catch {
    user_info = null;
  }
  // seed 추가가 제대로 이루어지지 않았다면
  if (!user_info) {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }
  // 회원가입이 제대로 진행되면
  return res.status(200).json({
    message: "회원가입 되었습니다.",
  });
};