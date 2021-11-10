module.exports = (req, res) => {
  // TODO: 로그아웃 구현
  return res
    .status(200)
    .clearCookie("access_token")
    .json({ data: null, message: "ok" });
};
