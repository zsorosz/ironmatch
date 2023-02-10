const router = require("express").Router();
const Teacher = require("../models/Teacher.model");

const bcrypt = require("bcryptjs");
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard");

/* GET signup page */
router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("auth-views/signup");
});

router.post("/signup", isLoggedOut, async (req, res, next) => {
  const body = { ...req.body };

  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(body.password, salt);

  delete body.password;
  body.passwordHash = passwordHash;

  await Teacher.create(body);
  res.redirect("/user/profile");
});

/* GET login page */
router.get("/login", isLoggedOut, (req, res, next) => {
  res.render("auth-views/login");
});

router.post("/login", isLoggedOut, async (req, res) => {
  console.log("SESSION =====> ", req.session);
  const body = req.body;

  const userMatch = await Teacher.find({ username: body.username });
  // console.log(userMatch)
  if (userMatch.length) {
    // User found
    const user = userMatch[0];

    if (bcrypt.compareSync(body.password, user.passwordHash)) {
      // Correct password

      const tempUser = {
        username: user.username,
      };
      req.session.user = tempUser;

      res.redirect("/user/profile");
    } else {
      // Incorrect password
      console.log("incorrect password");
    }
  } else {
    // User not found
  }
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
