const router = require("express").Router();
const passport = require("passport");
require("dotenv").config();

router.get("/login/success", (req, res) => {
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
	res.status(401).json({
		error: true,
		message: "Log in failure",
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

router.get("/facebook", passport.authenticate("facebook", ["profile", "email"]));

router.get(
	"/facebook/callback",
	passport.authenticate("facebook", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

// router.get('/login', function (req, res) {
// 	res.render('login');
// });

router.post(
	'/login',
	passport.authenticate('local', {	
		successRedirect: 'login/success',
		failureRedirect: 'login/failed'
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect(process.env.CLIENT_URL);
});

module.exports = router;