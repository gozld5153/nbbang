const { postLike, deleteLike } = require("../controllers");
const express = require("express");
const router = express.Router();

router.post("/", postLike);
router.delete("/:likeId", deleteLike);

module.exports = router;
