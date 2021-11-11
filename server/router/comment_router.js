const {
  get_comment,
  post_comment,
  update_comment,
  delete_comment,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/:goal_id", get_comment);
router.post("/", post_comment);
router.put("/", update_comment);
router.delete("/:comment_id", delete_comment);

module.exports = router;
