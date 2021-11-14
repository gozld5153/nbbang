const {
  getProject,
  postProject,
  deleteProject,
  updateProject,
  projectList,
  projectMember,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/:projectId/:userId", getProject);
router.post("/", postProject);
router.delete("/:projectId", deleteProject);
router.put("/", updateProject);
router.get("/:userId", projectList);
router.get("/", projectMember);

module.exports = router;
