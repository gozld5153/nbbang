module.exports = (req, res) => {
  // TODO: 로그아웃 구현
  return res
    .status(200)
    .cookie("accessToken", null, {
      httpOnly: true,
      maxAge: 0,
    })
    .json({ data: null, message: "로그아웃 되었습니다." });
};
