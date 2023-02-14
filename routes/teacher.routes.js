const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const Teacher = require("../models/Teacher.model");
const Student = require("../models/Student.model");
const randomTeams = require("../utils/randomTeams");

/* GET  profile page */
router.get("/profile", async (req, res, next) => {
  const allStudents = await Student.find();
  res.render("teacher-views/profile", {
    user: req.session.user,
    allStudents,
  });
});

///////////Create random teams/////////////////////

router.get("/random-teams", (req, res) => {
  res.render("teacher-views/random-teams");
});

router.post("/random-teams", async (req, res) => {
  const allStudents = await Student.find();
  const studentNames = [];
  allStudents.forEach((student) => {
    studentNames.push(student.firstName);
  });
  let random = randomTeams(studentNames, 2);
  res.render("teacher-views/random-teams", { random });
});

/////////////////Project teams//////////////////

/* GET  project teams page */
router.get("/project-teams", async (req, res, next) => {
  const allStudents = await Student.find().populate("greenList redList");
  res.render("teacher-views/projectTeams", {
    allStudents,
  });
});

// router.post("/project-teams");

module.exports = router;
