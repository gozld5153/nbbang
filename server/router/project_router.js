const {
  get_project,
  post_project,
  delete_project,
  update_project,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/:project_id/:user_id", get_project);
router.post("/", post_project);
router.delete("/:project_id", delete_project);
router.put("/", update_project);
// router.get("/current/:user_id", project_current);
// app.get("/project/complete/:id", controllers.complete_project);

module.exports = router;
