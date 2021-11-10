const { project_current, get_project } = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/:project_id", get_project);
router.get("/current/:user_id", project_current);
// app.get("/project/complete/:id", controllers.complete_project);
// app.delete("/project", controllers.delete_project);

// app.post("/project", controllers.make_new_project);
// app.delete("/project/:project_id", controllers.delete_project);
// app.put("/project/:project_id", controllers.update_project);
// app.get("/project/users", controllers.get_project_user);

module.exports = router;
