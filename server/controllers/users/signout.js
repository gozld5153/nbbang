module.exports = (req, res) => {
  // TODO: 로그아웃 구현
  return res
    .status(200)
    .clearCookie("accessToken")
    .json({ data: null, message: "ok" });
};
