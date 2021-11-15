const { getInvite, postInvite, deleteInvite } = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/:userId", getInvite);
router.post("/", postInvite);
router.delete("/:inviteId", deleteInvite);

module.exports = router;
