const { Goal, Like } = require("../../models");

module.exports = async (req, res) => {
  // TODO like 생성 구현
  // user_id와 goal_id 필요
  // req.body.user_id req.body.goal_id
  if (!(req.body.user_id && req.body.goal_id && req.body.agreement)) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 항목이 있습니다." });
  }
  // 생성하기 전에 중복검사부터
  // Like 테이블에 user_id와 goal_id 가 중복되는 애가 있는지부터 찾는다
  let like_info;
  try {
    like_info = await Like.findOne({
      where: {
        user_id: req.body.user_id,
        goal_id: req.body.goal_id,
      },
    });
    like_info = like_info.dataValues;
  } catch {
    like_info = null;
  }
  let data;
  if (like_info) {
    // 이미 존재하므로 update 쿼리 진행
    try {
      await Like.update(req.body, {
        where: {
          id: like_info.id,
        },
      });
      data = await Like.findOne({
        where: {
          id: like_info.id,
        },
      });
    } catch {
      return res.status(500).json({ data: null, message: "데이터베이스 에러" });
    }
    return res.status(201).json({ data: data, message: "ok" });
  }
  // goal_id로 project_id 찾는다.
  // 찾아낸 porject_id를 추가해서 create 실행
  try {
    const project_id = await Goal.findOne({
      attributes: ["project_id"],
      where: {
        id: req.body.goal_id,
      },
    });
    req.body.project_id = project_id.dataValues.project_id;
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  try {
    data = await Like.create(req.body);
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: data, message: "ok" });
};
