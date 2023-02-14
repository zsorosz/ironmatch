const express = require("express");
const Student = require("../models/Student.model");
const router = express.Router();

/* GET survey completed */
router.get("/complete", (req, res, next) => {
  const surveyComplete = true;
  res.render("survey", { surveyComplete });
});

/* GET survey */
router.get("/:id", async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);
    const allStudents = await Student.find({
      _id: { $not: { $eq: req.params.id } },
    });
    const page = 1;
    res.render("survey", {
      student,
      allStudents,
      page,
    });
  } catch (err) {
    console.log("Error in survey get route", err);
  }
});

/* POST survey*/
router.post("/:id", async (req, res) => {
  try {
    if (Object.keys(req.body).length !== 5) {
      const student = await Student.findById(req.params.id);
      const allStudents = await Student.find({
        _id: { $not: { $eq: req.params.id } },
      });
      const errorMessage = "Please select exactly 5 options";
      const page = 1;
      res.render("survey", {
        student,
        allStudents,
        errorMessage,
        page,
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
      _id: {
        $nin: [
          req.params.id,
          student.greenList[0]._id,
          student.greenList[1]._id,
          student.greenList[2]._id,
          student.greenList[3]._id,
          student.greenList[4]._id,
        ],
      },
    });
    const page = 2;
    res.render("survey", {
      student,
      allStudents,
      page,
    });
  } catch (err) {
    console.log("Error in survey get route", err);
  }
});

/* POST survey page 2 */
router.post("/:id/page2", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (Object.keys(req.body).length !== 3) {
      const allStudents = await Student.find({
        _id: {
          $nin: [
            req.params.id,
            student.greenList[0]._id,
            student.greenList[1]._id,
            student.greenList[2]._id,
            student.greenList[3]._id,
            student.greenList[4]._id,
          ],
        },
      });
      const page = 2;
      const errorMessage = "Please select exactly 3 students";
      res.render("survey", {
        student,
        allStudents,
        errorMessage,
        page,
      });
    }
    const redList = await Object.keys(req.body);
    const orangeList = await Student.find({
      _id: {
        $nin: [
          req.params.id,
          student.greenList[0]._id,
          student.greenList[1]._id,
          student.greenList[2]._id,
          student.greenList[3]._id,
          student.greenList[4]._id,
          redList[0],
          redList[1],
          redList[2],
        ],
      },
    });
    await Student.findByIdAndUpdate(req.params.id, {
      ...req.body,
      redList: redList,
      orangeList: orangeList,
    });
    res.redirect("/survey/complete");
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

module.exports = router;
