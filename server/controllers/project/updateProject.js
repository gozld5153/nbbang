const { Project, UsersProjects } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 수정 구현
  // req.body
  if (!(req.body.id && req.body.member)) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  // member 내용부터 미리 빼놓고 project 테이블 수정
  const memberInfo = req.body.member;
  if (memberInfo.length === 0) {
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
  // memberInfo를 사용하여 UsersProjects 테이블도 수정해야함
  try {
    for (let info of memberInfo) {
      await UsersProjects.update(
        { color: info.color },
        {
          where: {
            userId: info.id,
          },
        }
      );
    }
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: null, message: "ok" });
};
