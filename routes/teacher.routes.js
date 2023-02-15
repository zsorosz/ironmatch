const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const Teacher = require("../models/Teacher.model");
const Student = require("../models/Student.model");
const randomTeams = require("../utils/randomTeams");
const { createMatches, createTeams } = require("../utils/projectTeams");

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
// const teams = [];

/* GET  project teams page */
router.get("/project-teams", async (req, res, next) => {
  const allStudents = await Student.find().populate(
    "greenList redList orangeList"
  );
  res.render("teacher-views/projectTeams", {
    allStudents,
    user: req.session.user,
    createMatches,
  });
});

router.post("/project-teams", async (req, res, next) => {
  try {
    let finalTeams = createTeams(Object.keys(req.body));
    await Teacher.findOneAndUpdate(
      { username: req.session.user.username },
      { projectTeams: finalTeams },
      { new: true }
    );
    res.redirect("/user/project-teams/teams");
  } catch (err) {
    console.log("There was an error in the post project teams route", err);
  }
});

router.get("/project-teams/teams", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      username: req.session.user.username,
    }).populate("projectTeams");
    console.log(teacher);
    res.render("teacher-views/showTeams", { teacher });
  } catch (err) {
    console.log("There was an error in the get project teams route", err);
  }
});

module.exports = router;
