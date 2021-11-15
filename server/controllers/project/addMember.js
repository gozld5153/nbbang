const { UsersProjects } = require("../../models");

module.exports = async (req, res) => {
  // TODO 프로젝트에 유저 추가 구현
  // req.params.userId
  // req.params.projectId
  let data;

  try {
    data = await UsersProjects.findOrCreate({
      where: {
        userId: req.params.userId,
        projectId: req.params.projectId,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ data: data, message: "ok" });
};
