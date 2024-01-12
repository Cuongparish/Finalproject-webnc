const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const socialUser = require("../models/socialaccout.models");
const User = require("../models/account.models");
const moment = require("moment");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      const user = profile._json;
      if (user) {
        const finduser = await socialUser.getbyEmail(user.email);
        
        if (finduser.rows.length === 0) {
          socialUser.addUser(user.email, user.name);
          const newuser = await socialUser.getbyEmail(user.email);

          callback(null, newuser);
          return;
        }

        callback(null, finduser);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
      scope: ["profile", "email"],
    },
    async function (accessToken, refreshToken, profile, callback) {
      const user = profile._json;
      if (user) {
        const finduser = await socialUser.getbyEmail(user.email);
        console.log(finduser);
        if (finduser.rows.length === 0) {
          socialUser.addUser(user.email);
        }
      }
      callback(null, profile);
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: "Email",
      passwordField: "Pw",
      passReqToCallback: true,
    },
    async function (req, Email, Pw, done) {
      if (!req.body.Email) {
        return done(null, false, { msg: "Email or password is invalid" });
      }

      if (!req.body.Pw) {
        return done(null, false, { msg: "Email or password is invalid" });
      }

      const user = await User.getbyEmail(req.body.Email);

      if (user.rows.length > 0) {
        let isMatch = await bcrypt.compare(req.body.Pw, user.rows[0].Pw);
        if (!isMatch) {
          return done(null, false, { msg: "Email or password is invalid" });
        }
      } else {
        return done(null, false, { msg: "Email or password is invalid" });
      }

      req.user = user;

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
