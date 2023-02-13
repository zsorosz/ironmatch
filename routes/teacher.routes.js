const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");
const Teacher = require("../models/Teacher.model");
const Student = require("../models/Student.model");
const randomTeams = require("../utils/randomTeams")

/* GET  profile page */
router.get("/profile", async (req, res, next) => {
  const allStudents = await Student.find();
  res.render("teacher-views/profile", {
    user: req.session.user,
    allStudents,
    randomTeams,
  });
});


module.exports = router;
