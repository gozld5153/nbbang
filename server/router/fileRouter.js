const { getFile, postFile, updateFile, deleteFile } = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/:fileId", getFile);
router.post("/", postFile);
router.put("/", updateFile);
router.delete("/:fileId", deleteFile);

module.exports = router;
