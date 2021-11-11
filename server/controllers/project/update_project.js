const { Project, Users_Projects } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 수정 구현
  // req.body
  if (!(req.body.id && req.body.member)) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  // member 내용부터 미리 빼놓고 project 테이블 수정
  const member_info = req.body.member;
  if (member_info.length === 0) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  delete req.body.member;

  try {
    await Project.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  // member_info를 사용하여 Users_Projects 테이블도 수정해야함
  try {
    for (let info of member_info) {
      await Users_Projects.update(
        { color: info.color },
        {
          where: {
            user_id: info.id,
          },
        }
      );
    }
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: null, message: "ok" });
};
