const { Goal } = require("../../models");

module.exports = async (req, res) => {
  // TODO 목표 수정 api 구현
  // req.body에 수정내용 들어옴
  if (!req.body.id) {
    return res
      .status(400)
      .json({ data: null, message: "누락된 항목이 있습니다." });
  }
  let response;
  try {
    response = await Goal.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
  } catch {
    return res.status(500).json({ data: null, message: "데이터베이스 오류" });
  }
  return res.status(201).json({ data: response, message: "ok" });
};
