const { User, Project, UsersProjects, Like, Goal } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 단독 요청 구현
  // req.params.projectId 에 프로젝트 id
  // req.params.userId userId

  if (!(req.params.projectId && req.params.userId)) {
    return res
      .status(400)
      .json({ data: null, message: "프로젝트 및 유저 정보가 누락되었습니다." });
  }

  // user table 검색
  let userInfo;
  try {
    userInfo = await User.findOne({
      where: { id: req.params.userId },
      include: {
        model: Like,
        attributes: ["id"],
      },
    });
    delete userInfo.dataValues.password;
    userInfo.dataValues.likeId = [];
    for (let el of userInfo.dataValues.Likes) {
      userInfo.dataValues.likeId.push(el.dataValues.id);
    }
    delete userInfo.dataValues.Likes;
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: null,
      message: "데이터베이스 에러",
    });
  }

  // project table 검색
  let projectInfo;
  try {
    projectInfo = await Project.findOne({
      where: { id: req.params.projectId },
      include: [
        {
          model: UsersProjects,
          include: {
            model: User,
            attributes: ["id", "username", "email", "profile", "mobile"],
            include: {
              model: Goal,
            },
          },
        },
        {
          model: Goal,
          attributes: ["important", "state"],
        },
      ],
    });
    // project 데이터 가공 important 집계 Goal 정보가 있다면
    let allImportant = 0;
    let completeImportant = 0;
    // Goals 돌면서 important 계산
    for (let el of projectInfo.dataValues.Goals) {
      if (el.dataValues.state === "complete")
        completeImportant += el.dataValues.important;
      allImportant += el.dataValues.important;
    }
    delete projectInfo.dataValues.Goals;
    projectInfo.dataValues.allImportant = allImportant;
    projectInfo.dataValues.completeImportant = completeImportant;

    // members 데이터 가공
    // color 추가 important 추가
    projectInfo.dataValues.members = [];
    for (let el of projectInfo.dataValues.UsersProjects) {
      el.dataValues.User.dataValues.color = el.dataValues.color;
      let myAllImportant = 0;
      let myCompleteImportant = 0;
      // important 추가
      for (let goal of el.dataValues.User.dataValues.Goals) {
        if (goal.dataValues.state === "complete")
          myCompleteImportant += goal.dataValues.important;
        myAllImportant += goal.dataValues.important;
      }
      el.dataValues.User.dataValues.myAllImportant = myAllImportant;
      el.dataValues.User.dataValues.myCompleteImportant = myCompleteImportant;
      projectInfo.dataValues.members.push(el.dataValues.User.dataValues);
      delete el.dataValues.User.dataValues.Goals;
    }

    delete projectInfo.dataValues.UsersProjects;
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      data: null,
      message: "데이터베이스 에러",
    });
  }
  const data = {
    userInfo,
    projectInfo,
  };
  return res.status(200).json({ data: data, message: "ok" });
};

// GET /project/:project_id/:id
// 프로젝트 페이지(단독)
