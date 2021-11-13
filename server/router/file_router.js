const {
  get_file,
  post_file,
  update_file,
  delete_file,
} = require("../controllers");
const express = require("express");
const router = express.Router();

router.get("/:file_id", get_file);
router.post("/", post_file);
router.put("/", update_file);
router.delete("/:file_id", delete_file);

module.exports = router;
