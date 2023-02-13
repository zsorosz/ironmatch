const express = require("express");
const Student = require("../models/Student.model");
const router = express.Router();

/* GET survey completed */
router.get("/complete", (req, res, next) => {
  res.send("Thank you for completing the survey!");
});

/* GET survey */
router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    const allStudents = await Student.find({
      _id: { $not: { $eq: req.params.id } },
    });
    const page = 1;
    const errorMessage = "";
    const surveyComplete = false;
    res.render("survey", {
      student,
      allStudents,
      errorMessage,
      page,
      surveyComplete,
    });
  } catch (err) {
    console.log("Error in survey get route", err);
  }
});

/* POST survey*/
router.post("/:id", async (req, res) => {
  try {
    if (Object.keys(req.body).length > 5) {
      const student = await Student.findById(req.params.id);
      const allStudents = await Student.find({
        _id: { $not: { $eq: req.params.id } },
      });
      const errorMessage = "You selected too many options";
      const surveyComplete = false;
      res.render("survey", {
        student,
        allStudents,
        errorMessage,
        surveyComplete,
      });
    }
    const greenList = Object.keys(req.body);
    await Student.findByIdAndUpdate(req.params.id, {
      ...req.body,
      greenList: greenList,
    });
    res.redirect(`/survey/${req.params.id}/page2`);
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

/* GET survey page 2 */
router.get("/:id/page2", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id).populate("greenList");
    const allStudents = await Student.find({
      _id: { $not: { $eq: req.params.id } },
    });
    const page = 2;
    const errorMessage = "";
    const surveyComplete = false;
    res.render("survey", {
      student,
      allStudents,
      page,
      errorMessage,
      surveyComplete,
    });
  } catch (err) {
    console.log("Error in survey get route", err);
  }
});

/* POST survey page 2 */
router.post("/:id/page2", async (req, res) => {
  try {
    if (Object.keys(req.body).length > 3) {
      const student = await Student.findById(req.params.id);
      const allStudents = await Student.find({
        _id: { $not: { $eq: req.params.id } },
      });
      const page = 2;
      const errorMessage = "You selected too many options";
      const surveyComplete = false;
      res.render("survey", {
        student,
        allStudents,
        errorMessage,
        page,
        surveyComplete,
      });
    }
    const redList = Object.keys(req.body);
    await Student.findByIdAndUpdate(req.params.id, {
      ...req.body,
      redList: redList,
    });
    res.redirect("/survey/complete");
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

module.exports = router;
