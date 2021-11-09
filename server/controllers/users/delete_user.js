const { User } = require("../../models");

module.exports = async (req, res) => {
  // TODO 회원탈퇴 구현
  // req.params에 id 들어옴
  if (!req.params.id) {
    return res.status(400).json({ message: "잘못된 요청입니다." });
  }
  let user_info;
  try {
    user_info = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch {
    user_info = null;
  }
  if (!user_info) {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: user_info, message: "ok" });
};
