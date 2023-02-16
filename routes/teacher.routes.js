const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const Teacher = require("../models/Teacher.model");
const Student = require("../models/Student.model");
const Team = require("../models/Team.model");
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
  const filter = { username: req.session.user.username };
  const update = { randomTeams: random };
  await Teacher.findOneAndUpdate(filter, update, {new: true});
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
    const allStudents = await Student.find().populate(
      "greenList redList orangeList"
    );
    let finalTeams = createTeams(Object.keys(req.body));
    const teacher = await Teacher.findOne({
      username: req.session.user.username,
    });
    const flatArr = finalTeams.flat();
    let errorMessage = "";
    flatArr.forEach((id) => {
      if (flatArr.indexOf(id) !== flatArr.lastIndexOf(id)) {
        errorMessage = "You added the same student to multiple teams.";
      }
    });
    if (!errorMessage) {
      await Team.deleteMany();
      finalTeams.forEach((team) => {
        Team.create({ owner: teacher._id, team: team });
      });
      const filter = { username: req.session.user.username };
      const update = { projectTeams: finalTeams };
      await Teacher.findOneAndUpdate(filter, update, {new: true});
      res.redirect("/user/project-teams/teams");
    } else {
      res.render("teacher-views/projectTeams", {
        allStudents,
        user: req.session.user,
        createMatches,
        errorMessage,
      });
    }
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

module.exports = router;
