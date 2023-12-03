const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const socialUser = require("../models/socialaccout.models");
const User = require("../models/account.models");

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

passport.use(new LocalStrategy({
    usernameField: 'Email',
    passwordField: 'Pw',
    passReqToCallback: true
},
    async function (req, Email, Pw, done) {
        //   User.findOne({ username: username }, function (err, user) {
        //     if (err) { return done(err); }
        //     if (!user) { return done(null, false); }
        //     if (!user.verifyPassword(password)) { return done(null, false); }
        //     return done(null, user);
        //   });
        //console.log(Email.body.Email);
        const user = await User.getbyEmail(req.body.Email);
        console.log(user);
        // let isMatch = await bcrypt.compare(Email.body.Pw, user.rows[0].Pw)
        // console.log(isMatch);
        // if (user.rows.length > 0) {
        //     let isMatch = await bcrypt.compare(Email.body.Pw, user.rows[0].Pw)
        //     if (!isMatch) {
        //         return done(null, false, {msg: "Email or password is invalid"})
        //     }
        // }
        // else {
        //     return done(null, false, {msg: "Email or password is invalid"})
        // }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});