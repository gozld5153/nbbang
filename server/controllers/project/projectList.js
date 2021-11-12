const { User, Project, UsersProjects, Goal } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 목록 api 구현
  // projectListByProgress
  // req.query.state
  // req.params.userId
  // 한페이지에 5개
  // req.query.page 에 페이지 정보 줄거임

  if (!req.params.userId) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }

  // userId로 usersProjects 테이블에서 projectsId 가져옴
  let projectIds;
  try {
    projectIds = await UsersProjects.findAll({
      attributes: ["projectId"],
      where: {
        userId: req.params.userId,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  if (!projectIds) {
    return res
      .status(400)
      .json({ data: null, message: "참가한 프로젝트가 없습니다." });
  }
  // projectIds 에서 받아온 projectId로 project 정보 가져옴
  let data = [];
  let totalCount;
  try {
    for (let info of projectIds) {
      // TODO for문 시작
      let projectInfo;
      try {
        if (!req.query.state) {
          projectInfo = await Project.findOne({
            where: { id: info.dataValues.projectId },
          });
        } else {
          projectInfo = await Project.findOne({
            where: { id: info.dataValues.projectId, state: req.query.state },
          });
        }
        // captain_name 추가
        const captainInfo = await User.findOne({
          where: {
            id: projectInfo.dataValues.captainId,
          },
        });
        projectInfo.dataValues.captain_name = captainInfo.dataValues.username;
        // 프로젝트 진행도 allImportant completeImportant 추가
        // 프로젝트 아이디 info.dataValues.projectId
        // 프로젝트 아이디로 goal 테이블 검색해서 important 총합 구함
        const goalInfo = await Goal.findAll({
          attributes: ["important", "state"],
          where: {
            projectId: info.dataValues.projectId,
          },
        });
        // console.log("goalInfo", goalInfo);
        let allImportant = 0;
        let completeImportant = 0;
        for (let el of goalInfo) {
          console.log("el", el);
          if (el.dataValues.state === "complete")
            completeImportant += el.dataValues.important;
          allImportant += el.dataValues.important;
        }
        console.log("allImportant", allImportant);
        projectInfo.dataValues.allImportant = allImportant;
        projectInfo.dataValues.completeImportant = completeImportant;
      } catch {
        projectInfo = null;
      }
      if (!projectInfo) continue;
      // usersProjects 검색
      let usersProjectsInfo;
      try {
        usersProjectsInfo = await UsersProjects.findAll({
          attributes: ["userId", "color"],
          where: {
            projectId: info.dataValues.projectId,
          },
        });
      } catch {
        usersProjectsInfo = null;
      }
      // project에 포함된 멤버 검색
      let memberInfo = [];
      try {
        for (let el of usersProjectsInfo) {
          let temp_user = await User.findOne({
            where: { id: el.userId },
          });
          // password 정보 삭제
          delete temp_user.dataValues.password;
          // color 정보 추가
          temp_user.dataValues.color = el.color;
          // myAllImportant / myCompleteImportant 내용 추가
          // el.userId / info.dataValues.projectId
          const goalInfo = await Goal.findAll({
            attributes: ["important", "state"],
            where: {
              projectId: info.dataValues.projectId,
            },
          });
          let myAllImportant = 0;
          let myCompleteImportant = 0;
          for (let el of goalInfo) {
            if (el.dataValues.state === "complete")
              myCompleteImportant += el.dataValues.important;
            myAllImportant += el.dataValues.important;
          }
          temp_user.dataValues.myAllImportant = myAllImportant;
          temp_user.dataValues.myCompleteImportant = myCompleteImportant;
          memberInfo.push(temp_user.dataValues);
        }
      } catch {
        memberInfo = null;
      }
      // projectInfo에 members 추가
      projectInfo.dataValues.members = memberInfo;
      data.push(projectInfo);
      // TODO for문 탈출
    }
    if (!req.query.state) {
      const complete = [];
      const progress = [];
      for (let project of data) {
        if (project.dataValues.state === "complete") complete.push(project);
        if (project.dataValues.state === "progress") progress.push(project);
      }
      totalCount = data.length;
      const progressCount = progress.length;
      const completeCount = complete.length;
      data = {
        progressCount,
        completeCount,
        complete,
        progress,
      };
    } else {
      totalCount = data.length;
    }
  } catch {
    data = null;
  }

  return res.status(200).json({ totalCount, data, message: "ok" });
};
