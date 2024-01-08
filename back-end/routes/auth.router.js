const router = require("express").Router();
const passport = require("passport");
require("dotenv").config();
const moment = require("moment");

router.get("/login/success", (req, res) => {
  //console.log(req.user);
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/login/failed", (req, res) => {
  res.json({
    msg: "Log in failure",
  });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", ["profile", "email"])
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.post(
  "/login",
  passport.authenticate("local", {
    //successRedirect: process.env.CLIENT_URL,
    failureRedirect: "login/failed",
  }),
  (req, res) => {
    // req.user.DOB = moment(req.user.DOB).format("DD-MM-YYYY");

    console.log(req.user);
    res.json({ data: req.user });
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
