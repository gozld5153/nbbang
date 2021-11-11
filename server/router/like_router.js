const { post_like, delete_like } = require("../controllers");
const express = require("express");
const router = express.Router();

router.post("/", post_like);
router.delete("/:like_id", delete_like);

module.exports = router;
