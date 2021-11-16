const { kakao } = require("../controllers");
const express = require("express");
const router = express.Router();

router.post("/kakao", kakao);

module.exports = router;
