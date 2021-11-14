const {
  getComment,
  postComment,
  updateComment,
  deleteComment,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/:goalId", getComment);
router.post("/", postComment);
router.put("/", updateComment);
router.delete("/:commentId", deleteComment);

module.exports = router;
