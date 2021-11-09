const { signin } = require("../controllers");
const express = require("express");
const router = express.Router();

router.post("/signin", signin);
// app.post("/users/signup", controllers.signup);
// app.get("/users/:id", controllers.get_user_info);
// app.put("/users/:id", controllers.update_user_info);
// app.delete("/users/:id", controllers.delete_user);

module.exports = router;
