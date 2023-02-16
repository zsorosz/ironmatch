const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const Teacher = require("../models/Teacher.model");
const Student = require("../models/Student.model");
const Team = require("../models/Team.model");
const randomTeams = require("../utils/randomTeams");
const { createMatches, createTeams } = require("../utils/projectTeams");

const downloadResource  = require('../utils/utilCsv');

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
  console.log(random)

  res.render("teacher-views/random-teams", { random });
});

/* router.get('/random-teams/download', (req, res) => {
  const fields = [
    {
      label: 'First Name',
      value: 'firstName'
    },
  ];
  const data = Student.find()
  downloadResource(res, "user.csv", fields, data)
  res.render('/teacher-views/random-teams')
}); */


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
    await Team.deleteMany();
    let finalTeams = createTeams(Object.keys(req.body));
    const teacher = await Teacher.findOne({
      username: req.session.user.username,
    });
    finalTeams.forEach((team) => {
      Team.create({ owner: teacher._id, team: team });
    });
    res.redirect("/user/project-teams/teams");
  } catch (err) {
    console.log("There was an error in the post project teams route", err);
  }
});

router.get("/project-teams/teams", async (req, res) => {
  try {
    const teacher = await Teacher.findOne({
      username: req.session.user.username,
    });
    const teams = await Team.find({ owner: teacher }).populate("team owner");
    res.render("teacher-views/showTeams", { teams });
  } catch (err) {
    console.log("There was an error in the get project teams route", err);
  }
});

router.get('/project-teams/teams/download', (req, res) => {
  const fields = [
    {
      label: 'First Name',
      value: 'firstName'
    },
  ];
  const data = Student.find()
  downloadResource(res, "user.csv", fields, data)
  res.render('teacher-views/showTeams')
});

module.exports = router;
