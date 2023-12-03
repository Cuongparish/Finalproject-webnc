const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
//const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const socialUser = require("../models/socialaccout.models");

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
            if(user)
            {
                const finduser = await socialUser.getbyEmail(user.email);
                console.log(finduser);
            	if(finduser.rows.length === 0){
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
            if(user)
            {
                const finduser = await socialUser.getbyEmail(user.email);
                console.log(finduser);
            	if(finduser.rows.length === 0){
            		socialUser.addUser(user.email);
            	}
            }
            callback(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});