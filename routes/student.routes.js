const router = require("express").Router();
const Student = require("../models/Student.model");

/* GET new student */
router.get("/new", (req, res, next) => {
  res.render("student-views/new");
});

/* POST new student */
router.post("/new", async (req, res, next) => {
  try {
    await Student.create(req.body);
    res.redirect("/user/profile");
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

/* GET student details*/
router.get("/:id", async (req, res) => {
  try {
    const foundStudent = await Student.findById(req.params.id).populate(
      "greenList redList"
    );
    res.render("student-views/one", { foundStudent });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

/* GET update student*/
router.get("/:id/edit", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.render("student-views/edit", { student });
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

/* POST update student*/
router.post("/:id/edit", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/student/${req.params.id}`);
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

/* POST delete student*/
router.post("/:id/delete", async (req, res) => {
  try {
    await Student.findByIdAndRemove(req.params.id);
    res.redirect("/user/profile");
  } catch (err) {
    console.log("Ohh nooo, error", err);
  }
});

module.exports = router;
