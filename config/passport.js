const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    
  }));
  //we are exporting the functions that are serializing the user data storing it into the session, the nextTick queue, is essentially the promisejobs queue which we are identifying by the fact that it is ran before allowing the event loop to continue and that it is executed to completion.
  passport.serializeUser((user, done) => process.nextTick(() => {
      return done(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    })
  );
  //deserializes(grabs information) the information from the user session
  passport.deserializeUser((user, done) => {
    process.nextTick(() => done(null, user)
    );
  });
};