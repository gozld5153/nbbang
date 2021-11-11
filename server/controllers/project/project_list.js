const { User, Project, Users_Projects } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 목록 api 구현
  // project_list_by_progress
  // req.query.state
  // req.params.user_id
  // 한페이지에 5개
  // req.query.page 에 페이지 정보 줄거임

  // 여기서부터 시작
  if (!(req.params.user_id && req.query.state)) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }

  // user_id로 users_projects 테이블에서 projects_id 가져옴
  let project_ids;
  try {
    project_ids = await Users_Projects.findAll({
      attributes: ["project_id"],
      where: {
        user_id: req.params.user_id,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  if (!project_ids) {
    return res
      .status(400)
      .json({ data: null, message: "참가한 프로젝트가 없습니다." });
  }
  // project_ids 에서 받아온 project_id로 project 정보 가져옴
  let data = [];
  try {
    for (let info of project_ids) {
      // TODO 함수시작
      let project_info;
      console.log("info", info);
      try {
        project_info = await Project.findOne({
          where: { id: info.dataValues.project_id, state: req.query.state },
        });
      } catch {
        project_info = null;
      }
      if (!project_info) continue;
      // users_projects 검색
      let users_projects_info;
      try {
        users_projects_info = await Users_Projects.findAll({
          attributes: ["user_id", "color"],
          where: {
            project_id: info.dataValues.project_id,
          },
        });
      } catch {
        users_projects_info = null;
      }
      // project에 포함된 멤버 검색
      let member_info = [];
      try {
        for (let info of users_projects_info) {
          let temp = await User.findOne({
            where: { id: info.user_id },
          });
          // password 정보 삭제
          delete temp.dataValues.password;
          // color 정보 추가
          temp.dataValues.color = info.color;
          member_info.push(temp.dataValues);
        }
      } catch {
        member_info = null;
      }
      // project_info에 members 추가
      project_info.dataValues.members = member_info;
      // TODO 함수 끝
      data.push(project_info);
    }
  } catch {
    data = null;
  }

  return res.status(200).json({ data: data, message: "ok" });
};
