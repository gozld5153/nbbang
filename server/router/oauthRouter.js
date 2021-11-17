const { kakao, naver } = require("../controllers");
const express = require("express");
const router = express.Router();

router.post("/kakao", kakao);
router.post("/naver", naver);

module.exports = router;
