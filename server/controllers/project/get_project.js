const { User, Project, Users_Projects } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트 단독 요청 구현
  // req.params.project_id 에 프로젝트 id
  // req.params.user_id user_id
  //
  // project_id로 users_projects에서 member 얻어와서 배열로 보내준다.
  if (!(req.params.project_id && req.params.user_id)) {
    return res
      .status(400)
      .json({ data: null, message: "프로젝트 및 유저 정보가 누락되었습니다." });
  }
  let project_info;
  try {
    project_info = await Project.findOne({
      where: { id: req.params.project_id },
    });
  } catch {
    project_info = null;
  }
  if (!project_info) {
    return res.status(500).json({
      data: null,
      message: "데이터베이스 에러 또는 존재하지 않는 프로젝트입니다.",
    });
  }

  // let member_ids;
  // try {
  //   member_ids = await Users_Projects.findAll({
  //     attributes: [ "user_id" ],
  //     where: {
  //       project_id: req.params.project_id
  //     }
  //   })
  // } catch {
  //   member_ids = null;
  // }
  // if (!member_ids) {
  //   return res.status(400).json({
  //     data: null,
  //     message: "프로젝트에 포함된 멤버가 존재하지 않습니다."
  //   })
  // }
  // // user_info = await User.findOne({
  // //   where: { email: req.body.email, password: req.body.password },
  // // });
  // let member_info;
  // try {
  //   member_info = member_ids.map(async (user_id) => {
  //     await User.findOne({
  //       where: { id: user_id }
  //     })

  //   })

  // }

  return res.status(200).json({ data: project_info.dataValues, message: "ok" });
};
