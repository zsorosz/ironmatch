const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const Teacher = require("../models/Teacher.model");
const Student = require("../models/Student.model");
const randomTeams = require("../utils/randomTeams");
const { goodMatches, okMatches } = require("../utils/projectTeams");

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
  let groupSize = req.body.typeNumber;
  let random = randomTeams(studentNames, groupSize);
  res.render("teacher-views/random-teams", { random });
});

/////////////////Project teams//////////////////
const teams = [];

/* GET  project teams page */
router.get("/project-teams", async (req, res, next) => {
  const allStudents = await Student.find().populate(
    "greenList redList orangeList"
  );
  res.render("teacher-views/projectTeams", {
    allStudents,
    user: req.session.user,
  });
});

router.post("/project-teams", async (req, res, next) => {
  teams.push(Object.keys(req.body));
  // await Teacher.findOneAndUpdate(
  //   { username: req.session.user.username },
  //   { projectTeams: teams },
  //   { new: true }
  // );
  res.redirect("/user/project-teams");
  console.log(req.body);
});

module.exports = router;
