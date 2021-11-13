const { User, Project, Users_Projects, Goal } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 목록 api 구현
  // project_list_by_progress
  // req.query.state
  // req.params.user_id
  // 한페이지에 5개
  // req.query.page 에 페이지 정보 줄거임

  if (!req.params.user_id) {
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
  let total_count;
  try {
    for (let info of project_ids) {
      // TODO for문 시작
      let project_info;
      try {
        if (!req.query.state) {
          project_info = await Project.findOne({
            where: { id: info.dataValues.project_id },
          });
        } else {
          project_info = await Project.findOne({
            where: { id: info.dataValues.project_id, state: req.query.state },
          });
        }
        // captain_name 추가
        const captain_info = await User.findOne({
          where: {
            id: project_info.dataValues.captain_id,
          },
        });
        project_info.dataValues.captain_name = captain_info.dataValues.username;
        // 프로젝트 진행도 all_important complete_important 추가
        // 프로젝트 아이디 info.dataValues.project_id
        // 프로젝트 아이디로 goal 테이블 검색해서 important 총합 구함
        const goal_info = await Goal.findAll({
          attributes: ["important", "state"],
          where: {
            project_id: info.dataValues.project_id,
          },
        });
        // console.log("goal_info", goal_info);
        let all_important = 0;
        let complete_important = 0;
        for (let el of goal_info) {
          console.log("el", el);
          if (el.dataValues.state === "complete")
            complete_important += el.dataValues.important;
          all_important += el.dataValues.important;
        }
        console.log("all_important", all_important);
        project_info.dataValues.all_important = all_important;
        project_info.dataValues.complete_important = complete_important;
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
        for (let el of users_projects_info) {
          let temp_user = await User.findOne({
            where: { id: el.user_id },
          });
          // password 정보 삭제
          delete temp_user.dataValues.password;
          // color 정보 추가
          temp_user.dataValues.color = el.color;
          // my_all_important / my_complete_important 내용 추가
          // el.user_id / info.dataValues.project_id
          const goal_info = await Goal.findAll({
            attributes: ["important", "state"],
            where: {
              project_id: info.dataValues.project_id,
            },
          });
          let my_all_important = 0;
          let my_complete_important = 0;
          for (let el of goal_info) {
            if (el.dataValues.state === "complete")
              my_complete_important += el.dataValues.important;
            my_all_important += el.dataValues.important;
          }
          temp_user.dataValues.my_all_important = my_all_important;
          temp_user.dataValues.my_complete_important = my_complete_important;
          member_info.push(temp_user.dataValues);
        }
      } catch {
        member_info = null;
      }
      // project_info에 members 추가
      project_info.dataValues.members = member_info;
      data.push(project_info);
      // TODO for문 탈출
    }
    if (!req.query.state) {
      const complete = [];
      const progress = [];
      for (let project of data) {
        if (project.dataValues.state === "complete") complete.push(project);
        if (project.dataValues.state === "progress") progress.push(project);
      }
      total_count = data.length;
      const progress_count = progress.length;
      const complete_count = complete.length;
      data = {
        progress_count,
        complete_count,
        complete,
        progress,
      };
    } else {
      total_count = data.length;
    }
  } catch {
    data = null;
  }

  return res.status(200).json({ total_count, data, message: "ok" });
};
