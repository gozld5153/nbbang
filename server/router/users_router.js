const {
  signin,
  signup,
  signout,
  get_user_info,
  duplication_check,
  update_user_info,
  delete_user,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);
router.get("/", get_user_info);
router.post("/duplication", duplication_check);
router.put("/", update_user_info);
router.delete("/:id", delete_user);

module.exports = router;
