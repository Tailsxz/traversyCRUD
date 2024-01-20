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
  //we are exporting the functions that are serializing the user data storing it into the session, the nextTick queue, is essentially the promise jobs queue which we are identifying by the fact that it is ran before allowing the event loop to continue and that it is executed to completion. Turns out we were wrong about the nextTick queue! It is very similar to the promiseJobs queue, but the main difference is in the priority. The nextTick queue gets priority over the promise jobs queue!
  passport.serializeUser((user, done) => process.nextTick(() => {
      return done(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    })
  );
  //deserializes(grabs information) the information from the user session
  // passport.deserializeUser((id, done) => {
  //   process.nextTick(() => User.findById(id, (err, user) => done(null, user))
  //   );
  // });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(null, user))
  });
};