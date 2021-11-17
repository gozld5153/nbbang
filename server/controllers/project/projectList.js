const { User, Project, UsersProjects, Goal } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 목록 api 구현
  // projectListByProgress
  // req.query.state
  // req.params.userId
  // req.query.progresspage
  // req.query.completePage
  // 모든 배열들이 다 역순

  if (!req.params.userId) {
    return res.status(400).json({ data: null, message: "잘못된 요청입니다." });
  }
  // TODO 컴플리트 페이지 구현
  if (req.query.completePage) {
    let data = {};
    let projectInfo;
    try {
      projectInfo = await Project.findOne({
        where: {
          id: req.params.userId,
        },
        attributes: [
          "id",
          "projectName",
          "description",
          "presentation",
          "captainId",
        ],
        include: {
          model: UsersProjects,
          include: {
            model: User,
            attributes: ["username", "profile"],
            include: {
              model: Goal,
              attributes: ["goalName", "important", "description", "deadline"],
            },
          },
        },
      });
      // project 정보는 모두 다 받아옴 이제 가공만 하면 됨
      // projectInfo.dataValues.UsersProjects 돌면서 id가 captainId 면 가공 후 captain으로 보냄
      // captainId가 아니면 가공 후 crew에 push
    } catch (err) {
      console.log(err);
      return res.status(500).json({ data: null, message: "데이터베이스 에러" });
    }
    let captain = {};
    let crew = [];
    for (let el of projectInfo.dataValues.UsersProjects) {
      let tempObj = {
        username: el.dataValues.User.dataValues.username,
        profile: el.dataValues.User.dataValues.profile,
        goal: el.dataValues.User.dataValues.Goals,
      };
      if (el.id === projectInfo.dataValues.captainId) {
        captain = tempObj;
      } else {
        crew.push(tempObj);
      }
    }
    data = {
      projectId: projectInfo.dataValues.id,
      projectName: projectInfo.dataValues.projectName,
      description: projectInfo.dataValues.description,
      presentation: projectInfo.dataValues.presentation,
      totalNum: projectInfo.dataValues.UsersProjects.length,
      usersGoal: {
        captain: captain,
        crew: crew,
      },
    };
    return res.status(200).json({ data: data, message: "ok" });
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
        // captainName 추가
        const captainInfo = await User.findOne({
          where: {
            id: projectInfo.dataValues.captainId,
          },
        });
        projectInfo.dataValues.captainName = captainInfo.dataValues.username;
        // 프로젝트 진행도 allImportant completeImportant 추가
        // 프로젝트 아이디 info.dataValues.projectId
        // 프로젝트 아이디로 goal 테이블 검색해서 important 총합 구함
        const goalInfo = await Goal.findAll({
          attributes: ["important", "state"],
          where: {
            projectId: info.dataValues.projectId,
          },
        });
        let allImportant = 0;
        let completeImportant = 0;
        for (let el of goalInfo) {
          if (el.dataValues.state === "complete")
            completeImportant += el.dataValues.important;
          allImportant += el.dataValues.important;
        }
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
    // 여기서 프로젝트 id 기준으로 최신순
    data.sort((a, b) => b.dataValues.id - a.dataValues.id);
    if (!req.query.state) {
      let complete = [];
      let progress = [];
      for (let project of data) {
        if (project.dataValues.state === "complete") complete.push(project);
        if (project.dataValues.state === "progress") progress.push(project);
      }
      totalCount = data.length;
      const progressCount = progress.length;
      const completeCount = complete.length;
      progress = progress.slice(0, 5);
      complete = complete.slice(0, 5);

      data = {
        progressCount,
        completeCount,
        complete,
        progress,
      };
    } else {
      totalCount = data.length;
      // data 에 있음
      if (req.query.page) {
        // 페이지네이션
        // state 랑 함께 사용해야 함
        let page = req.query.page * 5;
        data = data.slice(page - 5, page);
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }

  return res.status(200).json({ totalCount, data, message: "ok" });
};
