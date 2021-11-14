const {
  signin,
  signup,
  signout,
  getUserInfo,
  duplicationCheck,
  updateUserInfo,
  deleteUser,
  searchUser,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);
router.get("/", getUserInfo);
router.post("/duplication", duplicationCheck);
router.put("/", updateUserInfo);
router.delete("/:id", deleteUser);
router.get("/search/:email", searchUser);

module.exports = router;
