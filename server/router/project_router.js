const {
  get_project,
  post_project,
  delete_project,
  update_project,
  project_list,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/:project_id/:user_id", get_project);
router.post("/", post_project);
router.delete("/:project_id", delete_project);
router.put("/", update_project);
router.get("/:user_id", project_list);

module.exports = router;
