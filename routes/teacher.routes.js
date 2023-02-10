const router = require("express").Router();
const { isLoggedIn } = require("../middleware/route-guard");

/* GET  profile page */
router.get("/profile", (req, res, next) => {
  res.render("teacher-views/profile", { user: req.session.user });
});

module.exports = router;
