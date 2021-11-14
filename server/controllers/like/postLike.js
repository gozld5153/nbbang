const { Goal, Like } = require("../../models");

module.exports = async (req, res) => {
  // TODO like 생성 구현
  // userId와 goalId 필요
  // req.body.userId req.body.goalId
  if (!(req.body.userId && req.body.goalId && req.body.agreement)) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 항목이 있습니다." });
  }
  // 생성하기 전에 중복검사부터
  // Like 테이블에 userId와 goalId 가 중복되는 애가 있는지부터 찾는다
  let likeInfo;
  try {
    likeInfo = await Like.findOne({
      where: {
        userId: req.body.userId,
        goalId: req.body.goalId,
      },
    });
    likeInfo = likeInfo.dataValues;
  } catch {
    likeInfo = null;
  }
  let data;
  if (likeInfo) {
    // 이미 존재하므로 update 쿼리 진행
    try {
      await Like.update(req.body, {
        where: {
          id: likeInfo.id,
        },
      });
      data = await Like.findOne({
        where: {
          id: likeInfo.id,
        },
      });
    } catch {
      return res.status(500).json({ data: null, message: "데이터베이스 에러" });
    }
    return res.status(201).json({ data: data, message: "ok" });
  }
  // goalId로 projectId 찾는다.
  // 찾아낸 porjectId를 추가해서 create 실행
  try {
    const projectId = await Goal.findOne({
      attributes: ["projectId"],
      where: {
        id: req.body.goalId,
      },
    });
    req.body.projectId = projectId.dataValues.projectId;
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  try {
    data = await Like.create(req.body);
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 에러" });
  }
  return res.status(201).json({ data: data, message: "ok" });
};
