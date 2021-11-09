const { signin, signup, get_user_info } = require("../controllers");
const express = require("express");
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/:id", get_user_info);
// app.put("/users/:id", controllers.update_user_info);
// app.delete("/users/:id", controllers.delete_user);

module.exports = router;
