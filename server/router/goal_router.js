const {
  get_goal,
  post_goal,
  update_goal,
  delete_goal,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/:user_id/:project_id", get_goal);
router.post("/", post_goal);

router.put("/", update_goal);
router.delete("/", delete_goal);

module.exports = router;
