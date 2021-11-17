const { getGoal, postGoal, updateGoal, deleteGoal } = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/", getGoal);
router.post("/", postGoal);
router.put("/", updateGoal);
router.delete("/:goalId", deleteGoal);

module.exports = router;
