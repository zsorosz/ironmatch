const router = require("express").Router();
const Student = require("../models/Student.model");
const uploader = require('../middleware/cloudinary.config');
const Teacher = require("../models/Teacher.model");

/* GET new student */
router.get("/new", (req, res, next) => {
  res.render("student-views/new");
});

/* POST new student */
router.post("/new", uploader.single("imageUrl"), async (req, res, next) => {
  try {
    let image = ""
    if(typeof req.file === "undefined") {
      image = "/images/nerd.png"
    }
    else { image = req.file.path}
    const teacher = await Teacher.findOne({ username: req.session.user.username });
    await Student.create({...req.body, imageUrl: image, teacher: teacher._id});
    console.log(req.session.user)
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
router.post("/:id/edit", uploader.single("imageUrl"), async (req, res) => {
  try {
    const foundStudent = await Student.findById(req.params.id)
    let image = ""
    if(typeof req.file === "undefined") {
      image = foundStudent.imageUrl
    }
    else { image = req.file.path}
    await Student.findByIdAndUpdate(req.params.id, {...req.body, imageUrl: image}, {new:true});
    res.redirect(`/user/profile`);
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
