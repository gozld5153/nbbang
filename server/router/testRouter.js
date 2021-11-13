const express = require("express");
const router = express.Router();
const {
  User,
  Project,
  UsersProjects,
  Like,
  Comment,
  File,
  Goal,
} = require("../models");

const test = async (req, res) => {
  // TODO test 용도
  let data;
  try {
    data = await User.findAll({
      include: {
        model: UsersProjects,
        include: {
          model: Project,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }

  return res.status(500).json({ data: data, message: "아직 구현 안함" });
};

router.get("/", test);

module.exports = router;
