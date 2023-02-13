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

router.get("/random-teams", (req, res) => {
  const pizza = false
  res.render('teacher-views/random-teams', {pizza})
})

router.post("/random-teams", async (req, res) => {
  const allStudents = await Student.find();
  const studentNames = [];
  allStudents.forEach((student) => {
    studentNames.push(student.firstName);
  });
  let random = randomTeams(studentNames, 2);
  const pizza = true
  res.render('teacher-views/random-teams', {random, pizza} )
})

module.exports = router;

